import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashborad";
import PublicRoute from "./Routes/Publicroutes";
import PrivateRoute from "./Routes/Privateroutes";

import Register from "./register/Register";
import Login from "./login/login";
import Produts from "./pages/Products";
import Invoice from "./pages/Invoice";
import EmptyInvoicePage from "./pages/Emptyinvoicepage";
import Newinvoice from "./pages/Newinvoice";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="products" element={<Produts />} />
            <Route path="invoices" element={<Invoice />}>
            <Route index element={<EmptyInvoicePage />} /> 
            <Route path="NEW" element={<Newinvoice />} />
          
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
