import React from "react";
import TitleContainer from "../Components/containerComponent";

const thankYouPage = () => {
  return (
    <>
      <body>
        <div className="container">
          <div className="thank-you">
            <h1>Thank You!</h1>
            <p>Your payment was successful.</p>
            <p>Your order is being processed.</p>
          </div>
          <div className="back-to-home">
            <p>You will be redirected to the home page shortly.</p>
            <a href="/">Click here if not redirected.</a>
          </div>
        </div>
        <style></style>
      </body>
    </>
  );
};
