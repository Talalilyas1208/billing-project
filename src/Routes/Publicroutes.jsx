import { Outlet, Navigate } from "react-router-dom";

const PublicRoute = () => {
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));

  return !activeUser ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default PublicRoute;