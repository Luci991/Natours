/*eslint-disable */
const stripe = Stripe(
  'pk_test_51Nn0NJGkoACNEvMPLTp0i0teKFZ1LAqNw4vEav37VxU0jGR06ONFQr6c7dBQvXE7v34nLCDZM8eAxVKjFR2BejHD00eToeoDAV'
);

export const bookTour = async tourId => {
  try {
    // 1) Get checkout from API

    const res = await fetch(`/api/v1/bookings/checkout-session/${tourId}`);

    const { session } = await res.json();

    await stripe.redirectToCheckout({
      sessionId: session.id
    });
    // 2) Create checkout form + charge credit card
  } catch (err) {
    console.error(err);
  }
};
