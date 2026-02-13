import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";


import Dashboard from "./pages/Dashborad";
import PublicRoute from "./Routes/Publicroutes";
import PrivateRoute from "./Routes/Privateroutes";
import Authenticate from "./Login/login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Authenticate />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}