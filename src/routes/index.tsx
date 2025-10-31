import { createBrowserRouter, RouterProvider } from "react-router";
import NotFoundPage from "../pages/NotFoundPage";
import { MainRoutes } from "./MainRoutes";

const routes = createBrowserRouter([
  ...MainRoutes,
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export const AppRoutes = () => {
  return <RouterProvider router={routes} />;
};
