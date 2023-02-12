import React, { Suspense, lazy } from "react";
import { createBrowserRouter, useLocation } from "react-router-dom";
import LoadingScreen from "components/LoadingScreen";

import Dashboard from "features/dashboard/Dashboard";

import AuthGuard from "@guards/AuthGuard";
import GuestGuard from "@guards/GuestGuard";
import PermissionGuard from "@guards/PermissionGuard";

import { PERMISSIONS } from "@constants";

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
const PersonQuestioning = Loadable(
  lazy(() => import("features/person-questioning/PersonQuestioning"))
);
const Login = Loadable(lazy(() => import("features/auth/Login")));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard>
        <Dashboard />
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
  {
    path: "data-management",
    element: (
      <AuthGuard>
        <PermissionGuard has={PERMISSIONS.VERI_GIREBILIR}>
          <DataManagement />
        </PermissionGuard>
      </AuthGuard>
    ),
  },
  {
    path: "person-questioning",
    element: (
      <AuthGuard>
        <PermissionGuard has={PERMISSIONS.KISI_SORGULAYABILIR}>
          <PersonQuestioning />
        </PermissionGuard>
      </AuthGuard>
    ),
  },
]);

export default router;
