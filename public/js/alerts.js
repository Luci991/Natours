/* eslint-disable*/

// POPUP
export const hideAlert = () => {
  const el = document.querySelector('.alert');

  if (el) el.parentElement.removeChild(el);
};

/**
 *
 * @param {string} type
 * @param {string} msg
 * @param type error or success
 */
export const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};

// Change content button
export const changeContentButton = function(
  type,
  active = true,
  message = `${type === 'data' ? 'Save settings' : 'Save password'}`
) {
  if (active)
    document.querySelector(`.btn--save-${type}`).textContent = `Updating...`;
  else document.querySelector(`.btn--save-${type}`).textContent = `${message}`;
};
