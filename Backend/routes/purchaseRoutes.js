const express = require('express');
const purchaseController = require('../controllers/purchaseController');
const authController = require('../controllers/authController');

// "/" points to "/api/v1/purchases"

const router = express.Router();

// PROTECT ALL ROUTES UNDER THIS
router.use(authController.protect);

// RAZORPAY
router.post('/create-order', purchaseController.createOrder);
router.post('/verify-payment', purchaseController.verifyPayment);

// STRIPE
// router.get('/checkout-session/:planId', purchaseController.getCheckoutSession);

module.exports = router;
