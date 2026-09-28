import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { SidebarProvider } from "../ui/sidebar";
import AppSidebar from "./AppSidebar";
import Header from "./Header";
// import Layout from "./Layout";

export default function PublicRoute() {
    const token = useSelector((state) => state.login.token);

    if (token) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />
}