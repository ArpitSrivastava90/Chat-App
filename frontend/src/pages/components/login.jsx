import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Link } from "react-router";

const Login = () => {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white px-4">
      <div className="w-full max-w-md bg-[#1e293b] p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              value={formData.email}
              onChange={(e) =>
                setformData({ ...formData, email: e.target.value })
              }
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 rounded-md bg-[#0f172a] border border-gray-600 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              value={formData.password}
              onChange={(e) =>
                setformData({ ...formData, password: e.target.value })
              }
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 rounded-md bg-[#0f172a] border border-gray-600 focus:border-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold transition-colors"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-sm text-center text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link to={"/signup"} className="text-blue-400 hover:underline">
            signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
