import React from "react";
import HomePage from "../pages/homePage";
import BuyPage from "../pages/buyComponent";
import LoginPage from "../pages/loginPage";
import SignupPage from "../pages/signupPage";
import { Route } from "react-router-dom";
import UnAuthGuard from "../guards/UnAuthGuards";

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
];
export default UnAuthRoutes;
