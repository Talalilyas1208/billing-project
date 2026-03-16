import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Dropdown, Avatar } from "antd";
import { DownOutlined } from "@ant-design/icons";
import usefetch from "../hooks/Usefetch";
import DropDowns from "./DrropDowns";
import Config from "./Config";

const { Sider } = Layout;

export default function Sidebar({ activeUser, onLogout }) {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { loading, error, data } = usefetch("/api/sidebar");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const menuItems = Array.isArray(data.data)
  ? data.data.map((section) => {
      if (section.children) {
        return {
          key: section.label,
          label: section.label,
          children: section.children.map((child) => ({
            key: child.link,
            label: child.name,
            onClick: () => navigate(child.link),
          })),
        };
      }

    return {
      key: section.label,
      label: section.label,
    };
  }) :[];

  return (
    <Config>
    <Sider
      width={260}
      style={{
        background: "#f5f5f5",
        borderRight: "1px solid #e5e5e5",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: 16, borderTop: "1px solid #e5e5e5" }}>
        <DropDowns
          trigger={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                cursor: "pointer",
              }}
            >
              <Avatar style={{ backgroundColor: "#1677ff" }}>
                {activeUser?.displayName?.charAt(0).toUpperCase() || "U"}
              </Avatar>

              <span style={{ flex: 1 }}>
                {activeUser?.displayName || "User"}
              </span>

              <DownOutlined />
            </div>
          }
          isOpen={isProfileOpen}
          onToggle={setIsProfileOpen}
        >
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase">
              Logged in as
            </p>
            <p className="text-xs">{activeUser?.email}</p>
          </div>

          <div
            className="cursor-pointer p-1 hover:bg-gray-100 rounded"
            onClick={() => navigate("/account")}
          >
            Account Settings
          </div>

          <div
            className="cursor-pointer p-1 text-red-500 hover:bg-gray-100 rounded"
            onClick={onLogout}
          >
            Sign Out
          </div>
        </DropDowns>
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        <Menu
          mode="inline"
          items={menuItems}
          style={{ borderRight: "none", background: "transparent" }}
        />
      </div>
    </Sider>
    </Config>
  );
}
