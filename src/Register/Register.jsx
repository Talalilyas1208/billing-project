import { useState } from "react";
import { Link, Form ,useNavigate } from "react-router-dom";
import { validation } from "../utils/validation";
import { loginWithSocial, registerWithEmail } from "../services/auth";
import useLocalStorage from "use-local-storage";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    displayName: "",
    phonenumber: "",
  });
  const navigate= useNavigate()
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [activeUser, setActiveUser] = useLocalStorage("sginuser", null);
const [time,setTime] =useState()
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    const valError = validation(formData, false);
    if (valError) return setError(valError);

    setLoading(true);
    try {
      const newuser = await registerWithEmail(
        formData.email,
        formData.password,
        formData.displayName,
        formData.phonenumber,
      );
      setActiveUser(newuser);
      setVerificationSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
  const handlelogin = async (type) => {
    handleAuth(() => loginWithSocial(type));
  };

  if (verificationSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-12 rounded-xl shadow-lg w-full max-w-md text-center space-y-5">
          <h2 className="text-2xl font-bold text-gray-900">
            Verify your email
          </h2>
          <p className="text-gray-600 text-sm">
            Sent to <span className="font-semibold">{formData.email}</span>.
          </p>
          <Link
            to="/login"
            className="block w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans text-gray-800">
      <div className="bg-white p-12 rounded-xl shadow-lg w-full max-w-md space-y-4 border border-gray-200">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          Create Account
        </h1>
        {error && (
          <p className="text-red-500 text-xs text-center bg-red-50 p-2 rounded border border-red-100">
            {error}
          </p>
        )}
        <Input
          name="displayName"
          placeholder="Full Name"
          onChange={handleChange}
          antUI={{ size: "large" }}
        />
        <Input
          name="phonenumber"
          placeholder="Phone Number"
          onChange={handleChange}
          size={"large"}
        />
        <Input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          antUI={{ size: "large" }}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          antUI={{ size: "large" }}
        />
        <Button variant="login" onClick={handleRegister} disabled={loading}>
          Register
        </Button>
        <Button
          variant="google"
          onClick={() => handlelogin("google")}
          className="border border-gray-300 p-2 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 text-sm font-medium transition"
        >
          Google
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already registered?{" "}
            <Link
              to="/login"
              className="font-bold text-blue-600 hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
