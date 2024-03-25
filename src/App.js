//import logo from './logo.svg';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js//bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BuyPage from "./pages/buyComponent";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import CheckOutPage from "./pages/checkOutPage";

// function login() {
//   console.log("Hello you looking for me?");
//   return(window.location.href= "/buy")

// }

// const ButtonsDetails = [
//   {
//     text:"Dashboard",
//     color:"btn btn-link px-3 me-2"
//   },
//   {
//   text:"Login",
//   onClickFunc:login,
//   color:"btn btn-link px-3 me-2"
// },
// {
//   text:"Sign up for free",
//   color:"btn btn-primary me-3"
// }
// ];

// const InputDetails =[
//   {
//     Label:"Email Address",
//     type :"text"
//   },
//   {
//     Label:"Password",
//     type :"password"

//   }
// ]
import React from "react";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="buy" element={<BuyPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="checkout" element={<CheckOutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
