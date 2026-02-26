import Sidebar from "../components/Sidebar";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
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
      
      <Sidebar 
        activeUser={activeUser} 
        onLogout={handleLogout} 
      />

      <main className="flex-1 text-black overflow-y-auto p-8 bg-white">
        <h1 className="text-3xl font-semibold">Main Content Area</h1>
        <p className="mt-4 text-gray-600">
          Welcome back, {activeUser.displayName}!
        </p>
      </main>

    </div>
  );
}