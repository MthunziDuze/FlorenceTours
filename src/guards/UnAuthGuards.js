import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UnAuthGuard = ({ component }) => {
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  const checkToken = async () => {
    try {
      let accessToken = localStorage.getItem("jwt");
      if (accessToken) {
        localStorage.removeItem("jwt");
      } else {
        setStatus(true);
      }
      setStatus(true);
    } catch (err) {
      console.log(err.message);
      navigate("/");
    }
  };

  useEffect(() => {
    checkToken();
  }, []);
  return status ? (
    <React.Fragment>{component}</React.Fragment>
  ) : (
    <React.Fragment></React.Fragment>
  );
};
export default UnAuthGuard;
