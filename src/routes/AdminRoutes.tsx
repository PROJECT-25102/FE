import type { RouteObject } from "react-router";
import AdminLayout from "../common/layouts/AdminLayout";
import DashBoard from "../pages/admin/dashboard/DashBoard";
import ListMovie from "../pages/admin/movie/ListMovie";
import ListRoom from "../pages/admin/room/ListRoom";
import ListShowtime from "../pages/admin/showtime/ListShowTime";
import ListUser from "../pages/admin/user/ListUser";
import CreateMovie from "../pages/admin/movie/create/CreateMovie";
import UpdateMovie from "../pages/admin/movie/update/UpdateMovie";

export const AdminRoutes: RouteObject[] = [
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <DashBoard />,
      },
      {
        path: "movie",
        children: [
          {
            index: true,
            element: <ListMovie />,
          },
          {
            path: "create",
            element: <CreateMovie />,
          },
          {
            path: "update/:id",
            element: <UpdateMovie />,
          },
        ],
      },
      {
        path: "room",
        children: [
          {
            index: true,
            element: <ListRoom />,
          },
        ],
      },
      {
        path: "showtime",
        children: [
          {
            index: true,
            element: <ListShowtime />,
          },
        ],
      },
      {
        path: "user",
        element: <ListUser />,
      },
    ],
  },
];
