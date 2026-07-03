import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  ChartNoAxesCombined,
  Ticket,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

import { Link } from "react-router-dom";
import { useState } from "react";


export default function AppSidebar() {
  const [openMenu, setOpenMenu] = useState("");
  const { state, setOpen } = useSidebar()

  return (
    <>
      <Sidebar variant="sidebar" collapsible="icon" >
        <div className=" px-2">
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              {state === "expanded" && (
                <span className="font-bold">
                  ShopVista
                </span>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link to='/' >
                  <SidebarMenuButton className='cursor-pointer' onClick={() => setOpenMenu(openMenu === "dashboard" ? '' : "dashboard")} >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>

                <Link to="/products">
                  <SidebarMenuButton className='cursor-pointer' onClick={() => {

                    if (state === "collapsed") {
                      setOpen(true);
                    }

                    setOpenMenu(
                      openMenu === "products" ? "" : "products"
                    );
                  }} >
                    <Package className="w-4 h-4" />
                    <span>Products</span>

                  </SidebarMenuButton>
                </Link>

                {state === "expanded" && openMenu === "products" && (
                  <SidebarMenuSub>


                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton className='cursor-pointer' >
                        <Link to="/products/new">
                          Add Products
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>

                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton className='cursor-pointer' >
                        <Link to="/products/categories">
                          Categories
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>

                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton className='cursor-pointer' >
                        <Link to="/products/brands">
                          Brands
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>

                  </SidebarMenuSub>
                )}

              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link to='/orders'>
                  <SidebarMenuButton className='cursor-pointer' onClick={() => {
                    if(state === "collapsed") {
                      setOpen(true)
                    }
                    setOpenMenu(openMenu === "orders" ? '' : "orders");
                  }}>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Orders</span>

                  </SidebarMenuButton>
                </Link>
                {
                  state === "expanded" && openMenu === 'orders' && (
                    <SidebarMenuSub>

                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton className='cursor-pointer' >
                          <Link to="/orders/delivered">
                            Delivered
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>

                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton className='cursor-pointer' >
                          <Link to="/orders/pending">
                            Pending
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>

                    </SidebarMenuSub>
                  )}
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link to='/customers' >
                  <SidebarMenuButton className='cursor-pointer' onClick={() => setOpenMenu(openMenu === "customers" ? '' : "customers")} >
                    <Users className="w-4 h-4" />
                    <span>Customers</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link to='/analytics'>
                  <SidebarMenuButton className='cursor-pointer' onClick={() =>{
                    if(state === "collapsed"){
                      setOpen(true)
                    }
                    setOpenMenu(openMenu === "analytics" ? '' : "analytics")}}>
                    <ChartNoAxesCombined className="w-4 h-4" />
                    <span>Analytics</span>

                  </SidebarMenuButton>
                </Link>
                {
                  state === "expanded" && openMenu === 'analytics' && (
                    <SidebarMenuSub>

                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton className='cursor-pointer' >
                          <Link to="/analytics/sales-report">
                            Sales Report
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>

                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton className='cursor-pointer' >
                          <Link to="/analytics/revenue">
                            Revenue
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>

                    </SidebarMenuSub>
                  )}
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link to='/coupons' >
                  <SidebarMenuButton className='cursor-pointer' onClick={() => setOpenMenu(openMenu === "coupons" ? '' : "coupons")} >
                    <Ticket className="w-4 h-4" />
                    <span>Coupons</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link to='/settings'>
                  <SidebarMenuButton className='cursor-pointer' onClick={() => {
                    if(state === "collapsed"){
                      setOpen(true)
                    }
                    setOpenMenu(openMenu === "settings" ? '' : "settings")}}>
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>

                  </SidebarMenuButton>
                </Link>
                {
                  state === "expanded" && openMenu === 'settings' && (
                    <SidebarMenuSub>

                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton className='cursor-pointer' >
                          <Link to="/settings/payment-methods">
                            Payment Methods
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>

                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton className='cursor-pointer' >
                          <Link to="/settings/shipping">
                            Shipping
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>

                    </SidebarMenuSub>
                  )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
         
        </div>
      </Sidebar>
    </>
  );
}