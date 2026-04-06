import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/UI";
import { useToast } from "../components/Toast";

export const Dashboard = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const { toasts, showToast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    age: user?.age || "",
    year: user?.year || "",
    department: user?.department || "",
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const submitData = {
        age: form.age ? Number(form.age) : undefined,
        year: form.year || undefined,
        department: form.department || undefined,
      };
      await updateUser(submitData);
      setEditing(false);
      showToast("Profile updated!", "success");
    } catch (err) {
      showToast(err.response?.data?.error || "Update failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const stats = [
    { label: "Tasks Completed", value: "24", icon: "✓", color: "bg-green-500/20 text-green-400" },
    { label: "Pending Tasks", value: "5", icon: "•", color: "bg-yellow-500/20 text-yellow-400" },
    { label: "Total Activity", value: "89", icon: "→", color: "bg-blue-500/20 text-blue-400" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-slate-800/80 to-slate-900/80 backdrop-blur-xl border-r border-white/10 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } z-40`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-8">AuthApp</h2>
          <nav className="space-y-4">
            <a href="#" className="block px-4 py-3 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 transition">
              🏠 Dashboard
            </a>
            <a href="#" className="block px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 transition">
              👤 Profile
            </a>
            <a href="#" className="block px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 transition">
              ⚙️ Settings
            </a>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Top Navbar */}
        <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-xl border-b border-white/10 sticky top-0 z-30">
          <div className="flex items-center justify-between p-6">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition"
            >
              <span className="text-white text-2xl">☰</span>
            </button>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition font-semibold"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.username}! 👋</h2>
            <p className="text-gray-400">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-2xl mb-4`}>
                  {stat.icon}
                </div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* User Info Card */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Profile Information</h3>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="px-4 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition font-semibold"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {!editing ? (
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Username</p>
                  <p className="text-white font-semibold">{user?.username}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Email</p>
                  <p className="text-white font-semibold">{user?.email}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Age</p>
                  <p className="text-white font-semibold">{user?.age || "Not set"}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Year</p>
                  <p className="text-white font-semibold">{user?.year || "Not set"}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Department</p>
                  <p className="text-white font-semibold">{user?.department || "Not set"}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Age</label>
                    <input
                      type="number"
                      value={form.age}
                      onChange={(e) => setForm({ ...form, age: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Year</label>
                    <input
                      type="text"
                      value={form.year}
                      onChange={(e) => setForm({ ...form, year: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm text-gray-400 mb-2">Department</label>
                    <input
                      type="text"
                      value={form.department}
                      onChange={(e) => setForm({ ...form, department: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/50 font-semibold transition disabled:opacity-50"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 font-semibold transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
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
