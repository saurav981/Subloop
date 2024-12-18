const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const UserModel = require('./../models/userModel');
// const {
//   sendVerificationEmail,
//   sendWelcomeEmail,
//   sendPasswordResetEmail,
//   sendResetSuccessEmail,
//   sendPasswordUpdatedEmail,
// } = require('../utils/mailtrap/emails');
const {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendPasswordUpdatedEmail,
} = require('../utils/sendgrid/emails'); // using sendgrid cuz mailtrap aint working

const generateTokenAndSetCookie = async (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const isProduction = process.env.NODE_ENV === 'production';

  res.cookie('jwt', token, {
    httpOnly: true,
    // Render.com deployment settings
    secure: isProduction, // in prod = true, in dev = false
    sameSite: isProduction ? 'None' : 'Strict', // prevents CSRF // in prod = None, in dev = Strict
    maxAge: process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000, // 10 days, since JWT_COOKIE_EXPIRES_IN is 10
  });

  // Dont send in res, but save in DB
  user.password = undefined;
  if (user.verificationCode) user.verificationCode = undefined;

  res.status(statusCode).json({
    success: true,
    user,
    // Dont send sensitive data in response, like verification code, token, etc
    // data: {
    //   user,
    // },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const { email, role, password } = req.body;

  if (!email || !role || !password) {
    return next(new AppError('All fields are required', 400));
  }

  const userAlreadyExists = await UserModel.findOne({ email });
  if (userAlreadyExists) {
    return next(new AppError('User already exists, use different email', 400));
  }

  // Hash password happens in User model, and only hashes when pw is new or has changed

  // Generate a 6 digit no
  const verificationCode = Math.floor(100000 + Math.random() * 900000);

  const newUser = new UserModel({
    email,
    password,
    role,
    verificationCode,
    verificationCodeExpiresAt: Date.now() + 10 * 60 * 1000, // 10 mins
  });

  await newUser.save();

  // await, cuz critical task, without code user can't login
  await sendVerificationEmail(newUser.email, verificationCode);

  // Generate token, set cookie, and send email verificaiton code, lastly res
  generateTokenAndSetCookie(newUser, 201, res);
});

exports.verifyEmail = catchAsync(async (req, res, next) => {
  const { code } = req.body;

  if (!code) {
    return next(new AppError('Please provide verification code', 400));
  }

  // find user based on 3 conditions
  const user = await UserModel.findOne({
    verificationCode: code, // find user based on sent code // compare user sent code with the one in DB, so we are're able to find a user based on that code + below conditions, it means its valid code
    verificationCodeExpiresAt: { $gt: Date.now() }, // token not expired yet
    isVerified: false, // user not verified yet
  });

  if (!user) {
    return next(new AppError('Invalid or expired verification code', 404));
  }

  // if all ok
  user.isVerified = true;
  user.verificationCode = undefined;
  user.verificationCodeExpiresAt = undefined;

  await user.save();

  // Non critical, hence we dont await, cuz user can login without this
  await sendWelcomeEmail(user.username, user.email);

  res.status(200).json({
    success: true,
    user,
    message: 'Email verification successful',
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new AppError('Unauthorized, no token provided', 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await UserModel.findById(decoded.id);
  // If user deleted a/c after creating token, possessed token becomes invalid
  if (!currentUser) {
    return next(new AppError('User belonging to token does not exist', 401));
  }

  // If user changed password after token creation, possessed token becomes invalid
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please login again.', 401)
    );
  }

  req.user = currentUser;
  next();
});

exports.checkAuth = (req, res) => {
  const user = req.user;

  try {
    res.status(200).json({
      success: true,
      message: 'User is logged in',
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please enter both email & password', 400));
  }

  const user = await UserModel.findOne({ email }).select('+password');
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  generateTokenAndSetCookie(user, 200, res);
});

exports.logout = async (req, res) => {
  await res.clearCookie('jwt');

  res.status(200).json({
    success: true,
    message: 'Logged out successfully!',
  });
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You dont have permission to perform this action!', 403)
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new AppError('Please provide an email address', 400));
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    return next(new AppError('No user found for this email', 404));
  }

  // Generate reset token/string of 32 characters in hexadecimal format
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Hash reset token and save to passwordResetToken field
  user.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  user.passwordResetExpiresAt = Date.now() + 10 * 60 * 1000; // 10 mins

  await user.save();

  const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  try {
    await sendPasswordResetEmail(user.email, resetURL);

    res.status(200).json({
      success: true,
      message: 'Password reset link sent to your email',
    });
  } catch (error) {
    console.log(error);
    user.passwordResetToken = undefined;
    user.passwordResetExpiresAt = undefined;

    await user.save();

    return next(
      new AppError(
        `There was a error sending the email, try again: ${error}`,
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const userSentParamToken = req.params.token;

  const hashedToken = crypto
    .createHash('sha256')
    .update(userSentParamToken)
    .digest('hex');

  const user = await UserModel.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpiresAt: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('Token is invalid or has expired!', 400));
  }

  const { newPassword } = req.body;
  if (!newPassword) {
    return next(new AppError('Please enter a new password', 400));
  }

  // Password hash happens in User model via pre middleware, we dont have to do it again
  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpiresAt = undefined;

  await user.save();

  // Non critical, hence no await
  sendResetSuccessEmail(user.email);

  res.status(200).json({
    success: true,
  });
});

exports.updateMyPassword = catchAsync(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id).select('+password');

  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return next(new AppError('Please enter both passwords', 400));
  }

  if (!(await bcrypt.compare(currentPassword, user.password))) {
    return next(new AppError('Wrong current password', 401));
  }

  if (currentPassword === newPassword) {
    return next(new AppError('New password must be unique', 401));
  }

  // Password hash happens in User model via pre middleware, we dont have to do it again
  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpiresAt = undefined;
  await user.save();

  // Non critical, hence no await
  sendPasswordUpdatedEmail(user.email);

  generateTokenAndSetCookie(user, 200, res);
});
