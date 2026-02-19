import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { validation } from "../utils/validation";
import { loginWithEmail, loginWithSocial } from "../services/auth";

export default function Login() {
  const navigate = useNavigate();
  const [, setActiveUser] = useLocalStorage("activeUser", null);
  const [time, setTime] = useLocalStorage("settime", null);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const valError = validation(formData, true);
    if (valError) return setError(valError);

    setError("");
    setLoading(true);
    try {
      const user = await loginWithEmail(formData.email, formData.password);

      if (user?.metadata?.lastSignInTime) {
        setTime(user.metadata.lastSignInTime);
      }

      setActiveUser(user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocial = async (type) => {
    setError("");
    try {
      const user = await loginWithSocial(type);

      if (user?.metadata?.lastSignInTime) {
        setTime(user.metadata.lastSignInTime);
      }

      setActiveUser(user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || `Failed to sign in with ${type}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans text-gray-800">
      <div className="bg-white p-12 rounded-xl shadow-lg w-full max-w-md space-y-4 border border-gray-200">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          Welcome Back
        </h1>

        {error && (
          <p className="text-red-500 text-xs text-center bg-red-50 p-2 rounded border border-red-100">
            {error}
          </p>
        )}

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
          onChange={handleChange}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition active:scale-95 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Login"}
        </button>

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
          <button
            onClick={() => handleSocial("google")}
            className="border border-gray-300 p-2 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 text-sm font-medium transition"
          >
            Google
          </button>
          <button
            onClick={() => handleSocial("facebook")}
            className="border border-gray-300 p-2 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 text-sm font-medium transition"
          >
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
}
