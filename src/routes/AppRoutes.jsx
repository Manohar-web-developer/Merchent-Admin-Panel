import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";

import Dashboard from "../pages/Dashboard";

// Products
import Products from "../pages/Products";
import NewProducts from "../pages/NewProducts";
import Categories from "../pages/Collection";
import Brands from "../pages/Brands";

// Orders
import Orders from "../pages/Orders";
import PendingOrders from "../pages/PendingOrders";
import DeliveredOrders from "../pages/DeliveredOrders";

// Customers
import Customers from "../pages/Customers";

// Analytics
import Analytics from "../pages/Analytics";
import SalesReport from "../pages/SalesReport";
import Revenue from "../pages/Revenue";

// Coupons
import Coupons from "../pages/Coupons";

// Settings
import Settings from "../pages/Settings";
import PaymentMethods from "../pages/PaymentMethods";
import Shipping from "../pages/Shipping";
import EditProducts from "@/pages/EditProducts";
import Material from "@/pages/Material";
import AddBrands from "@/pages/AddBrands";
import AddCategories from "@/components/layout/AddCategories";
import Category from "@/pages/Category";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={<Dashboard />} />

        {/* Products */}
        <Route path="/products" element={<Products />}>
          <Route path="new" element={<NewProducts />} />
          <Route path="edit/:handle" element={<EditProducts />} />

          {/* <Route path="collection">
            <Route index element={<Collection />} />
            <Route path="add" element={<AddCategories />} />
            <Route path="edit/:id" element={<AddCategories />} />
          </Route> */}

          <Route path="brands">
            <Route index element={<Brands />} />
            <Route path="add" element={<AddBrands />} />
            <Route path="edit/:id" element={<AddBrands />} />
          </Route>


          <Route path="material" element={<Material />} />
        </Route>

        {/* Orders */}
        <Route path="/orders" element={<Orders />}>
          <Route path="pending" element={<PendingOrders />} />
          <Route path="delivered" element={<DeliveredOrders />} />
        </Route>

        {/* Customers */}
        <Route path="/customers" element={<Customers />} />

        {/* Analytics */}
        <Route path="/analytics" element={<Analytics />}>
          <Route path="sales-report" element={<SalesReport />} />
          <Route path="revenue" element={<Revenue />} />
        </Route>

        {/* Coupons */}
        <Route path="/coupons" element={<Coupons />} />

        {/* Settings */}
        <Route path="/settings" element={<Settings />}>
          <Route path="payment-methods" element={<PaymentMethods />} />
          <Route path="shipping" element={<Shipping />} />
        </Route>
        <Route path="/category" element={<Category />} />
        
      </Route>
    </Routes>
  );
}