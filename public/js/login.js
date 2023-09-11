/* eslint-disable */
import { showAlert } from './alerts';

export const login = async obj => {
  try {
    const res = await fetch(`/api/v1/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    });
    if (!res.ok) throw res;

    const data = await res.json();
    showAlert(data.status, 'Loggin with successfully');

    window.setTimeout(() => {
      location.assign('/');
    }, 1500);
  } catch (err) {
    const errData = await err.json();
    showAlert('error', errData.message);
  }
};
