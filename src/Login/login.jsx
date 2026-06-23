import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form } from "antd";
import useLocalStorage from "use-local-storage";
import { loginWithEmail, loginWithSocial } from "../services/auth";
import Input from "../components/Input";
import Button from "../components/Button";
import { getAuth } from "firebase/auth";

export default function Login() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [, setActiveUser] = useLocalStorage("activeUser", null);
  const [, setTime] = useLocalStorage("settime", null);
  const [, setAuthToken] = useLocalStorage("authToken", null);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async (authMethod) => {
    setError("");
    setLoading(true);

    try {
      const user = await authMethod();

      if (user) {
        if (user.token) {
          setAuthToken(user.token);
          console.log("Firebase Token:", user.token);
        }

        if (user?.metadata?.lastSignInTime) {
          setTime(user.metadata.lastSignInTime);
        }

        setActiveUser(user);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async () => {
    setError("");
    try {
      await form.validateFields();
    } catch {
      return;
    }

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
        <Form
          form={form}
          layout="vertical"
          initialValues={formData}
          onFinish={handleLoginSubmit}
          requiredMark={false}
          className="space-y-4"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              antUI={{ size: "large" }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              antUI={{ size: "large" }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              antUI={{ size: "large", block: true }}
              style={{ backgroundColor: "#16a34a" }}
              disabled={loading}
              loading={loading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>

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
          <Button
            antUI={{ size: "large", block: true }}
            style={{ backgroundColor: "#d8b4fe" }}
            onClick={() => handleSocial("google")}
            disabled={loading}
          >
            Google
          </Button>
          <Button
            antUI={{ size: "large", block: true }}
            style={{ backgroundColor: "#1877F2", color: "#fff" }}
            onClick={() => handleSocial("facebook")}
            disabled={loading}
          >
            Facebook
          </Button>
        </div>
      </div>
    </div>
  );
}