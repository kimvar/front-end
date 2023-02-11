import React from "react";
import { Navigate } from "react-router-dom";
import { user } from "utils";

const AuthGuard = ({ children }) => {
  if (!user.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default AuthGuard;
