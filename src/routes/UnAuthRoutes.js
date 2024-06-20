import React from "react";
import HomePage from "../pages/homePage";
import BuyPage from "../pages/buyComponent";
import LoginPage from "../pages/loginPage";
import SignupPage from "../pages/signup.page";
import { Route } from "react-router-dom";
import UnAuthGuard from "../guards/UnAuthGuards";
import AboutUsPage from "../pages/about.us";
import ContactUsPage from "../pages/contact.us.page";

const UnAuthRoutes = [
  <Route
    key={"homePage"}
    path="/"
    element={<UnAuthGuard component={<HomePage />} />}
  />,
  <Route
    key={"buyPage"}
    path="/buy"
    element={<UnAuthGuard component={<BuyPage />} />}
  />,
  <Route
    key={"loginPage"}
    path="/login"
    element={<UnAuthGuard component={<LoginPage />} />}
  />,
  <Route
    key={"signupPage"}
    path="/signup"
    element={<UnAuthGuard component={<SignupPage />} />}
  />,
  <Route
    key={"aboutUsPage"}
    path="/about-us"
    element={<UnAuthGuard component={<AboutUsPage />} />}
  />,
  <Route
    key={"contactUsPage"}
    path="/contact-us"
    element={<UnAuthGuard component={<ContactUsPage />} />}
  />,
];
export default UnAuthRoutes;
