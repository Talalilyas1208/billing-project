import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Dropdown, Avatar } from "antd";
import { DownOutlined } from "@ant-design/icons";
import usefetch from "../hooks/Usefetch";

const { Sider } = Layout;

export default function Sidebar({ activeUser, onLogout }) {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { loading, error, data } = usefetch("/api/sidebar");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const menuItems = data.map((section) => {
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
  });

  const profileMenu = {
    items: [
      {
        key: "email",
        label: (
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase">
              Logged in as
            </p>
            <p className="text-xs">{activeUser?.email}</p>
          </div>
        ),
        disabled: true,
      },
      {
        key: "account",
        label: "Account Settings",
        onClick: () => navigate("/account"),
      },
      {
        key: "logout",
        label: "Sign Out",
        danger: true,
        onClick: onLogout,
      },
    ],
  };

  return (
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
        <Dropdown
          menu={profileMenu}
          trigger={["click"]}
          open={isProfileOpen}
          onOpenChange={setIsProfileOpen}
        >
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
        </Dropdown>
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        <Menu
          mode="inline"
          items={menuItems}
          style={{ borderRight: "none", background: "transparent" }}
        />
      </div>
     
    </Sider>
  );
}