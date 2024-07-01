import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRouteAdmin = (props) => {
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  function presentPage() {
    navigate(-1);
  }

  var valid = token && jwtDecode(token).role !== "admin";

  useEffect(() => {
    if (!token) {
      return <Navigate to="/" />;
    }

    if (valid) {
      presentPage();
    }
  }, [valid, presentPage()]);

  const decodedData = jwtDecode(token);

  if (decodedData.role === "ADMIN") {
    return <Outlet {...props} />;
  } else if (decodedData.role !== "ADMIN") {
    presentPage();
  }
};

export default ProtectedRouteAdmin;
