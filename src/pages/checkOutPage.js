import { useLocation } from "react-router-dom";
import React, { createContext } from "react";
//import PayFast from "./payFast";

const OfferContext = createContext({});

const CheckOutPage = (props) => {
  const { state } = useLocation();
  console.log(state);
  //const offer = localStorage.getItem("offer");

  return (
    <div>
      <OfferContext.Provider value={state}>
        {/* <PayFast></PayFast> */}
        <h1>HI WELCOME TO CHECKOUT</h1>
        <p>Dont worry I am just a place holder for a BIG coming change..</p>
      </OfferContext.Provider>
    </div>
  );
};
export default CheckOutPage;
