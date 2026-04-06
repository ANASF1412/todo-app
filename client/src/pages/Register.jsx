import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Input, Button } from "../components/UI";
import { PasswordStrength } from "../components/PasswordStrength";
import { useToast } from "../components/Toast";

export const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toasts, showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    year: "",
    department: "",
  });

  const validate = () => {
    const newErrors = {};
    if (!form.username) newErrors.username = "Username required";
    if (!form.email) newErrors.email = "Email required";
    if (!form.password) newErrors.password = "Password required";
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords don't match";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const submitData = {
        username: form.username,
        email: form.email,
        password: form.password,
        age: form.age ? Number(form.age) : undefined,
        year: form.year || undefined,
        department: form.department || undefined,
      };
      await register(submitData);
      showToast("Registration successful!", "success");
      navigate("/dashboard");
    } catch (err) {
      const error = err.response?.data?.error || "Registration failed";
      showToast(error, "error");
      setErrors({ submit: error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 hover:bg-white/15 transition-all duration-300">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-gray-300">Join us today</p>
          </div>

          {errors.submit && <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-lg mb-4 text-sm">{errors.submit}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              error={errors.username}
              icon={null}
            />

            <Input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={errors.email}
            />

            <div>
              <Input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                error={errors.password}
              />
              <PasswordStrength password={form.password} />
            </div>

            <Input
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              error={errors.confirmPassword}
            />

            <div className="grid grid-cols-3 gap-3">
              <Input
                type="number"
                placeholder="Age"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
              />
              <Input
                placeholder="Year"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
              />
              <Input
                placeholder="Dept"
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
              />
            </div>

            <Button loading={loading} type="submit">
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Toasts */}
      {toasts.map((toast) => (
        <div key={toast.id} className={`fixed top-6 right-6 ${toast.type === "success" ? "bg-green-500" : "bg-red-500"} text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in z-50`}>
          {toast.message}
        </div>
      ))}
    </div>
  );
};
