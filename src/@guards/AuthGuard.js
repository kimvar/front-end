import React from "react";
import { Navigate } from "react-router-dom";
import { user } from "utils";

const AuthGuard = ({ children }) => {
  // TODO: remove permissions check after a while
  if (!user.isLoggedIn || !user.credantials?.permissions) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default AuthGuard;
