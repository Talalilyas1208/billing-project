import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashborad";
import PublicRoute from "./Routes/Publicroutes";
import PrivateRoute from "./Routes/Privateroutes";

import Register from "./Register/Register";
import Login from "./Login/login";
import Produts from "./pages/Products";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} >
        <Route path="products" element={<Produts />} />
        {/* <Route path="invoices" element={<Invoices />} /> */}
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
