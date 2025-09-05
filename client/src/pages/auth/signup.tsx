import { useState } from "react";
import { useSignup } from "../../hooks/auth.hook";
import toast from "react-hot-toast";

export default function SignupPage() {
  const { mutate: signup, status: signupStatus } = useSignup();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    signup(
      { username, email, password },
      {
        onSuccess: () => {
          toast.success("Signup Successful");
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/energy-bg.png)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-sky-100/60 via-blue-50/40 to-cyan-100/50" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/98 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-sky-100/40">
          {/* Logo */}
          <div className="text-center mb-8">
            <img
              src="/images/logo.png"
              alt="Smart Energi Hub"
              className="h-16 mx-auto mb-4"
            />

            <p className="text-gray-600">
              Sign up to your Smart Energi Hub account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSignup} className="space-y-6">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-200 bg-sky-50/30 backdrop-blur-sm"
                placeholder="Enter your username"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-200 bg-sky-50/30 backdrop-blur-sm"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-200 bg-sky-50/30 backdrop-blur-sm"
                placeholder="Enter your password"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-sky-500 focus:ring-sky-400 border-sky-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm text-sky-600 hover:text-sky-700 transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={signupStatus === "pending"}
              className="w-full bg-gradient-to-r from-sky-500 to-cyan-500 text-white py-3 px-4 rounded-lg font-medium hover:from-sky-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {signupStatus === "pending" ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing up...
                </div>
              ) : (
                "Sign up"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
