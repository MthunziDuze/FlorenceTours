import { useEffect } from "react";
import {
  Route,
  Redirect,
  Navigate,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ProtectedRouteUser = (props) => {
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  function presentPage() {
    navigate(-1);
  }

  useEffect(() => {
    if (!token) {
      return <Navigate to="/" />;
    }

    if (token && jwtDecode(token).userType !== "USER") {
      presentPage();
    }
  }, [token && jwtDecode(token).userType !== "USER"]);

  const decodedData = jwtDecode(token);

  if (decodedData.userType === "USER") {
    return <Outlet {...props} />;
  } else if (decodedData.userType !== "USER") {
    presentPage();
  }
};

export default ProtectedRouteUser;
