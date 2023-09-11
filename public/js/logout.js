/* eslint-disable*/
import { showAlert } from './alerts';
export const logout = async () => {
  try {
    const res = await fetch('/api/v1/users/logout');

    if (!res.ok) throw res;

    showAlert('success', 'Loggout with success');

    window.setTimeout(() => {
      location.reload(true);
      location.assign('/');
    }, 1500);
  } catch (err) {
    showAlert('error', 'Error logging out. Please try again!');
  }
};
