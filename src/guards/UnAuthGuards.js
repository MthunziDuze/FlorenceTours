import React, { useEffect } from "react";

const UnAuthGuard = ({ component }) => {
  useEffect(() => {
    console.log("Auth Guard");
  });
  return <React.Fragment>{component}</React.Fragment>;
};
export default UnAuthGuard;
