import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Dropdown from "./drropdown";
import Dropdownarrow from "./Dropdownarrow";
import useApi from "../Hooks/useApi";

export default function Sidebar({ activeUser, onLogout }) {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [loadings, setloading] = useState();
  const handleToggle = (sectionName) => {
    setOpenSection(openSection === sectionName ? null : sectionName);
  };
  const { loading, error, data } = useApi("/api/sidebar");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <aside className="w-64 h-screen bg-neutral-100 border-r border-neutral-200 flex flex-col">
      <div className="p-6 font-bold text-xl text-black">My App</div>

      <div className="flex-1 px-3 space-y-1 overflow-y-auto">
        <div></div>

        {data.map((section) => (
          <Dropdown
            key={section.id}
            variant="sidebar"
            isOpen={openSection === section.label}
            onToggle={() => handleToggle(section.label)}
            trigger={
              <Button variant="nav" className="px-3">
                <span className="flex-1 text-left font-bold text-[15px]">
                  {section.label}
                </span>
                {section.children && (
                  <div
                    className={`transition-transform ${openSection === section.label ? "rotate-180" : ""}`}
                  >
                    <Dropdownarrow />
                  </div>
                )}
              </Button>
            }
          >
           {section.children.map((child, idx) => (
  <Button 
    key={`sub-${section.id}-${idx}`} 
    variant="nav" 
    className="pl-8 text-sm"
   
    onClick={() => navigate(child.link)} 
  >
  
    {child.name} 
  </Button>
))}
          </Dropdown>
        ))}

        <Button variant="nav" className="px-3">
          <span className="flex-1 text-left font-bold text-[15px]">Bank</span>
        </Button>
      </div>
      <div className="p-4 border-t border-neutral-200">
        <Dropdown
          variant="popover"
          isOpen={isProfileOpen}
          onToggle={setIsProfileOpen}
          trigger={
            <Button
              variant="profile"
              className="border-none shadow-none bg-transparent hover:bg-neutral-200 w-full"
            >
              <div className="flex items-center w-full gap-3 px-1">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                  {activeUser?.displayName?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="flex-1 text-left truncate">
                  <p className="text-sm font-semibold text-black truncate">
                    {activeUser?.displayName || "User"}
                  </p>
                </div>
                <Dropdownarrow />
              </div>
            </Button>
          }
        >
          <div className="p-2 w-48 space-y-1 bg-white border border-neutral-200 rounded-xl shadow-xl">
            <div className="px-3 py-2 border-b border-neutral-100 mb-1">
              <p className="text-[10px] text-gray-400 font-bold uppercase">
                Logged in as
              </p>
              <p className="text-xs truncate">{activeUser?.email}</p>
            </div>
            <Button
              variant="nav"
              onClick={() => navigate("/account")}
              className="text-sm w-full text-left"
            >
              Account Settings
            </Button>
            <Button
              variant="signout"
              onClick={onLogout}
              className="text-sm mt-2 w-full text-left"
            >
              Sign Out
            </Button>
          </div>
        </Dropdown>
      </div>
    </aside>
  );
}
