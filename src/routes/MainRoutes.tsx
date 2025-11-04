import type { RouteObject } from "react-router";
import MainLayout from "../common/layouts/MainLayout";
import HomePage from "../pages/client/home/HomePage";
import LoginGoogle from "../pages/client/auth/LoginGoogle";
import VerifyUser from "../pages/client/auth/VerifyUser";

export const MainRoutes: RouteObject[] = [
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "login-google/:token",
    element: <LoginGoogle />,
  },
  {
    path: "verify",
    element: <VerifyUser />,
  },
];
