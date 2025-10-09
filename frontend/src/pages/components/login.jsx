import { useState } from "react";

const Login = () => {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formData", formData);
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
          <a href="/signup" className="text-blue-400 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
