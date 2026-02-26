import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Dropdownarrow from "./Dropdownarrow";

export default function Sidebar({ activeUser, onLogout }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="w-64 bg-neutral-100 border-r border-neutral-200 flex flex-col">
      <div className="p-4 border-t border-neutral-200 relative">
        <Button variant="profile" onClick={() => setIsOpen(!isOpen)}>
          <div className="flex items-center w-full gap-3">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">
              {activeUser.displayName?.charAt(0).toUpperCase() || "U"}
            </div>

            <div className="flex-1 text-left truncate">
              <p className="text-xs font-semibold text-black truncate">
                {activeUser.displayName || "User"}
              </p>
              <span className="block text-[13px] text-gray-500 truncate">
                {activeUser.email?.split("@")[0]}
              </span>
            </div>

            <Dropdownarrow isOpen={isOpen} />
          </div>
        </Button>

        {isOpen && (
          <div className="absolute left-4 mb-2 w-56 bg-white rounded-xl shadow-2xl ring-1 ring-black/5 z-50 p-2 space-y-2">
            <div className="px-4 py-2 border-b border-gray-100 mb-1">
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">
                Account
              </p>
              <p className="text-sm font-medium text-black truncate">
                {activeUser.email}
              </p>
            </div>

            <Button variant="google" onClick={() => navigate("/account")}>
              Account Settings
            </Button>

            <Button variant="signout" onClick={onLogout}>
              Sign Out
            </Button>
          </div>
        )}
      </div>

    
      <div className="p-4">
       
      </div>
    </aside>
  );
}