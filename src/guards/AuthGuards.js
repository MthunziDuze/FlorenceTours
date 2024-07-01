import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

const AuthGuard = ({ component }) => {
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  const checkToken = async () => {
    try {
      let accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        throw new Error("Unauthorized");
      }
      await authService
        .validateToken(accessToken)
        .then((res) => {
          console.log(res);
          localStorage.setItem("access_token", res.data.access_token);
        })
        .catch((err) => {
          setStatus(false);
          console.log(err);
          localStorage.removeItem("access_token");
          throw err;
        });

      setStatus(true);
      return status ? (
        <React.Fragment>{component}</React.Fragment>
      ) : (
        <React.Fragment></React.Fragment>
      );
    } catch (err) {
      localStorage.removeItem("access_token");
      console.log(err.message);
      navigate("/login");
    }
  };

  useEffect(() => {
    checkToken();
  }, []);
  return status ? <>{component}</> : <React.Fragment></React.Fragment>;
};

export default AuthGuard;
