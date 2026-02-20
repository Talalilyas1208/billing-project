import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { validation } from "../utils/validation";
import { loginWithEmail, loginWithSocial } from "../services/auth";
import  Input from '../components/Input';
import Button from "../components/Button";
export default function Login() {
  const navigate = useNavigate();
  const [, setActiveUser] = useLocalStorage("activeUser", null);
  const [time, setTime] = useLocalStorage("settime", null);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setError] = useState();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async (authMethod) => {
  setError("");
  setLoading(true);

  try {
    const user = await authMethod();
    if (user?.metadata?.lastSignInTime) {
      setTime(user.metadata.lastSignInTime);
    }
    setActiveUser(user);
    navigate("/dashboard");
  } catch (err) {
    setError(err.message || "An unexpected error occurred");
  } finally {
    setLoading(false);
  }
};
const handleLogin = () => {
  const valError = validation(formData, true);
  if (valError) return setError(valError);
   
  
  handleAuth(() => loginWithEmail(formData.email, formData.password));
};

const handleSocial = (type) => {
  handleAuth(() => loginWithSocial(type));
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans text-gray-800">
      <div className="bg-white p-12 rounded-xl shadow-lg w-full max-w-md space-y-4 border border-gray-200">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          Welcome Back
        </h1>

        {errors && (
          <p className="text-red-500 text-xs text-center bg-red-50 p-2 rounded border border-red-100">
            {errors}
          </p>
        )}
        <Input
         name="email"
          type="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
          onChange={handleChange} />
      <Input
      name="password" 
        type="password" 
        placeholder="Password" 
        onChange={handleChange}
        errors = {errors}/>
    
        
        <Button
        variant="Login"
          onClick={handleLogin}
          disabled={loading}>
          Login
       </Button>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-blue-600 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>

        <div className="relative flex py-3 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase tracking-widest">
            or
          </span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="google"
            onClick={() => handleSocial("google")}
            className="border border-gray-300 p-2 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 text-sm font-medium transition"
          >
            Google
          </Button>
          <Button
          variant="facebook"
            onClick={() => handleSocial("facebook")}
            className="border border-gray-300 p-2 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 text-sm font-medium transition"
          >
            Facebook
          </Button>
        </div>
      </div>
    </div>
  );
}
