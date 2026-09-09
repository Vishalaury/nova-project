import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, LogIn } from "lucide-react";
import toast from "react-hot-toast";

import useAuth from "../../hooks/useAuth";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { getErrorMessage } from "../../services/api";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      await login({
        email: formData.email.trim(),
        password: formData.password,
      });

      toast.success("Login successful!");

      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(
        getErrorMessage(error, "Invalid email or password")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo / Heading */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
            <LogIn size={26} />
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Welcome to NOVA
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Sign in to manage your projects and tasks
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              icon={<Mail size={18} />}
              required
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              icon={<Lock size={18} />}
              required
            />

            <Button
              type="submit"
              className="w-full"
              loading={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400">OR</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <p className="text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-slate-900 hover:underline"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}