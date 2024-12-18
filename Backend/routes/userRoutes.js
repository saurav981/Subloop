const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

// DONE BY USER
router.get('/check-auth', authController.protect, authController.checkAuth);

router.post('/signup', authController.signup);
router.post('/verify-email', authController.verifyEmail);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);
router.get('/me/:username', userController.getPublicUser); // public user

// PROTECT ALL ROUTES UNDER THIS
router.use(authController.protect);

router.post('/logout', authController.logout);
router.patch('/update-my-password', authController.updateMyPassword);

// Happens in userController
router.patch('/update-profile', userController.updateProfile);
router.delete('/delete-me', userController.deleteMe);
// router.get('/get-me', userController.getMe, userController.getUser); // not used

// Update and Deactivate Plan
router.patch('/update-plan', userController.updatePlan);

router.use(authController.restrictTo('admin'));

// DONE BY ADMIN
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
