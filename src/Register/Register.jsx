import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { loginWithSocial, registerWithEmail } from "../services/auth";
import useLocalStorage from "use-local-storage";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Register() {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    displayName: "",
    phonenumber: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [activeUser, setActiveUser] = useLocalStorage("sginuser", null);
  const [time, setTime] = useState();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    setError("");
    try {
      await form.validateFields();
    } catch {
      return;
    }

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
        <Form
          form={form}
          layout="vertical"
          initialValues={formData}
          onFinish={handleRegister}
          requiredMark={false}
        >
          <Form.Item
            name="displayName"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input
              name="displayName"
              placeholder="Full Name"
              value={formData.displayName}
              onChange={handleChange}
              antUI={{ size: "large" }}
            />
          </Form.Item>
          <Form.Item
            name="phonenumber"
            rules={[
              { required: true, message: "Please enter your phone number" },
            ]}
          >
            <Input
              name="phonenumber"
              placeholder="Phone Number"
              value={formData.phonenumber}
              onChange={handleChange}
              antUI={{ size: "large" }}
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              antUI={{ size: "large" }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter a password" }]}
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
              antUI="w-full bg-green-600 hover:bg-green-700 text-white justify-center"
              type="submit"
              disabled={loading}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
        <Button
          antUI="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 justify-center gap-2"
          onClick={() => handlelogin("google")}
          disabled={loading}
        >
          <GoogleOutlined />
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