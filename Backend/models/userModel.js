const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { extractUsername } = require('../utils/backendHelper');

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
      maxlength: [100, 'Please keep name under 100 characters'],
    },
    email: {
      type: String,
      unique: [true, 'Email already exists'],
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Please use valid email'],
    },
    username: {
      type: String,
      unique: [true, 'Username already taken, try something else!'],
      trim: true,
      lowercase: true,
      maxlength: [100, 'Username must be shorter than 100 characters'],
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: {
        values: ['creator', 'fan'],
        message: 'Role can either be: Creator or Fan',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be greater then 8 characters'],
      select: false,
    },
    isAvailableForChat: {
      type: Boolean, // only saved for Creator
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    bio: String,
    profilePic: String,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpiresAt: Date,
    verificationCode: String,
    verificationCodeExpiresAt: Date,

    // Embedding, since its 1-few relationship, and plans arent updated often
    plans: [
      {
        planName: {
          type: String,
          enum: ['Per Message', 'Monthly'],
        },
        price: {
          type: Number,
          min: [1, 'Price must be more than ₹1'],
          max: [10000, 'Price must be less than ₹10000'],
        },
        totalMonthlyMessages: {
          type: Number, // Saved only for Monthly plan
          min: [30, 'Messages must be more than 30'],
          max: [1000, 'Messages must be more than 1000'],
        },
        maxFanLimit: {
          type: Number,
          default: 5,
        },
        maxReplyTimeInDays: {
          type: Number,
          default: 4,
        },
        active: {
          type: Boolean,
          default: true,
        },
      },
      { timestamps: true },
    ],
  },
  { timestamps: true }
);

// Hide fields functions
const hideFields = (...fields) => {
  const transform = (_, ret) => {
    fields.forEach((field) => delete ret[field]);
    return ret;
  };
  ['toJSON', 'toObject'].forEach((type) => userSchema.set(type, { transform }));
};
hideFields('__v', 'password', 'passwordResetToken', 'verificationCode');

// Auto set username from email
userSchema.pre('save', function (next) {
  if (!this.username) {
    this.username = extractUsername(this.email);
  }
  next();
});

// Remove `isAvailableForChat and plans` if role isn't Creator
userSchema.pre('save', async function (next) {
  if (this.role !== 'creator') {
    this.isAvailableForChat = undefined;
    this.plans = undefined;
  }
  next();
});

// Automatically create two plans for a creator after they sign up
userSchema.pre('save', async function (next) {
  if (this.role === 'creator' && (!this.plans || this.plans.length === 0)) {
    this.plans = [
      { planName: 'Per Message', price: 5 },
      { planName: 'Monthly', price: 400, totalMonthlyMessages: 100 },
    ];
  }
  next();
});

// Hash password - only if password is new or has changed
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Don't hash if pw has not changed
  this.password = await bcrypt.hash(this.password, 12); // Do hash, if pw is new or has changed
  next();
});

// Update passwordChangedAt time in DB - only if password was changed AND doc is old
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Return boolean if password was changed or not
userSchema.methods.changedPasswordAfter = function (TokenIssuedTime) {
  if (this.passwordChangedAt) {
    const passwordChangedTime = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return passwordChangedTime > TokenIssuedTime;
  }

  return false;
};

// userSchema.methods.createPasswordResetToken = function () {
//   // generate a random string
//   const resetToken = crypto.randomBytes(32).toString('hex');

//   // Encrypt string and save to passwordResetToken
//   this.passwordResetToken = crypto
//     .createHash('sha256')
//     .update(resetToken)
//     .digest('hex');

//   // Save token expire time to DB, and add 10 mins
//   this.passwordResetExpiresAt = Date.now() + 10 * 60 * 1000; // 10 mins

//   // Return plain/unencrypted string
//   return resetToken;
// };

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
