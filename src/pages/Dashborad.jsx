import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";

import { getTimeLabel } from "../utils/timelabel"; 

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeUser, setActiveUser] = useLocalStorage("activeUser", null);
  const [lastLogin] = useLocalStorage("settime", null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setActiveUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (!activeUser) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl w-full max-w-sm shadow-xl text-center space-y-6">
        <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl font-bold mx-auto">
          {activeUser.displayName?.charAt(0).toUpperCase()}
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome, {activeUser.displayName || "User"}
          </h2>
          
          {lastLogin ? (
            <p className="text-gray-500 italic mt-2">
              
              Last login: <span className="font-semibold">{getTimeLabel(lastLogin)}</span>
            </p>
          ) : (
            <p className="text-gray-500">First time here? Welcome!</p>
          )}
          
          <p className="text-gray-400 text-xs mt-1">{activeUser.email}</p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-50 text-red-600 border border-red-200 p-2 w-full rounded-lg hover:bg-red-600 hover:text-white transition font-medium"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}