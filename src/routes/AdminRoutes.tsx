import type { RouteObject } from "react-router";
import AdminLayout from "../common/layouts/AdminLayout";
import DashBoard from "../pages/admin/dashboard/DashBoard";
import ListMovie from "../pages/admin/movie/ListMovie";
import ListRoom from "../pages/admin/room/ListRoom";
import ListShowtime from "../pages/admin/showtime/ListShowTime";
import ListUser from "../pages/admin/user/ListUser";
import CreateMovie from "../pages/admin/movie/create/CreateMovie";
import UpdateMovie from "../pages/admin/movie/update/UpdateMovie";
import ListCategory from "../pages/admin/category/ListCategory";
import CreateCategory from "../pages/admin/category/create/CreateCategory";
import UpdateCategory from "../pages/admin/category/update/UpdateCategory";
import SeatRoom from "../pages/admin/room/SeatRoom/SeatRoom";
import CreateRoom from "../pages/admin/room/create/CreateRoom";
import UpdateRoom from "../pages/admin/room/update/UpdateRoom";
import DetailMovie from "../pages/admin/movie/detail/DetailFlim";
import ListShowtimeInMovie from "../pages/admin/showtime/showtimeMovie/ListShowtimeInMovie";
import CreateMovieShowtime from "../pages/admin/showtime/create/CreateMovieShowtime";
import ListShowtimeToday from "../pages/admin/showtime/ListShowtimeToday";
import ListTicket from "../pages/admin/ticket/ListTicket";
import ScanQR from "../pages/admin/ticket/scanQR/ScanQR";

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
          {
            path: "detail/:id",
            element: <DetailMovie />,
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
          {
            path: "create",
            element: <CreateRoom />,
          },
          {
            path: "update/:id",
            element: <UpdateRoom />,
          },
          {
            path: "seat",
            children: [
              {
                path: ":id",
                element: <SeatRoom />,
              },
            ],
          },
        ],
      },
      {
        path: "showtime",
        element: <ListShowtime />,
        children: [
          { path: "movie/:id", element: <ListShowtimeInMovie /> },
          {
            path: "create",
            element: <CreateMovieShowtime />,
          },
        ],
      },
      {
        path: "showtime/all",
        element: <ListShowtimeToday />,
      },
      {
        path: "user",
        element: <ListUser />,
      },
      {
        path: "ticket",
        children: [
          {
            index: true,
            element: <ListTicket />,
          },
          {
            path: "qr",
            element: <ScanQR />,
          },
        ],
      },
    ],
  },
];
