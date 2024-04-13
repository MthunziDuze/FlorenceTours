import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UnAuthGuard = ({ component }) => {
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      let accessToken = localStorage.getItem("access_token");
      console.log("woo hoo");
      if (!accessToken) {
        localStorage.removeItem("access_token");
      } else {
        setStatus(true);
      }
      setStatus(true);
    } catch (err) {
      console.log(err.message);
      navigate("/");
    }
  };
  return status ? (
    <React.Fragment>{component}</React.Fragment>
  ) : (
    <React.Fragment></React.Fragment>
  );
};
export default UnAuthGuard;
