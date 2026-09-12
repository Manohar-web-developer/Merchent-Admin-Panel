import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Store,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Handle Input Changes & Clear Specific Field Errors
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Client-side Form Validation
  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler Placeholder
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    console.log("====================================");
    console.log("🚀 LOGIN FORM SUBMITTED:");
    console.log("Email:", formData.email);
    console.log("Password:", formData.password);
    console.log("Remember Me:", formData.rememberMe);
    console.log("====================================");

    // =========================================================================
    // 🔌 API INTEGRATION PLACEHOLDER FOR USER
    // Baad me API connect karne ke liye yahan Axios call karein:
    //
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}auth/login`, {
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setErrors({ general: err.response?.data?.message || "Login failed" });
    } finally {
      setIsLoading(false);
    }
    // =========================================================================

    // Temporary simulation timer & token set for testing route protection
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("token", "demo_auth_token");
      navigate("/dashboard");
    }, 600);
  };

  // Forgot Password Modal Submit Handler
  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)) {
      alert("Please enter a valid email address for password reset.");
      return;
    }
    console.log("🔑 FORGOT PASSWORD REQUESTED FOR:", forgotEmail);
    setForgotSuccess(true);
    setTimeout(() => {
      setForgotSuccess(false);
      setForgotModalOpen(false);
      setForgotEmail("");
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full bg-[#FAFBFD] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden font-sans">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#5A34FD]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#5A34FD]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#5A34FD] to-[#7B5CFF] flex items-center justify-center text-white mx-auto shadow-lg shadow-[#5A34FD]/25">
            <Store className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Merchant Admin Panel
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Sign in to manage your store, products, and orders
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white border border-gray-200/80 rounded-2xl shadow-xl shadow-gray-200/40 p-6 sm:p-8 space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="text-lg font-bold text-gray-900">Sign In</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Enter your admin credentials below
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4" noValidate>
            {/* Email Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs font-semibold text-gray-700 flex items-center gap-1"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@shopvista.com"
                  className={`w-full h-11 pl-10 pr-3.5 bg-gray-50/50 border ${
                    errors.email ? "border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-[#5A34FD] focus:ring-[#5A34FD]/20"
                  } rounded-xl text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:bg-white focus:ring-2 transition-all`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-xs font-semibold text-gray-700 flex items-center gap-1"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full h-11 pl-10 pr-10 bg-gray-50/50 border ${
                    errors.password ? "border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-[#5A34FD] focus:ring-[#5A34FD]/20"
                  } rounded-xl text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:bg-white focus:ring-2 transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-[#5A34FD] focus:ring-[#5A34FD]/30 cursor-pointer accent-[#5A34FD]"
                />
                <span className="text-xs font-medium text-gray-600">
                  Remember me
                </span>
              </label>

              <button
                type="button"
                onClick={() => setForgotModalOpen(true)}
                className="text-xs font-semibold text-[#5A34FD] hover:text-[#4C2BD8] transition-colors cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-[#5A34FD] hover:bg-[#4C2BD8] text-white font-semibold text-sm rounded-xl shadow-md shadow-[#5A34FD]/20 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          {/* Register Redirect Link */}
          <div className="pt-4 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500">
              Don't have an admin account?{" "}
              <Link
                to="/register"
                className="font-bold text-[#5A34FD] hover:text-[#4C2BD8] transition-colors cursor-pointer inline-flex items-center gap-0.5 ml-1"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Merchant Admin Panel. All rights reserved.
        </p>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-gray-200 max-w-md w-full p-6 space-y-4 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              type="button"
              onClick={() => setForgotModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-lg cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#5A34FD] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  Reset Password
                </h3>
                <p className="text-xs text-gray-500">
                  Enter your admin email to receive reset instructions
                </p>
              </div>
            </div>

            {forgotSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Password reset link has been sent to your email address.</span>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4 pt-1">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="admin@shopvista.com"
                    className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#5A34FD] focus:bg-white"
                  />
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setForgotModalOpen(false)}
                    className="h-9 px-4 text-xs font-medium text-gray-700 cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="h-9 px-4 text-xs font-semibold bg-[#5A34FD] hover:bg-[#4C2BD8] text-white cursor-pointer"
                  >
                    Send Reset Link
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
