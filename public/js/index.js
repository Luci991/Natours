/* eslint-disable*/
import '@babel/polyfill';
import { login } from './login';
import { displayMap } from './mapBox';
import { logout } from './logout';
import { updateUser } from './updateUser';
import { bookTour } from './stripe';

// Login

if (document.querySelector('.form--login')) {
  const form = document.querySelector('.form');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(this));

    login(formData);
  });
}

if (document.getElementById('map'))
  // For MapBox
  displayMap(JSON.parse(document.getElementById('map').dataset.locations));

if (document.querySelector('.nav__el--logout')) {
  document.querySelector('.nav__el--logout').addEventListener('click', logout);
}

if (document.querySelector('.form-user-data'))
  document
    .querySelector('.form-user-data')
    .addEventListener('submit', function(e) {
      updateUser(e, 'data');
    });

if (document.querySelector('.form-user-settings')) {
  document
    .querySelector('.form-user-settings')
    .addEventListener('submit', function(e) {
      updateUser(e, 'password');
    });
}

if (document.getElementById('book-tour'))
  document.getElementById('book-tour').addEventListener('click', function(e) {
    e.target.textContent = 'Processing...';
    const { tour_id: tourId } = e.target.dataset;

    bookTour(tourId);
  });
