import React from "react";
import { Navigate } from "react-router-dom";
import { user } from "utils/utils";

const AuthGuard = ({ children }) => {
  if (!user.isLoggedIn || !user.credantials?.permissions) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default AuthGuard;
