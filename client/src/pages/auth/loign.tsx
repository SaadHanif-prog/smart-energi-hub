import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    const authState = localStorage.getItem("isAuthenticated");
    if (authState === "true") {
      navigate("/"); // Already logged in
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      // Save auth state
      localStorage.setItem("isAuthenticated", "true");

      setIsLoading(false);
      console.log("Login attempt:", { email, password });

      // Redirect to dashboard (protected)
      navigate("/");
    }, 1500);
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
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to your Smart Energi Hub account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-sky-500 to-cyan-500 text-white py-3 px-4 rounded-lg font-medium hover:from-sky-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-sky-600 hover:text-sky-700 font-medium transition-colors"
              >
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
