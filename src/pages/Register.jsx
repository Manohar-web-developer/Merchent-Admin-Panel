import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, Store, ShieldCheck, ShoppingBag, TrendingUp, BarChart3, Users } from 'lucide-react';
import LoginImage from '/LoginImage.png';
import axios from 'axios';
import { toast } from 'sonner';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formSubmit = (e) => {
    e.preventDefault();


    setIsSubmitted(true);

    const form = e.target;
    const errorFiled = [];

    if (!form.terms.checked) {
      errorFiled.push("terms");
    }

    const inputs = form.querySelectorAll("input");

    inputs.forEach((input) => {
      if (input.type === "checkbox") return;

      if (!input.value.trim() && input.name !== "mobile_number") {
        errorFiled.push(input.name);
      }
    });

    setErrors(errorFiled);

    if (errorFiled.length === 0) {
      setLoading(true);
      axios
        .post(
          `${import.meta.env.VITE_API_BASE_URL}user/register`,
          form
        )
        .then((result) => {
          toast.success(result.data.message);
          e.target.reset();
          navigate('/login');
        })
        .catch((error) => {
          toast.error(
            error.response?.data?.message ||
            "Something went wrong. Please try again."
          );
        })
        .finally(() => {
          setLoading(false)
        })
    }
  };

  const removeError = (event) => {
    const { name, value, type, checked } = event.target;

    // Checkbox
    if (type === "checkbox") {
      if (checked) {
        setErrors((prev) => prev.filter((v) => v !== name));
      } else if (isSubmitted) {
        setErrors((prev) =>
          prev.includes(name) ? prev : [...prev, name]
        );
      }

      return;
    }

    // Normal input
    if (value.trim() === "") {
      if (isSubmitted) {
        setErrors((prev) =>
          prev.includes(name) ? prev : [...prev, name]
        );
      }
    } else {
      setErrors((prev) => prev.filter((v) => v !== name));
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f8f5f0] flex items-center justify-center p-4 sm:p-6 lg:p-10 font-sans text-stone-800 antialiased selection:bg-stone-900 selection:text-white">
      {/* Main Outer Split-Screen Card */}
      <div className="w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl shadow-stone-900/10 border border-stone-200/80 flex flex-col lg:flex-row min-h-180">

        {/* LEFT SIDE: Registration Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-14 flex flex-col justify-between bg-white z-10 border-b lg:border-b-0 lg:border-r border-stone-200/60">

          {/* Top Brand Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-stone-900 flex items-center justify-center text-white shadow-md shadow-stone-900/20">
                <Store className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <span className="font-bold text-lg text-stone-900 tracking-tight block leading-tight">Merchant Hub</span>
                <span className="text-[11px] font-medium text-stone-400 tracking-wide uppercase">Admin Portal</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-600 text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Instant Setup</span>
            </div>
          </div>

          {/* Registration Form Section */}
          <div className="my-auto py-6 max-w-md w-full mx-auto space-y-6">
            {/* Header Text */}
            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                Create Your Account
              </h1>
              <p className="text-stone-500 text-sm leading-relaxed">
                Get started and manage your e-commerce business in one place.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={(e) => formSubmit(e)} className="space-y-4">

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 group-focus-within:text-stone-900 transition-colors">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name='name'
                    onChange={removeError}
                    placeholder="Enter your full name"
                    className={`w-full pl-10 pr-4 py-2.5 bg-stone-50/80 border rounded-xl text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white focus:border-transparent transition-all shadow-xs ${errors.includes("name")
                      ? "border-red-500"
                      : "border-stone-200"
                      }`}
                  />

                </div>
                {
                  errors.includes("name") && <p className='text-sm text-red-500 '>Full Name is Required</p>
                }
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 group-focus-within:text-stone-900 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    name='email'
                    onChange={removeError}
                    placeholder="Enter your email address"
                    className={`w-full pl-10 pr-4 py-2.5 bg-stone-50/80 border rounded-xl text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white focus:border-transparent transition-all shadow-xs ${errors.includes("email")
                      ? "border-red-500"
                      : "border-stone-200"
                      }`}
                  />

                </div>
                {
                  errors.includes("email") && <p className='text-sm text-red-500 '>Email is Required</p>
                }
              </div>

              {/* Phone Number (Optional) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                    Phone Number
                  </label>
                  <span className="text-[11px] font-medium text-stone-400 bg-stone-100 px-2 py-0.5 rounded-md">Optional</span>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 group-focus-within:text-stone-900 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    name='mobile_number'
                    placeholder="Enter your phone number"
                    className="w-full pl-10 pr-4 py-2.5 bg-stone-50/80 border border-stone-200 rounded-xl text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white focus:border-transparent transition-all shadow-xs"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 group-focus-within:text-stone-900 transition-colors">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name='password'
                    onChange={removeError}
                    placeholder="Create a password"
                    className={`w-full pl-10 pr-11 py-2.5 bg-stone-50/80 border rounded-xl text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white focus:border-transparent transition-all shadow-xs ${errors.includes("password")
                      ? "border-red-500"
                      : "border-stone-200"
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {
                  errors.includes("password") && <p className='text-sm text-red-500 '>Password is Required</p>
                }
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                  Confirm Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 group-focus-within:text-stone-900 transition-colors">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name='confirmpassword'
                    onChange={removeError}
                    placeholder="Confirm your password"
                    className={`w-full pl-10 pr-11 py-2.5 bg-stone-50/80 border rounded-xl text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white focus:border-transparent transition-all shadow-xs ${errors.includes("confirmpassword")
                      ? "border-red-500"
                      : "border-stone-200"
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {
                  errors.includes("confirmpassword") && <p className='text-sm text-red-500 '>Confirm Password is Required</p>
                }
              </div>

              {/* Terms Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="terms"
                    onChange={removeError}
                    className={`mt-0.5 w-4 h-4 rounded focus:ring-stone-900 cursor-pointer accent-stone-900 ${!errors.includes("terms")
                      ? "border-red-500"
                      : "border-stone-300"
                      }`}
                  />
                  <span className={`text-xs font-medium transition-colors leading-snug ${errors.includes("terms")
                    ? "text-red-600 group-hover:text-red-700"
                    : "text-stone-600 group-hover:text-stone-900"
                    }`}>
                    I agree to the <a href="#" onClick={(e) => e.preventDefault()} className={`font-semibold underline ${errors.includes("terms")
                      ? "text-red-600"
                      : "text-stone-900"
                      }`}>Terms of Service</a> and <a href="#" onClick={(e) => e.preventDefault()} className={`font-semibold underline ${errors.includes("terms")
                        ? "text-red-600"
                        : "text-stone-900"
                        }`}>Privacy Policy</a>
                  </span>
                </label>
              </div>

              {/* Main Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 active:bg-stone-950 text-white font-semibold rounded-xl text-sm shadow-lg shadow-stone-900/15 transition-all flex items-center justify-center gap-2 ${loading
                    ? "opacity-60 cursor-not-allowed"
                    : "cursor-pointer"
                  }`}
              >
                <span>{loading ? "Creating Account..." : "Create Account"}</span>

                {!loading && (
                  <ArrowRight className="w-4 h-4" />
                )}
              </button>
            </form>

            {/* Social Login Section */}
            <div className="space-y-3 pt-2">
              <div className="relative flex items-center justify-center">
                <div className="w-full border-t border-stone-200" />
                <span className="bg-white px-3 text-[11px] font-medium uppercase tracking-wider text-stone-400 absolute">
                  or continue with
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 pt-1">
                {/* Google Button */}
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-2 px-3 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl text-xs font-medium text-stone-700 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Google</span>
                </button>

                {/* Apple Button */}
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-2 px-3 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl text-xs font-medium text-stone-700 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current text-stone-900" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.7c.68-.83 1.15-1.99.98-3.17-1.01.04-2.24.68-2.95 1.51-.63.73-1.18 1.91-1.03 3.06 1.13.09 2.32-.57 3-1.4z" />
                  </svg>
                  <span>Apple</span>
                </button>

                {/* Microsoft Button */}
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-2 px-3 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl text-xs font-medium text-stone-700 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 23 23">
                    <path fill="#f35325" d="M1 1h10v10H1z" />
                    <path fill="#81bc06" d="M12 1h10v10H1z" />
                    <path fill="#05a6f0" d="M1 12h10v10H1z" />
                    <path fill="#ffba08" d="M12 12h10v10H1z" />
                  </svg>
                  <span>Microsoft</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="pt-4 border-t border-stone-100 text-center text-xs text-stone-500">
            Already have an account?{' '}
            <Link to="/login" className="text-stone-900 font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE: Reference Image Workspace Visual */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-[#f9f6f1] via-[#f3ede3] to-[#e8ded0] p-8 sm:p-12 lg:p-14 flex flex-col justify-between relative overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-100/50 rounded-full blur-3xl pointer-events-none" />

          {/* Header Badge & Title */}
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-stone-200/80 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-stone-700 tracking-wide uppercase">Merchant Admin Workspace</span>
            </div>

            <div className="max-w-lg space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 leading-tight tracking-tight">
                Empower Your E-commerce Journey
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Join thousands of merchants tracking orders, managing products, and scaling revenue with ease.
              </p>
            </div>
          </div>

          {/* Hero Workspace Image */}
          <div className="relative z-10 my-6 flex-1 flex items-center justify-center">
            <div className="w-full max-w-lg group relative">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-200 via-stone-200 to-amber-300 rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition duration-500" />

              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-300/80 bg-white">
                <img
                  src={LoginImage}
                  alt="E-commerce Admin Workspace Preview"
                  className="w-full h-auto max-h-[380px] sm:max-h-[420px] object-cover object-right-top transform group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-white/90 shadow-xs text-center flex flex-col items-center gap-1">
              <ShoppingBag className="w-4 h-4 text-stone-700" />
              <span className="block text-xs font-semibold text-stone-900">Products</span>
            </div>
            <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-white/90 shadow-xs text-center flex flex-col items-center gap-1">
              <TrendingUp className="w-4 h-4 text-stone-700" />
              <span className="block text-xs font-semibold text-stone-900">Orders</span>
            </div>
            <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-white/90 shadow-xs text-center flex flex-col items-center gap-1">
              <BarChart3 className="w-4 h-4 text-stone-700" />
              <span className="block text-xs font-semibold text-stone-900">Analytics</span>
            </div>
            <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-white/90 shadow-xs text-center flex flex-col items-center gap-1">
              <Users className="w-4 h-4 text-stone-700" />
              <span className="block text-xs font-semibold text-stone-900">Customers</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
