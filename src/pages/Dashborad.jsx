

import { useState } from "react";

export default function Dashboard() {



  return(
    <div class="flex h-screen ">
  <aside class="w-64 bg-neutral-100 text-white flex flex-col">
    <div class="p-6 text-2xl text-black font-bold border-b border-slate-700">
      Brand
    </div>
    <nav class="flex-1 px-4 py-6 space-y-2">
      <a href="#" class="block px-4 py-2  text-black rounded hover:bg-zinc-300">Dashboard</a>
      <a href="#" class="block px-4 py-2 text-black rounded hover:bg-zinc-300">Projects</a>
      <a href="#" class="block px-4 py-2 text-black rounded hover:bg-zinc-300">Settings</a>
    </nav>
  </aside>

  <main class="flex-1  text-black overflow-y-auto p-8">
    <h1 class="text-3xl  text-black font-semibold">Main Content Area</h1>
    <p class="mt-4  text-black text-gray-600">Your content goes here...</p>
  </main>
</div>
  )
}
















































































// import { signOut } from "firebase/auth";
// import { auth } from "../firebase/firebase";
// import { useNavigate } from "react-router-dom";
// import useLocalStorage from "use-local-storage";

// import { getTimeLabel } from "../utils/timelabel";
// import Button from "../components/Button";
// export default function Dashboard() {
//   const navigate = useNavigate();
//   const [activeUser, setActiveUser] = useLocalStorage("activeUser", null);
//   const [lastLogin] = useLocalStorage("settime", null);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       setActiveUser(null);
//       navigate("/login");
//     } catch (err) {
//       console.error("Logout failed", err);
//     }
//   };

//   if (!activeUser) return null;

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white p-8 rounded-xl w-full max-w-sm shadow-xl text-center space-y-6">
//         <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl font-bold mx-auto">
//           {activeUser.displayName?.charAt(0).toUpperCase()}
//         </div>

//         <div>
//           <h2 className="text-2xl font-bold text-gray-900">
//             Welcome, {activeUser.displayName || "User"}
//           </h2>

//           {lastLogin ? (
//             <p className="text-gray-500 italic mt-2">

//               Last login: <span className="font-semibold">{getTimeLabel(lastLogin)}</span>
//             </p>
//           ) : (
//             <p className="text-gray-500">First time here? Welcome!</p>
//           )}

//           <p className="text-gray-400 text-xs mt-1">{activeUser.email}</p>
//         </div>

//         <Button
//           variant="sginout"
//           onClick={handleLogout}

//         >
//           Sign Out
//         </Button>
//       </div>
//     </div>
//   );
// }