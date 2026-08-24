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

              {/* Category Tree Navigation */}
              <SidebarMenuItem>
                <Link to='/category'>
                  <SidebarMenuButton
                    className='cursor-pointer w-full justify-between'
                    isActive={isCategoryTreeActive}
                    onClick={() => {
                      if (state === "collapsed") {
                        setOpen(true);
                      }
                      setOpenMenu(openMenu === "category" ? '' : "category");
                      setIsCategoryOpen((prev) => !prev);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Folder className="w-4 h-4" />
                      <span>Category</span>
                    </div>
                    {state === "expanded" && (
                      <ChevronRight
                        className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          isCategoryOpen && "rotate-90"
                        )}
                      />
                    )}
                  </SidebarMenuButton>
                </Link>

                {state === "expanded" && isCategoryOpen && (
                  <SidebarMenuSub className="border-l-0 mx-0 ml-7 px-0 py-0 flex flex-col gap-0.5">
                    {/* Sub Category Level */}
                    <SidebarMenuSubItem className="relative flex flex-col">
                      <span className="absolute -left-3 top-0 w-3 h-[14px] border-l border-b border-sidebar-border rounded-bl-sm pointer-events-none" />
                      <Link to='/sub-category' className="w-full">
                        <SidebarMenuSubButton
                          className='cursor-pointer w-full justify-between'
                          isActive={isSubCategoryActive}
                          onClick={() => {
                            setIsSubCategoryOpen((prev) => !prev);
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <Folders className="w-4 h-4" />
                            <span>Sub Category</span>
                          </div>
                          <ChevronRight
                            className={cn(
                              "w-4 h-4 transition-transform duration-200",
                              isSubCategoryOpen && "rotate-90"
                            )}
                          />
                        </SidebarMenuSubButton>
                      </Link>

                      {/* Sub Sub Category Level */}
                      {isSubCategoryOpen && (   
                        <SidebarMenuSub className="border-l-0 mx-0 ml-7 px-0 py-0 flex flex-col gap-0.5 mt-0.5">
                          <SidebarMenuSubItem className="relative flex flex-col">
                            {/* L-shaped Tree Connector Line (└──) */}
                            <span className="absolute -left-3 top-0 w-3 h-[14px] border-l border-b border-sidebar-border rounded-bl-sm pointer-events-none" />
                            <Link to='/sub-sub-category' className="w-full">
                              <SidebarMenuSubButton
                                className='cursor-pointer w-full justify-between'
                                isActive={isSubSubCategoryActive}
                              >
                                <div className="flex items-center gap-2">
                                  <FolderTree className="w-4 h-4" />
                                  <span>Sub Sub Category</span>
                                </div>
                              </SidebarMenuSubButton>
                            </Link>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      )}
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