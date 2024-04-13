//import logo from './logo.svg';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js//bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import UnAuthRoutes from "./routes/UnAuthRoutes";
import DashboardPage from "./pages/dashboard.page";
import AuthGuard from "./guards/AuthGuards";
import ActivityPage from "./pages/activity.page";
import LocationPage from "./pages/locationPage";
import VacationPage from "./pages/vacationPage";
import OfferPage from "./pages/offer.page";
import UserDashboardPage from "./pages/user.dashboard.page";
import NavBarComponent from "./Components/navBarComponent";
import ProtectedRouteAdmin from "./routes/protected.route.admin";
import ProtectedRouteUser from "./routes/protected.route.user";
import CheckOutPage from "./pages/checkOutPage";

function App() {
  return (
    <BrowserRouter>
      <NavBarComponent></NavBarComponent>
      <Routes>
        {UnAuthRoutes}
        <Route path="/" element={<DashboardPage />}>
          <Route element={<ProtectedRouteAdmin />}>
            <Route
              key={"userdashboad"}
              path="/dashboard/userdash"
              element={<AuthGuard component={<UserDashboardPage />} />}
            />
          </Route>
          <Route element={<ProtectedRouteAdmin />}>
            <Route
              key={"offer"}
              path="/dashboard/offer"
              element={<AuthGuard component={<OfferPage />} />}
            />
          </Route>
          <Route element={<ProtectedRouteAdmin />}>
            <Route
              key={"vacation"}
              path="/dashboard/vacation"
              element={<AuthGuard component={<VacationPage />} />}
            />
          </Route>
          <Route element={<ProtectedRouteAdmin />}>
            <Route
              key={"activity"}
              path="/dashboard/activity"
              element={<AuthGuard component={<ActivityPage />} />}
            />
          </Route>
          <Route element={<ProtectedRouteAdmin />}>
            <Route
              key={"location"}
              path="/dashboard/location"
              element={<AuthGuard component={<LocationPage />} />}
            />
          </Route>
        </Route>
        <Route element={<ProtectedRouteUser />}>
          <Route
            key={"checkOut"}
            path="/checkout"
            element={<AuthGuard component={<CheckOutPage />} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
