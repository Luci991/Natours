const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const catchAsync = require('../utils/catchAsync');
const Tour = require('./../models/tourModel');
const Booking = require('./../models/bookingsModel');
const handlerFactory = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked tour
  const { tourId } = req.params;

  const currentTour = await Tour.findById(tourId);

  //   2) Create checkout session

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/?tour=${
      currentTour.id
    }&user=${req.user.id}&price=${currentTour.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${currentTour.slug}`,
    customer_email: req.user.email,
    client_reference_id: tourId,
    // line_items: [
    //   {
    //     name: `${currentTour.name} Tour`,
    //     description: currentTour.summary,
    //     images: [`https://www.natours.dev/img/tours/${currentTour.imageCover}`],
    //     amount: currentTour.price * 100,
    //     currency: 'usd',
    //     quantity: 1
    //   }
    // ]
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: currentTour.price * 100,
          product_data: {
            name: `${currentTour.name} Tour`,
            description: currentTour.summary,
            images: [
              `https://www.natours.dev/img/tours/${currentTour.imageCover}`
            ]
          }
        },
        quantity: 1
      }
    ],
    mode: 'payment'
  });

  // 3) Create session as response
  res.status(200).json({
    status: 'success',
    session
  });
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  // This is temprary unsecury
  const { tour, user, price } = req.query;

  if (!user && !tour && !price) return next();

  await Booking.create({
    tour,
    user,
    price
  });

  // res.redirect(`${req.protocol}//:${req.get('host')}/`);
  res.redirect(req.originalUrl.split('?')[0]);
});

exports.createBooking = handlerFactory.createOne(Booking);
exports.getBooking = handlerFactory.getOne(Booking);
exports.getAllBookings = handlerFactory.getAll(Booking);
exports.updateBooking = handlerFactory.updateOne(Booking);
exports.deleteBooking = handlerFactory.deleteOne(Booking);
