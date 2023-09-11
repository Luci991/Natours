const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController');
const bookingsController = require('./../controllers/bookingsController');

const router = express.Router();

router.get('/me', authController.protect, viewsController.getAccount);
// router.post(
//   '/submit-user-data',
//   authController.protect,
//   viewsController.updateUserData
// );

router.use(authController.isLoggedIn);

router.get(
  '/',
  bookingsController.createBookingCheckout,
  viewsController.getOverview
);

router.get('/tour/:slugTour', viewsController.getTourView);

router.get('/login', viewsController.login);
router.get(
  '/my-bookings',
  authController.protect,
  viewsController.getBookingsUser
);

module.exports = router;
