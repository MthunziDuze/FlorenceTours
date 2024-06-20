import React from "react";
import SidebarMenu from "../Components/sidebar.menu";
import { Route, Routes } from "react-router-dom";
import VacationPage from "./vacationPage";
import OfferPage from "./offer.page";
import LocationPage from "./locationPage";
import ActivityPage from "./activity.page";
import AuthGuard from "../guards/AuthGuards";
import UserDashboardPage from "./user.dashboard.page";

function DashboardPage() {
  return (
    <div className="d-flex">
      <div className="col-auto">
        <SidebarMenu />
      </div>
      <div class="container">
        <Routes>
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
        </Routes>
      </div>
    </div>
  );
}
export default DashboardPage;
