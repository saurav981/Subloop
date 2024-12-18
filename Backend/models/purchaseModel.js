const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema(
  {
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserModel',
      required: [true, 'Purchase must reference a plan'],
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserModel',
      required: [true, 'Purchase must belong to a buyer'],
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserModel',
      required: [true, 'Purchase must belong to a seller'],
    },
    planName: {
      type: String,
      required: true,
    },
    remainingMessages: {
      type: Number, // for both
    },
    receipt: {
      planName: String,
      amount: Number,
      quantity: {
        type: Number,
        min: [1, 'Quantity must be more than 1'],
        max: [100, 'Quantity must be less than 100'],
      },
    },
    planExpiresIn: Date, // for both
    razorpay: {
      razorpay_payment_id: {
        type: String,
        required: true,
      },
      razorpay_order_id: {
        type: String,
        required: true,
      },
      razorpay_signature: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

// If plan is Monthly, remove 'quantity'
purchaseSchema.pre('save', function (next) {
  if (this.planName === 'Monthly') {
    this.receipt.quantity = undefined;
  }
  next();
});

// If plan is Monthly, it will expire in 30 days, if plan is Per Message, it will expire in 60 days, from the date of purchase
purchaseSchema.pre('save', function (next) {
  if (this.planName === 'Monthly') {
    this.planExpiresIn = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days
  } else if (this.planName === 'Per Message') {
    this.planExpiresIn = Date.now() + 60 * 24 * 60 * 60 * 1000; // 60 days
  }
  next();
});

const PurchaseModel = mongoose.model('Purchase', purchaseSchema);

module.exports = PurchaseModel;
