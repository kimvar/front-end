import React, { Suspense, lazy } from "react";
import { createBrowserRouter, useLocation } from "react-router-dom";
import LoadingScreen from "components/LoadingScreen";

import AuthGuard from "@guards/AuthGuard";
import GuestGuard from "@guards/GuestGuard";

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes("/")} />}>
      <Component {...props} />
    </Suspense>
  );
};

/* ROUTES */
const DataManagement = Loadable(
  lazy(() => import("features/data-management/DataManagement"))
);
const Login = Loadable(lazy(() => import("features/auth/Login")));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard>
        <DataManagement />
      </AuthGuard>
    ),
  },
  {
    path: "/login",
    element: (
      <GuestGuard>
        <Login />
      </GuestGuard>
    ),
  },
]);

export default router;
