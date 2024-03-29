import React from "react";
import { Route } from "react-router-dom";
import AuthGuard from "../guards/AuthGuards";
import CheckOutPage from "../pages/checkOutPage";

const AuthRoutes = [
  <Route
    key={"checkOutPage"}
    path="/checkout"
    element={<AuthGuard component={<CheckOutPage />} />}
  />,
];
export default AuthRoutes;
