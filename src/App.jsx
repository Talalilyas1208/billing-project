import { GoogleLogin } from "@react-oauth/google";

import { useState } from "react";
export default function App() {
  const handleError = () => {
    console.log("Login Failed");
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>React Google Auth</h1>

      <GoogleLogin onError={handleError} useOneTap />

      <div></div>
    </div>
  );
}
