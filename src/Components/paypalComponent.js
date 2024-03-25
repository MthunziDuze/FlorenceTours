import { PayPalButtons } from "@paypal/react-paypal-js";
import React, { useContext } from "react";
const PaypalComponent = (e) => {
  console.log(e.state);
  const offer = e.state;
  const createOder = (e) => {
    return fetch("http://localhost:8000/create_order", {
      method: "POST",
      headers: {
        "Content-Type": "applicatioms/json",
      },
      body: JSON.stringify({
        e,
      }),
    }).then((res) => res.json());
  };
  const onApprove = (data) => {
    return fetch("http://localhost:8000/capture_order", {
      method: "POST",
      headers: {
        "Content-Type": "applicatioms/json",
      },
      body: JSON.stringify({
        orderId: data.orderID,
      }),
    }).then((res) => res.json());
  };

  return (
    <PayPalButtons
      createOrder={(offer, action) => createOder(offer, action)}
      onApprove={(offer, action) => onApprove(offer, action)}
    />
  );
};
export default PaypalComponent;
