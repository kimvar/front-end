import React, { Suspense, lazy } from "react";
import { createBrowserRouter, useLocation } from "react-router-dom";
import LoadingScreen from "components/LoadingScreen";

import AuthGuard from "@guards/AuthGuard";
import GuestGuard from "@guards/GuestGuard";
import { user } from "utils";

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
const Kizilay = Loadable(lazy(() => import("features/kizilay/Kizilay")));
const Family = Loadable(lazy(() => import("features/family/Family")));
const Login = Loadable(lazy(() => import("features/auth/Login")));

const mainRoot = () => {
  switch (true) {
    case user.orgBasedPermission("Kızılay"):
      return <Kizilay />;
    case user.orgBasedPermission("Diğer"):
      return <DataManagement />;
    case user.orgBasedPermission("Aile"):
      return <Family />;

    default:
      return <></>;
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthGuard>{mainRoot()}</AuthGuard>,
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
