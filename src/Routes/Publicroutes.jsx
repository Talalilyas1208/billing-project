import useLocalStorage from "use-local-storage";
import { Outlet, Navigate } from "react-router-dom";

const PublicRoute = () => {
  const [activeUser] = useLocalStorage("activeUser", null);

  return !activeUser ? <Outlet /> : <Navigate to="/dashboard" />;
};
export default PublicRoute;
