import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Store,
  Loader2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle Input Changes & Clear Specific Field Errors
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

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

    // Confirm Password validation & Password Mismatch Check
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler Placeholder
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    console.log("====================================");
    console.log("🚀 REGISTER FORM SUBMITTED:");
    console.log("Name:", formData.name);
    console.log("Email:", formData.email);
    console.log("Password:", formData.password);
    console.log("====================================");

    // =========================================================================
    // 🔌 API INTEGRATION PLACEHOLDER FOR USER
    // Baad me API connect karne ke liye yahan Axios call karein:
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      // alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      setErrors({ general: err.response?.data?.message || "Registration failed" });
    } finally {
      setIsLoading(false);
    }
    // =========================================================================

    // Temporary simulation timer
    setTimeout(() => {
      setIsLoading(false);
      alert("Registration submitted! (Check browser console).\nRedirecting to login...");
      navigate("/login");
    }, 600);
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
            Create a new admin account to manage your merchant dashboard
          </p>
        </div>

        {/* Register Form Card */}
        <div className="bg-white border border-gray-200/80 rounded-2xl shadow-xl shadow-gray-200/40 p-6 sm:p-8 space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="text-lg font-bold text-gray-900">Create Account</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Fill in your details below to register
            </p>
          </div>

          <form onSubmit={handleRegisterSubmit} className="space-y-4" noValidate>
            {/* Full Name Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="text-xs font-semibold text-gray-700 flex items-center gap-1"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full h-11 pl-10 pr-3.5 bg-gray-50/50 border ${
                    errors.name ? "border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-[#5A34FD] focus:ring-[#5A34FD]/20"
                  } rounded-xl text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:bg-white focus:ring-2 transition-all`}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-500 font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.name}
                </p>
              )}
            </div>

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

            {/* Confirm Password Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="confirmPassword"
                className="text-xs font-semibold text-gray-700 flex items-center gap-1"
              >
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full h-11 pl-10 pr-10 bg-gray-50/50 border ${
                    errors.confirmPassword ? "border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-[#5A34FD] focus:ring-[#5A34FD]/20"
                  } rounded-xl text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:bg-white focus:ring-2 transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg"
                  title={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.confirmPassword}
                </p>
              )}
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
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          {/* Login Redirect Link */}
          <div className="pt-4 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-[#5A34FD] hover:text-[#4C2BD8] transition-colors cursor-pointer inline-flex items-center gap-0.5 ml-1"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Merchant Admin Panel. All rights reserved.
        </p>
      </div>
    </div>
  );
}