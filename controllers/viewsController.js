const catchAsync = require('../utils/catchAsync');
const Tour = require('./../models/tourModel');
const AppError = require('./../utils/appError');
const Bookings = require('./../models/bookingsModel');

exports.getOverview = catchAsync(async (req, res, next) => {
  //   1) Get tour data from collection
  const tours = await Tour.find();
  // 2) Build template

  // 3) Render that template using tour data from 1

  res.status(200).render('overview', {
    tours,
    title: 'Exciting tours for adventurous people'
  });
});

exports.getTourView = catchAsync(async (req, res) => {
  const { slugTour } = req.params;

  const tour = await Tour.findOne({ slug: slugTour }).populate({
    path: 'reviews',
    fields: 'review rating user '
  });

  if (!tour) throw new AppError('There is no tour with that name', 404);
  res.status(200).render('tour', { tour });
});

exports.login = catchAsync(async (req, res, next) => {
  res.status(200).render('login', { title: 'Login' });
});

exports.getAccount = (req, res) => {
  res.status(200).render('account', { title: 'My account' });
};

// exports.updateUserData = catchAsync(async (req, res) => {
//   .log('Updateing User', req.body);

//   const updateUser = await User.findByIdAndUpdate(
//     req.user.id,
//     {
//       email: req.body.email,
//       name: req.body.name
//     },
//     {
//       new: true,
//       runValidators: true
//     }
//   );

//   res.status(200).render('account', {
//     title: 'My account',
//     user: updateUser
//   });
// });

exports.getBookingsUser = catchAsync(async (req, res, next) => {
  // Get all bookings
  const bookings = await Bookings.find({ user: req.user.id });

  // Get Tours what is in the bookings

  const tourIds = bookings.map(el => el.tour);

  const tours = await Tour.find({ _id: { $in: tourIds } });

  const localVariables =
    tours.length === 0
      ? {
          title: 'My Bookings',
          message: `Sorry but you don't have any bookings now!`
        }
      : {
          tours,
          title: 'My Bookings',
          message: `Sorry but you don't have any bookings now!`
        };

  res.status(200).render('overview', localVariables);
});
