import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    BarChart3,
    Settings,
  } from "lucide-react";
  
  import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
  
  export default function AppSidebar() {
    return (
      <Sidebar>
        <SidebarHeader>
          <h2 className="text-lg font-bold">ShopVista</h2>
        </SidebarHeader>
  
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <LayoutDashboard />
                <Link to="/dashboard">
                    <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
              
            </SidebarMenuItem>
  
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Package />
                <Link to="/products">
                    <span>Products</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
  
            <SidebarMenuItem>
              <SidebarMenuButton>
                <ShoppingCart />
                <span>Orders</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
  
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Users />
                <span>Customers</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
  
            <SidebarMenuItem>
              <SidebarMenuButton>
                <BarChart3 />
                <span>Analytics</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
  
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    );
  }