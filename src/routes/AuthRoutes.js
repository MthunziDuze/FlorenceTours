import React from "react";
import { Route } from "react-router-dom";
import AuthGuard from "../guards/AuthGuards";
import DashboardPage from "../pages/dashboard.page";
import ActivityPage from "../pages/activity.page";
import OfferPage from "../pages/offer.page";
import VacationPage from "../pages/vacationPage";
import CheckOutPage from "../pages/checkOutPage";

const AuthRoutes = [
  <Route
    key={"dashboard"}
    path="/dashboard/*"
    element={<AuthGuard exact component={<DashboardPage />} />}
  >
    <DashboardPage />
  </Route>,
  <Route
    key={"activity"}
    path="/activities"
    element={<AuthGuard exact component={<ActivityPage />} />}
  />,
  <Route
    key={"offer"}
    path="/offers"
    element={<AuthGuard exact component={<OfferPage />} />}
  />,
  <Route
    key={"vacation"}
    path="/vacation"
    element={<AuthGuard exact component={<VacationPage />} />}
  />,
  <Route
    key={"checkOut"}
    path="/checkout"
    element={<AuthGuard component={<CheckOutPage />} />}
  />,
];
export default AuthRoutes;
