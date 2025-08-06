const express = require('express');
const User = require('../models/User');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
  const { userId, plan } = req.body;
  const prices = {
    Starter: 'price_1Nv9qIHdM9p7fF2TQjR8tZrD',      // Stripe test price IDs
    Pro: 'price_1Nv9qIHdM9p7fF2TQjR8tZrE',
    Enterprise: 'price_1Nv9qIHdM9p7fF2TQjR8tZrF'
  };
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{ price: prices[plan], quantity: 1 }],
      success_url: process.env.FRONTEND_URL + '/dashboard?success=true',
      cancel_url: process.env.FRONTEND_URL + '/dashboard?canceled=true',
      client_reference_id: userId
    });
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: 'Stripe error' });
  }
});

module.exports = router;
