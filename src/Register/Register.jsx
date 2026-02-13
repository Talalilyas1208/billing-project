import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { validation } from "../utils/validation";
import { registerWithEmail } from "../services/auth";

export default function Register() {
  const [formData, setFormData] = useState({ email: "", password: "", displayName: "", phonenumber: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    const valError = validation(formData, false); 
    if (valError) return setError(valError);

    setLoading(true);
    try {
      await registerWithEmail(formData.email, formData.password, formData.displayName);
      setVerificationSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (verificationSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-12 rounded-xl shadow-lg w-full max-w-md text-center space-y-5">
          <h2 className="text-2xl font-bold text-gray-900">Verify your email</h2>
          <p className="text-gray-600 text-sm">Sent to <span className="font-semibold">{formData.email}</span>.</p>
          <Link to="/login" className="block w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans text-gray-800">
      <div className="bg-white p-12 rounded-xl shadow-lg w-full max-w-md space-y-4 border border-gray-200">
        <h1 className="text-2xl font-bold text-center text-gray-900">Create Account</h1>
        
        {error && <p className="text-red-500 text-xs text-center bg-red-50 p-2 rounded border border-red-100">{error}</p>}

        <input name="displayName" placeholder="Full Name" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" onChange={handleChange} />
        <input name="phonenumber" placeholder="Phone Number" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" onChange={handleChange} />
        <input name="email" placeholder="Email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" onChange={handleChange} />

        <button onClick={handleRegister} disabled={loading} className="w-full bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700 transition active:scale-95 disabled:opacity-50">
          {loading ? "Creating account..." : "Register Now"}
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already registered? <Link to="/login" className="font-bold text-blue-600 hover:underline">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}