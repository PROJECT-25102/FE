import type { ReactNode } from "react";
import { useAuthSelector } from "../../stores/useAuthStore";
import { Navigate } from "react-router";

const AdminProtected = ({ children }: { children: ReactNode }) => {
  const userRole = useAuthSelector((state) => state.user?.role);
  if (!userRole) return <Navigate to={"/"} />;
  if (userRole !== "admin") return <Navigate to={"/"} />;
  return children;
};

export default AdminProtected;
