import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  ChartNoAxesCombined,
  Ticket,
  Folder,
  Folders,
  FolderTree,
  ChevronRight,
  ChevronsDown,
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

import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";


export default function AppSidebar() {
  const [openMenu, setOpenMenu] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(true);
  const { state, setOpen } = useSidebar();
  const location = useLocation();

  const isCategoryActive = location.pathname === "/category";
  const isSubCategoryActive = location.pathname === "/sub-category";
  const isSubSubCategoryActive = location.pathname === "/sub-sub-category";
  const isCategoryTreeActive = isCategoryActive || isSubCategoryActive || isSubSubCategoryActive;

  return (
    <>
      <Sidebar variant="sidebar" collapsible="icon" >
        <div className=" px-2 mt-8 ">
          {/* <SidebarHeader>
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              {state === "expanded" && (
                <span className="font-bold">
                  ShopVista
                </span>
              )}
            </div>
          </SidebarHeader> */}
          <SidebarContent>
            <SidebarMenu className="gap-3">
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
                  <SidebarMenuButton className='cursor-pointer flex items-center justify-between' onClick={() => {

                    if (state === "collapsed") {
                      setOpen(true);
                    }

                    setOpenMenu(
                      openMenu === "products" ? "" : "products"
                    );
                  }} >
                    <div className='flex items-center gap-2'>
                      <Package className="w-4 h-4" />
                      <span>Products</span>
                    </div>
                    {openMenu === 'products' ? <ChevronsDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}

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

                    {/* <SidebarMenuSubItem>
                      <SidebarMenuSubButton className='cursor-pointer' >
                        <Link to="/products/collection">
                          Collections
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem> */}

                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton className='cursor-pointer' >
                        <Link to="/products/brands">
                          Brands
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>

                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton className='cursor-pointer' >
                        <Link to="/products/material">
                          Material
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>

                  </SidebarMenuSub>
                )}

              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link to='/orders'>
                  <SidebarMenuButton className='cursor-pointer  flex items-center justify-between' onClick={() => {
                    if (state === "collapsed") {
                      setOpen(true)
                    }
                    setOpenMenu(openMenu === "orders" ? '' : "orders");
                  }}>
                    <div className='flex items-center gap-2'>
                      <ShoppingCart className="w-4 h-4" />
                      <span>Orders</span>
                    </div>
                    {openMenu === 'orders' ? <ChevronsDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}

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
                  <SidebarMenuButton className='cursor-pointer  flex items-center justify-between' onClick={() => {
                    if (state === "collapsed") {
                      setOpen(true)
                    }
                    setOpenMenu(openMenu === "analytics" ? '' : "analytics")
                  }}>
                    <div className='flex items-center gap-2'>

                      <ChartNoAxesCombined className="w-4 h-4" />
                      <span>Analytics</span>
                    </div>
                    {openMenu === 'analytics' ? <ChevronsDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}

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
                  <SidebarMenuButton className='cursor-pointer  flex items-center justify-between' onClick={() => {
                    if (state === "collapsed") {
                      setOpen(true)
                    }
                    setOpenMenu(openMenu === "settings" ? '' : "settings")
                  }}>
                    <div className='flex items-center gap-2'>
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>

                    </div>
                    {openMenu === 'settings' ? <ChevronsDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}

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

              {/* Category Tree Navigation */}
              <SidebarMenuItem>
                <Link to='/category'>
                  <SidebarMenuButton
                    className='cursor-pointer w-full justify-between'
                  >
                    <div className="flex items-center gap-2">
                      <Folder className="w-4 h-4" />
                      <span>Category</span>
                    </div>
                  </SidebarMenuButton>
                </Link>


              </SidebarMenuItem>

              {/* Webiste Navigation */}

              <SidebarMenuItem>

                <SidebarMenuButton className='cursor-pointer flex items-center justify-between' onClick={() => {
                  if (state === "collapsed") {
                    setOpen(true)
                  }
                  setOpenMenu(openMenu === "website" ? '' : "website")
                }}>
                  <div className='flex items-center gap-2'>
                    <Settings className="w-4 h-4" />
                    <span>Website</span>
                  </div>
                  {openMenu === 'website' ? <ChevronsDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}

                </SidebarMenuButton>

                {
                  state === "expanded" && openMenu === 'website' && (
                    <SidebarMenuSub>

                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton className='cursor-pointer' >
                          <Link to="/website/testimonials">
                            Testimonials
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