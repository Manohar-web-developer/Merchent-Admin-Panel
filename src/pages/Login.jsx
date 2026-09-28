import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Store, ShieldCheck, TrendingUp, ShoppingBag, Users, BarChart3 } from 'lucide-react';
import LoginImage from '/LoginImage.png';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/loginSlice';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = Cookies.get("user_token");
  const dispatch = useDispatch();


  const formSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const errorFiled = [];
    const inputs = form.querySelectorAll("input");

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        errorFiled.push(input.name);
      }
    });

    setErrors(errorFiled);

    if (errorFiled.length === 0 && !token) {
      setLoading(true);
      axios
        .post(
          `${import.meta.env.VITE_API_BASE_URL}user/login`,
          form
        )
        .then((result) => {
          Cookies.set("user_token", result.data.token, { expires: 7 })
          dispatch(login(result.data.token))
          toast.success(result.data.message);
          e.target.reset();
          navigate('/dashboard');
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

    // Normal input
    if (value.trim() === "") {
      setErrors((prev) =>
        prev.includes(name) ? prev : [...prev, name]
      );
    } else {
      setErrors((prev) => prev.filter((v) => v !== name));
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f8f5f0] flex items-center justify-center p-4 sm:p-6 lg:p-10 font-sans text-stone-800 antialiased selection:bg-stone-900 selection:text-white">
      {/* Main Outer Split-Screen Card */}
      <div className="w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl shadow-stone-900/10 border border-stone-200/80 flex flex-col lg:flex-row min-h-[680px]">

        {/* LEFT SIDE: Login Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-between bg-white z-10 border-b lg:border-b-0 lg:border-r border-stone-200/60">

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
              <span>Secure Connection</span>
            </div>
          </div>

          {/* Login Form Section */}
          <div className="my-auto py-8 max-w-md w-full mx-auto space-y-7">
            {/* Header Text */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                Welcome Back
              </h1>
              <p className="text-stone-500 text-sm leading-relaxed">
                Please enter your credentials to sign in to your e-commerce admin panel.
              </p>
            </div>

            {/* Static Form Container */}
            <form onSubmit={(e) => formSubmit(e)} className="space-y-5">
              {/* Email Input */}
              <div className="space-y-2">
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
                    placeholder="admin@merchant.com"
                    onChange={removeError}
                    className="w-full pl-10 pr-4 py-3 bg-stone-50/80 border border-stone-200 rounded-xl text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white focus:border-transparent transition-all shadow-xs"
                  />
                </div>
                {
                  errors.includes("email") && <p className='text-sm text-red-500 '>Email Address is Required</p>
                }
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                    Password
                  </label>
                  <a
                    href="#forgot-password"
                    onClick={(e) => e.preventDefault()}
                    className="text-xs font-semibold text-stone-600 hover:text-stone-900 hover:underline transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 group-focus-within:text-stone-900 transition-colors">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name='password'
                    onChange={removeError}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-11 py-3 bg-stone-50/80 border border-stone-200 rounded-xl text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white focus:border-transparent transition-all shadow-xs"
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

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-stone-900 border-stone-300 rounded focus:ring-stone-900 cursor-pointer accent-stone-900"
                  />
                  <span className="text-xs font-medium text-stone-600 group-hover:text-stone-900 transition-colors">
                    Keep me signed in for 30 days
                  </span>
                </label>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-stone-900 hover:bg-stone-800 active:bg-stone-950 text-white font-semibold rounded-xl text-sm shadow-lg shadow-stone-900/15 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                {loading ? "Signing In..." : "Sign In"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>

            {/* Create Account Navigation Link */}
            <div className="pt-2 text-center text-xs text-stone-500">
              Don't have an account?{' '}
              <Link to="/register" className="text-stone-900 font-bold hover:underline">
                Create Account
              </Link>
            </div>
          </div>

          {/* Footer Info */}
          <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-2">
            <span>© 2026 Merchant Admin. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-stone-600 transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-stone-600 transition-colors">Support</a>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Reference Image & Hero Presentation */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-[#f9f6f1] via-[#f3ede3] to-[#e8ded0] p-8 sm:p-12 lg:p-14 flex flex-col justify-between relative overflow-hidden">
          {/* Ambient Radial Glow Overlays */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-100/50 rounded-full blur-3xl pointer-events-none" />

          {/* Header Text */}
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-stone-200/80 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-stone-700 tracking-wide uppercase">All-in-One Admin Panel</span>
            </div>

            <div className="max-w-lg space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 leading-tight tracking-tight">
                Manage Your E-commerce Business with Ease
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Track orders, manage products, monitor sales, and grow your business — all in one place.
              </p>
            </div>
          </div>

          {/* Laptop / Dashboard Image Visual */}
          <div className="relative z-10 my-6 flex-1 flex items-center justify-center">
            <div className="w-full max-w-lg group relative">
              {/* Outer Glow Blur */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-200 via-stone-200 to-amber-300 rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition duration-500" />

              {/* Image Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-300/80 bg-white">
                <img
                  src={LoginImage}
                  alt="E-commerce Dashboard Laptop Visual"
                  className="w-full h-auto max-h-[380px] sm:max-h-[420px] object-cover object-right-top transform group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Feature Badges Grid */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-white/90 shadow-xs text-center flex flex-col items-center gap-1">
              <ShoppingBag className="w-4 h-4 text-stone-700" />
              <span className="block text-xs font-semibold text-stone-900">Product Management</span>
            </div>
            <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-white/90 shadow-xs text-center flex flex-col items-center gap-1">
              <TrendingUp className="w-4 h-4 text-stone-700" />
              <span className="block text-xs font-semibold text-stone-900">Order Tracking</span>
            </div>
            <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-white/90 shadow-xs text-center flex flex-col items-center gap-1">
              <BarChart3 className="w-4 h-4 text-stone-700" />
              <span className="block text-xs font-semibold text-stone-900">Sales Analytics</span>
            </div>
            <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-white/90 shadow-xs text-center flex flex-col items-center gap-1">
              <Users className="w-4 h-4 text-stone-700" />
              <span className="block text-xs font-semibold text-stone-900">Customer Management</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


