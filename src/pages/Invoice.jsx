import { Outlet } from "react-router-dom";
export default function Invoice() {
  return (
    <>
      <div className="invoice-wrapper">
        <Outlet />
      </div>
    </>
  );
}
