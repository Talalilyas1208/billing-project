import { Routes, Route, Navigate } from "react-router-dom";


import Dashborad from "./Dashborad";
import App from "./App";
function Pagerouting() {
  const [isLogin] = useLocalStorageState("activeuser", false);
  const [isLogins] = useLocalStorageState("isLogins", false);
  console.log(isLogins);
  return (
    <Routes>
     
      <Route path="/login" element={<App />} />
   

      {isLogin ? (
        <Route path="/dashborad" element={<Dashborad />}></Route>
      ) : (
        <Route path="/" element={<Navigate to="/" />} />
      )}
    </Routes>
  );
}

export default Pagerouting;
