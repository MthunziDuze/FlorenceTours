import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthGuard = ({ component }) => {
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      let accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        navigate(`/login`);
      }
      setStatus(true);
      return status ? (
        <React.Fragment>{component}</React.Fragment>
      ) : (
        <React.Fragment></React.Fragment>
      );
    } catch (err) {
      console.log(err.message);
      navigate("/login");
    }
  };
  return status ? <>{component}</> : <React.Fragment></React.Fragment>;
};

export default AuthGuard;
