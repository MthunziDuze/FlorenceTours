import { useLocation } from "react-router-dom";
import React from "react";
import MD5 from "crypto-js/md5";
import { Form } from "react-bootstrap";

function PayFast() {
  const { state } = useLocation();
  console.log("State: ", state);
  const myOffer = state[0];
  const loggedin_user = state[1];
  console.log("Offer: ", myOffer);

  const paymentId = "123456755434";
  const dataK = [];
  dataK["merchant_id"] = "10636521";
  dataK["merchant_key"] = "6kkcimrmnghwr";
  dataK["return_url"] = "https://192.168.180.77:3000/login";
  dataK["cancel_url"] = "https://192.168.180.77:3000/login";
  dataK["notify_url"] = "https://192.168.180.77:3000/login";
  dataK["name_first"] = "hello";
  dataK["name_last"] = "hello";
  dataK["email_address"] = "hello";
  dataK["m_payment_id"] = paymentId;
  dataK["amount"] = "1233";
  dataK["item_name"] = "234";
  const myData = {
    given_name: loggedin_user.given_name,
    family_name: loggedin_user.family_name,
    email: loggedin_user.email,
    amount: 123,
    item_name: "myOffer.name",
  };

  const myPassPhrase = "mth957PAYFAST";

  console.log("Signature", dataK);
  const generateSignature = (data, passPhrase = null) => {
    let ptOutput = "";
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        if (data[key] !== "") {
          ptOutput += `${key}=${encodeURIComponent(data[key].trim()).replace(
            /%20/g,
            "+"
          )}&`;
          console.log("ptOutput", ptOutput);
        }
      }
    }

    let getString = ptOutput.slice(0, -1);
    if (passPhrase !== null) {
      getString += `&passPhrase=${encodeURIComponent(passPhrase.trim()).replace(
        /%20/g,
        "+"
      )}`;
    }

    return MD5(getString).toString();
  };

  dataK["signature"] = generateSignature(dataK, myPassPhrase);
  console.log("DataK  ", dataK);

  myData.signature = generateSignature(dataK, myPassPhrase);
  //merchant_id 10636521
  //key 6kkcimrmnghwr

  // const handleSubmit = () => {
  //   return fetch("http://localhost:8000/payfast", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(myData),
  //   }).then((res) => res.json());
  // };

  return (
    <Form action="http://localhost:8000/payfast" method="post">
      <input type="hidden" name="merchant_id" value="10033011" />
      <input type="hidden" name="merchant_key" value="99au53om9zqn7" />
      <input type="hidden" name="amount" value="100.00" />
      <input type="hidden" name="item_name" value="Test Product" />
      <input type="hidden" name="payment_method" value="eft" />
      <input type="submit"></input>
    </Form>
  );
}
export default PayFast;
