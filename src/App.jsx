import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
export default function App() {
    const [user,setuser] = useState(null)
 
    const handleSuccess = (credentialResponse) => {
   
    const decoded = jwtDecode(credentialResponse.credential);
    console.log(decoded);
    setuser(decoded); 
  };
  const handleError = () => {
    console.log("Login Failed");
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>React Google Auth</h1>

     {!user ? (
        <GoogleLogin 
          onSuccess={handleSuccess} 
          onError={handleError} 
          useOneTap 
        />
      ) : (
        <div>
         
          <h3>Welcome, {user.name}</h3>
          <p>{user.email}</p>
          <button onClick={() => setUser(null)}>Logout</button>
        </div>
      )}

      <div> </div>
    </div>
  );
}
