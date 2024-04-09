import TitleContainer from "../Components/containerComponent";
import NavBarComponent from "../Components/navBarComponent";
import { useLocation } from "react-router-dom";
import React, { createContext } from "react";
import PayFast from "./payFast";

const OfferContext = createContext({});

const CheckOutPage = (props) => {
  const { state } = useLocation();
  console.log(state);
  const offer = localStorage.getItem("offer");

  return (
    <div>
      <OfferContext.Provider value={state}>
        <PayFast></PayFast>
      </OfferContext.Provider>
    </div>
  );
};
export default CheckOutPage;
