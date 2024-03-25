import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
const { REACT_APP_STRIPE_PUBLISHABLE_KEY } = process.env;

const StripePayment = async (product) => {
  const stripe = await loadStripe(REACT_APP_STRIPE_PUBLISHABLE_KEY);
  const body = { product };
  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetch(
    "http://localhost:8000/create-checkout-session",
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    }
  );

  const session = await response.json();

  const result = stripe.redirectToCheckout({
    sessionId: session.id,
  });

  if (result.error) {
    console.log(result.error);
  }
};
