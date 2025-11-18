import type { RouteObject } from "react-router";
import MainLayout from "../common/layouts/MainLayout";
import HomePage from "../pages/client/home/HomePage";
import LoginGoogle from "../pages/client/auth/LoginGoogle";
import VerifyUser from "../pages/client/auth/VerifyUser";
import DetailMovie from "../pages/client/movie/detail/DetailMovie";

export const MainRoutes: RouteObject[] = [
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "movie/:id",
        element: <DetailMovie />,
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
