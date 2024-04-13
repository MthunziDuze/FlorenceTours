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

const ProtectedRouteAdmin = (props) => {
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  function presentPage() {
    navigate(-1);
  }

  useEffect(() => {
    if (!token) {
      return <Navigate to="/" />;
    }

    if (token && jwtDecode(token).role !== "admin") {
      presentPage();
    }
  }, [token && jwtDecode(token).role !== "admin"]);

  const decodedData = jwtDecode(token);

  if (decodedData.role === "admin") {
    return <Outlet {...props} />;
  } else if (decodedData.role !== "admin") {
    presentPage();
  }
};

export default ProtectedRouteAdmin;
