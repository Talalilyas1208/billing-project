// import Button from "../components/Button";
import EmptyInvoicePage from "./Emptyinvoicepage";

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
