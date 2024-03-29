import React, { useEffect } from "react";

const AuthGuard = ({ component }) => {
  useEffect(() => {
    console.log("Auth Guard");
  });
  return <React.Fragment>{component}</React.Fragment>;
};

export default AuthGuard;
