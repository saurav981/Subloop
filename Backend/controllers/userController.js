const UserModel = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const cloudinary = require('../utils/cloudinary');
const factory = require('./handlerFactory');
const bcrypt = require('bcryptjs');

const filterObject = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user._id;
  next();
};

// Update profile data and image
exports.updateProfile = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const { profilePic, password } = req.body;

  if (!password) {
    return next(new AppError('Please enter password to update', 400));
  }

  const user = await UserModel.findById(userId).select('+password');

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError(`Wrong password, try again`, 401));
  }

  const updateData = filterObject(
    req.body,
    'fullName',
    'email',
    'bio',
    'username'
  );

  // Handle profile picture upload
  if (profilePic) {
    const uploadResult = await cloudinary.uploader.upload(profilePic, {
      folder: 'profile_pics',
    });

    updateData.profilePic = uploadResult.secure_url; // Save URL
  }

  const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  });

  updatedUser.password = undefined;

  res.status(200).json({
    status: 'success',
    updatedUser,
  });
});

exports.updatePlan = catchAsync(async (req, res, next) => {
  const { planId, ...updates } = req.body;

  if (!planId) {
    return next(new AppError('Plan id is required', 400));
  }

  // Find the user's plan
  const plan = req.user.plans.id(planId);
  if (!plan) {
    return next(new AppError('Plan not found', 404));
  }

  // Update only provided fields
  Object.keys(updates).forEach((key) => {
    if (plan[key] !== undefined) {
      plan[key] = updates[key];
    }
  });

  // Save changes
  await req.user.save();

  res.status(200).json({
    status: 'success',
    user: req.user,
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  // Actually delete user
  await UserModel.findByIdAndDelete(req.user._id);

  // Make user inactive
  // await UserModel.findByIdAndUpdate(req.user._id, { active: false });

  await res.clearCookie('jwt');
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(204).json({
    status: 'error',
    message: 'This route is not defined, use /signup instead',
  });
};

exports.getPublicUser = catchAsync(async (req, res) => {
  const { username } = req.params;
  const publicUser = await UserModel.findOne({ username }).select(
    '-createdAt -updatedAt -_id'
  );

  res.status(200).json(publicUser);
});

exports.getAllUsers = factory.getAll(UserModel);
exports.getUser = factory.getOne(UserModel);
exports.updateUser = factory.updateOne(UserModel);
exports.deleteUser = factory.deleteOne(UserModel);
