const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const UserModel = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const PurchaseModel = require('../models/purchaseModel');

// RAZORPAY
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create new order
exports.createOrder = async (req, res) => {
  const { planId, quantity } = req.body;

  // 1) Get plan that fan wants to buy
  const seller = await UserModel.findOne(
    { 'plans._id': planId },
    { 'plans.$': 1 }
  );
  if (!seller || !seller.plans.length) {
    return next(new AppError('Plan not found', 404));
  }
  const plan = seller.plans[0];

  // If maxFanLimit is less than 0, exit
  if (plan.maxFanLimit < 0) {
    return next(new AppError('Plan is sold out!', 404));
  }

  try {
    const options = {
      amount:
        plan.price * 100 * `${plan.planName === 'Per Message' ? quantity : 1}`,
      currency: 'INR',
      notes: {
        planId: plan._id,
        sellerId: seller._id,
        planName: plan.planName,
        quantity: `${
          plan.planName === 'Per Message'
            ? quantity
            : plan?.totalMonthlyMessages
        }`,
        amount:
          plan.price * `${plan.planName === 'Per Message' ? quantity : 1}`,
      },
    };
    const order = await razorpayInstance.orders.create(options);

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  // Validate payment signature
  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  if (generatedSignature === razorpay_signature) {
    try {
      // Fetch order to access notes
      const order = await razorpayInstance.orders.fetch(razorpay_order_id);

      // Extract items from order notes
      const { planId, sellerId, planName, amount, quantity } = order.notes;

      // Save purchase/payment details in DB
      await PurchaseModel.create({
        plan: planId,
        buyer: req.user._id,
        seller: sellerId,
        planName: planName,
        remainingMessages: quantity,
        receipt: {
          planName: planName,
          amount: amount,
          quantity: quantity,
        },
        razorpay: {
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
        },
      });

      // Reduce maxFanLimit by 1 from Plan in userModel after successful purchase
      await UserModel.findOneAndUpdate(
        { 'plans._id': planId }, // Match the user and the plan
        { $inc: { 'plans.$.maxFanLimit': -1 } }, // Decrement maxFanLimit by 1
        { new: true } // Return the updated document
      );

      res.redirect(
        `${process.env.FRONTEND_URL}/success?paymentId=${razorpay_payment_id}`
      );
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(400).json({ success: false });
  }
};

// STRIPE
// exports.getCheckoutSession = catchAsync(async (req, res, next) => {
//   const { planId } = req.params;

//   // 1) Get plan that fan wants to buy
//   const user = await UserModel.findOne(
//     { 'plans._id': planId },
//     { 'plans.$': 1 }
//   );
//   if (!user || !user.plans.length) {
//     return next(new AppError('Plan not found', 404));
//   }
//   const plan = user.plans[0];

//   // 2) Create checkout session
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     mode: 'payment',
//     success_url: `${process.env.FRONTEND_URL}/success`,
//     cancel_url: `${process.env.FRONTEND_URL}/cancel`,
//     customer_email: req.user.email,
//     billing_address_collection: 'required', // Will ask users their billing address
//     // Useful for tracking in metadata
//     client_reference_id: JSON.stringify({
//       userId: req.user._id,
//       planId: planId,
//     }),
//     line_items: [
//       {
//         price_data: {
//           product_data: {
//             name: `${plan.planName} Plan`,
//           },
//           unit_amount: plan.price * 100,
//           currency: 'inr',
//         },
//         quantity: 1,
//       },
//     ],
//   });

//   // 3) Send session to client
//   res.status(200).json({ status: 'success', session });
// });

// exports.createPurchase = catchAsync(async (userId, planId) => {
//   // 1) Find the user and specific plan
//   const user = await UserModel.findOne(
//     { 'plans._id': planId },
//     { 'plans.$': 1 }
//   );

//   if (!user || !user.plans.length) {
//     throw new AppError('Plan not found', 404);
//   }

//   const selectedPlan = user.plans[0];

//   // 2) Create the purchase
//   const purchase = await PurchaseModel.create({
//     userId: userId,
//     planId: planId,
//     price: selectedPlan.price,
//     endDate: calculateEndDate(selectedPlan.planName),
//   });

//   return purchase;
// });

// exports.webhookCheckout = catchAsync(async (req, res, next) => {
//   const signature = req.headers['stripe-signature'];

//   let event;
//   try {
//     event = stripe.webhooks.constructEvent(
//       req.body,
//       signature,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   if (event.type === 'checkout.session.completed') {
//     const session = event.data.object;
//     const { userId, planId } = JSON.parse(session.client_reference_id);

//     // Create purchase after successful payment
//     await this.createPurchase(userId, planId);
//   }

//   res.status(200).json({ received: true });
// });

// exports.getUserPurchases = catchAsync(async (req, res, next) => {
//   const purchases = await PurchaseModel.find({ userId: req.user._id });

//   res.status(200).json({
//     status: 'success',
//     results: purchases.length,
//     data: { purchases },
//   });
// });

// // Utility function to calculate end date
// function calculateEndDate(planName) {
//   const endDate = new Date();

//   switch (planName) {
//     case 'Monthly':
//       endDate.setMonth(endDate.getMonth() + 1);
//       break;
//     case 'Per Message':
//       // For per message, maybe set a shorter expiration
//       endDate.setDate(endDate.getDate() + 7);
//       break;
//     default:
//       // Default to 30 days
//       endDate.setDate(endDate.getDate() + 30);
//   }

//   return endDate;
// }
