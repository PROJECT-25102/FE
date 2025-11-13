import type { RouteObject } from "react-router";
import AdminLayout from "../common/layouts/AdminLayout";
import ListCategory from "../pages/admin/category/ListCategory";
import CreateCategory from "../pages/admin/category/create/CreateCategory";
import UpdateCategory from "../pages/admin/category/update/UpdateCategory";
import DashBoard from "../pages/admin/dashboard/DashBoard";
import ListMovie from "../pages/admin/movie/ListMovie";
import CreateMovie from "../pages/admin/movie/create/CreateMovie";
import UpdateMovie from "../pages/admin/movie/update/UpdateMovie";
import ListRoom from "../pages/admin/room/ListRoom";
import ListShowtime from "../pages/admin/showtime/ListShowTime";
import ListUser from "../pages/admin/user/ListUser";

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
        path: "category",
        children: [
          {
            index: true,
            element: <ListCategory />,
          },
          {
            path: "create",
            element: <CreateCategory />,
          },
          {
            path: "update/:id",
            element: <UpdateCategory />,
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
