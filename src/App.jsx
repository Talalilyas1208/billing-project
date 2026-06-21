import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashborad";
import PublicRoute from "./routes/Publicroutes";
import PrivateRoute from "./routes/Privateroutes";
import Register from "./register/Register";
import Login from "./login/Login";
import Produts from "./pages/Products";
import Invoice from "./pages/Invoice";
import EmptyInvoicePage from "./pages/Emptyinvoicepage";
import Newinvoice from "./pages/Newinvoice";
import Offers from "./pages/Offer";
import Contact from "./pages/Contact";

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
              <Route path="new" element={<Newinvoice />} />
            </Route>
            <Route path="offers" element={<Offers />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
