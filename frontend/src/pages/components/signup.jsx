import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore.js";
import { Link, Navigate } from "react-router";

function Signup() {
  const [formData, setformData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isLoggedIn, isSigningUp, authUser } = useAuthStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  if (isLoggedIn) {
    console.log("authUser", authUser);

    <Navigate to={"/"} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white px-4">
      <div className="w-full max-w-md bg-[#1e293b] p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Full Name
            </label>
            <input
              value={formData.fullName}
              onChange={(e) =>
                setformData({ ...formData, fullName: e.target.value })
              }
              type="text"
              placeholder="Your Name"
              className="w-full px-3 py-2 rounded-md bg-[#0f172a] border border-gray-600 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Email */}
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

          {/* Password */}
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

          {/* Signup Button */}
          <button
            type="submit"
            disabled={isSigningUp}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold transition-colors"
          >
            {isSigningUp ? "loading" : "signup"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-sm text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-400 hover:underline">
            Login{" "}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
