import Sidebar from "../components/Sidebar";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import useLocalStorage from "use-local-storage";
export default function Dashboard() {
  const navigate = useNavigate();
  const [activeUser, setActiveUser] = useLocalStorage("activeUser", null);
  const handleLogout = async () => {
    await signOut(auth);
    setActiveUser(null);
    navigate("/login");
  };
  if (!activeUser) return null;
  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeUser={activeUser} onLogout={handleLogout} />
      <main className="flex-1 bg-white overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
