import React from "react";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
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
      navigate(-1);
    }
  }, [token, navigate]);

  const decodedData = jwtDecode(token);

  if (decodedData.userType === "USER") {
    return <Outlet {...props} />;
  } else if (decodedData.userType !== "USER") {
    presentPage();
  }
};

export default ProtectedRouteUser;
