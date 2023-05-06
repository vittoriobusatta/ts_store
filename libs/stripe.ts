import Stripe from 'stripe';

const stripeSecretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_TEST_KEY;

if (!stripeSecretKey) {
  throw new Error('Stripe secret key is not defined');
}

const stripeClient = new Stripe(stripeSecretKey, {
  apiVersion: '2022-11-15',
});

export default stripeClient;
