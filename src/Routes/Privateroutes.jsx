import useLocalStorage from "use-local-storage";
import { Outlet ,Navigate} from "react-router-dom";
const PrivateRoute = () => {
  const [activeUser] = useLocalStorage("activeUser", null);
  return activeUser ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute ;