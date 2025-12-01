import type { RouteObject } from "react-router";
import MainLayout from "../common/layouts/MainLayout";
import HomePage from "../pages/client/home/HomePage";
import LoginGoogle from "../pages/client/auth/LoginGoogle";
import VerifyUser from "../pages/client/auth/VerifyUser";
import DetailMovie from "../pages/client/movie/detail/DetailMovie";
import ShowtimePicker from "../pages/client/movie/detail/components/ShowtimePicker";
import Checkout from "../pages/client/checkout/Checkout";

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
        children: [
          { index: true, element: <ShowtimePicker /> },
          { path: ":showtimeId/:roomId", element: <ShowtimePicker /> },
        ],
      },
      {
        path: "/checkout",
        element: <Checkout />,
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
