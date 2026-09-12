import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * ProtectedRoute Component
 * Guards admin routes. If no auth token is found in localStorage,
 * redirects the user to /login even if they enter an admin URL manually.
 */
export default function ProtectedRoute() {
  const token = localStorage.getItem("token") || localStorage.getItem("adminToken");
  const isAuthenticated = Boolean(token);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}