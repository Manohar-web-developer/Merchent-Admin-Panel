import React, { useEffect, useState, CSSProperties } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// import Layout from './Layout';
import Cookies from 'js-cookie'
import { SidebarProvider } from '../ui/sidebar';
import AppSidebar from './AppSidebar';
import Header from './Header';
import axios from 'axios';



export default function ProtectedRoute() {
  const token = Cookies.get('user_token');
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
 let [color, setColor] = useState("#7F22FE");
  useEffect(() => {
    if (!token) {
      setCheckingAuth(false);
      return;
    }

    axios.post(
      `${import.meta.env.VITE_API_BASE_URL}user/details`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then((result) => {
        if (result.data.success) {
          setIsAuthenticated(true);
        } else {
          Cookies.remove("user_token");
          setIsAuthenticated(false);
        }
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          Cookies.remove("user_token");
        }

        setIsAuthenticated(false);
      })
      .finally(() => {
        setCheckingAuth(false);
      });

  }, [token]);

  if (checkingAuth) {
    return <div></div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }


  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="flex-1 min-w-0 h-screen flex flex-col overflow-hidden">
        <Header />

        <div className="flex-1 min-h-0 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}