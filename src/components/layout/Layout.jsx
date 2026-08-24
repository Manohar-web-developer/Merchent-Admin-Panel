import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";

import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Header from "./Header";
import { Toaster } from "@/components/ui/toast";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 min-w-0 h-screen flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 min-h-0 overflow-hidden">
          <Outlet />
        </div>
      </main>
      <Toaster />
    </SidebarProvider>
  );
}