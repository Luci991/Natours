/*eslint-disable*/
import { JsonWebTokenError } from 'jsonwebtoken';
import { showAlert, changeContentButton } from './alerts';
import axios, { formToJSON } from 'axios';

/**
 *@param {object} event a object e.g from eventListner
 * @param {string} type 'data' or 'password'
 */

const settingAfterType = function(event, type) {
  // Set the form
  const form =
    type === 'data'
      ? new FormData(event.target)
      : Object.fromEntries(new FormData(event.target));

  // Set the header
  const header = type === 'data' ? {} : { 'Content-Type': 'application/json' };

  return { dataForm: form, headers: header };
};

export const updateUser = async function(event, type) {
  try {
    event.preventDefault();
    // // Add feedback to user when is waiting the data behind
    changeContentButton(type, true);

    // Set the data after type
    const { dataForm, headers } = settingAfterType(
      event,
      type,
      dataForm,
      headers
    );

    // Send the request
    const res = await fetch(
      `/api/v1/users/${type === 'data' ? 'updateMe' : 'updateMyPassword'}`,
      {
        headers,
        method: 'PATCH',
        body: type === 'data' ? dataForm : JSON.stringify(dataForm)
      }
    );

    // If is a error throw
    if (!res.ok) throw res;
    showAlert('success', `Updated with success`);
    changeContentButton(type, false);
    // Reset the window
    window.setInterval(() => {
      location.reload(true);
    }, 1500);
  } catch (err) {
    console.log(err);
    // err = await err.json();
    showAlert('error', err.message);
    document.querySelector(`.btn--save-${type}`).textContent = `${
      type === 'data' ? 'save settings' : 'save password'
    }`;
  }
};
