import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { validation} from "../utils/validation";
import { loginWithEmail ,registerWithEmail,loginWithSocial,} from "../services/auth";

export default function Authenticate() {
  const navigate = useNavigate();
  const [, setActiveUser] = useLocalStorage("activeUser", null);

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "", displayName: "" ,phonenumber:""});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async () => {
    const Error = validation(formData, isLoginMode);
    if (Error) {
      setError(Error);
      return; 
    }
    setError("");
    setLoading(true);
    try {
      if (isLoginMode) {
        const user = await loginWithEmail(formData.email, formData.password);
        setActiveUser(user);
        navigate("/dashboard");
      } else {
        await registerWithEmail(formData.email, formData.password, formData.displayName);
        setVerificationSent(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocial = async (type) => {
    try {
      const user = await loginWithSocial(type);
      setActiveUser(user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  if (verificationSent) return (
    <div className="p-8 text-center">
      <h2>Verify your email!</h2>
      <button onClick={() => setVerificationSent(false)}>Back to Login</button>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-12 rounded-xl shadow-lg w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">{isLoginMode ? "Login" : "Register"}</h1>
        
        {error && <p className="text-red-500 text-xs text-center">{error}</p>}

        {!isLoginMode && (
          <input name="displayName" placeholder="Name" className="w-full p-3 border rounded" onChange={handleChange} />
        )}
        <input name="email" placeholder="Email" className="w-full p-3 border rounded" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" className="w-full p-3 border rounded" onChange={handleChange} />

        <button onClick={handleAuth} disabled={loading} className="w-full bg-blue-600 text-white p-3 rounded font-bold">
          {loading ? "Please wait..." : isLoginMode ? "Sign In" : "Sign Up"}
        </button>

        <button onClick={() => setIsLoginMode(!isLoginMode)} className="w-full text-sm underline">
          {isLoginMode ? "Need an account?" : "Have an account?"}
        </button>

        <div className="flex gap-2">
          <button onClick={() => handleSocial("google")} className="flex-1 border p-2 rounded">Google</button>
          <button onClick={() => handleSocial("facebook")} className="flex-1 border p-2 rounded">Facebook</button>
        </div>
      </div>
    </div>
  );
}