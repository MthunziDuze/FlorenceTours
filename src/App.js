//import logo from './logo.svg';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js//bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import AuthRoutes from "./routes/AuthRoutes";
import UnAuthRoutes from "./routes/UnAuthRoutes";
import DashboardPage from "./pages/dashboard.page";
import AuthGuard from "./guards/AuthGuards";
import ActivityPage from "./pages/activity.page";
import LocationPage from "./pages/locationPage";
import CheckOutPage from "./pages/checkOutPage";
import VacationPage from "./pages/vacationPage";
import OfferPage from "./pages/offer.page";
import UserDashboardPage from "./pages/user.dashboard.page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {UnAuthRoutes}
        <Route path="/" element={<DashboardPage />}>
          <Route
            key={"userdashboad"}
            path="/dashboard/userdash"
            element={<AuthGuard component={<UserDashboardPage />} />}
          />
          <Route
            key={"offer"}
            path="/dashboard/offer"
            element={<AuthGuard component={<OfferPage />} />}
          />
          <Route
            key={"vacation"}
            path="/dashboard/vacation"
            element={<AuthGuard component={<VacationPage />} />}
          />
          <Route
            key={"activity"}
            path="/dashboard/activity"
            element={<AuthGuard component={<ActivityPage />} />}
          />
          <Route
            key={"location"}
            path="/dashboard/location"
            element={<AuthGuard component={<LocationPage />} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
