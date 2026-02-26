// Sidebar.jsx
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Dropdown from "./drropdown";
import Dropdownarrow from "./Dropdownarrow";

export default function Sidebar({ activeUser, onLogout }) {
  const navigate = useNavigate();

  return (
    <aside className="w-64 h-screen bg-neutral-100 border-r border-neutral-200 flex flex-col">
      <div className="p-6 font-bold text-xl text-black">My App</div>

      <div className="flex-1 px-3 space-y-1 overflow-y-auto">
        
        {/* INVOICING SECTION */}
        <Dropdown
          trigger={
            <Button variant="nav" className="px-3">
              <span className="flex-1 text-left font-bold text-[15px]">Invoicing</span>
              <Dropdownarrow />
            </Button>
          }
        >
          <div className="flex flex-col gap-1 p-1">
            <Button variant="nav" className="pl-8 text-sm" onClick={() => navigate("/invoices")}>Invoices</Button>
            <Button variant="nav" className="pl-8 text-sm">Offers</Button>
            <Button variant="nav" className="pl-8 text-sm">Subscriptions</Button>
            <Button variant="nav" className="pl-8 text-sm">Products</Button>
            <Button variant="nav" className="pl-8 text-sm">Customers</Button>
          </div>
        </Dropdown>

        {/* EXPENSES SECTION */}
        <Dropdown
          trigger={
            <Button variant="nav" className="px-3">
              <span className="flex-1 text-left font-bold text-[15px]">Expenses</span>
              <Dropdownarrow />
            </Button>
          }
        >
          <div className="flex flex-col gap-1 p-1">
            <Button variant="nav" className="pl-8 text-sm">Vendor Bills</Button>
            <Button variant="nav" className="pl-8 text-sm">Receipts</Button>
          </div>
        </Dropdown>

        <Button variant="nav" className="px-3">
           <span className="flex-1 text-left font-bold text-[15px]">Bank</span>
           <Dropdownarrow />
        </Button>

      </div>
      <div className="p-4 border-t border-neutral-200">
        <Dropdown
          trigger={
            <Button variant="profile" className="border-none shadow-none bg-transparent hover:bg-neutral-200">
              <div className="flex items-center w-full gap-3 px-1">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                  {activeUser.displayName?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="flex-1 text-left truncate">
                  <p className="text-sm font-semibold text-black truncate">
                    {activeUser.displayName || "User"}
                  </p>
                </div>
                <Dropdownarrow />
              </div>
            </Button>
          }
        >
          <div className="p-2 w-48 space-y-1">
            <div className="px-3 py-2 border-b border-neutral-100 mb-1">
              <p className="text-[10px] text-gray-400 font-bold uppercase">Logged in as</p>
              <p className="text-xs truncate">{activeUser.email}</p>
            </div>
            <Button variant="nav" onClick={() => navigate("/account")} className="text-sm">Account Settings</Button>
            <Button variant="signout" onClick={onLogout} className="text-sm mt-2">Sign Out</Button>
          </div>
        </Dropdown>
      </div>
    </aside>
  );
}