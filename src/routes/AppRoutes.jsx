import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ProtectedRoute from "../components/layout/ProtectedRoute";

import Dashboard from "../pages/Dashboard";

// Products
import Products from "../pages/Products";
import NewProducts from "../pages/NewProducts";
import Collection from "../pages/Collection";
import AddCollection from "../pages/AddCollection";
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
import EditProducts from "../pages/EditProducts";
import Material from "../pages/Material";
import AddBrands from "../pages/AddBrands";
import Category from "../pages/Category";
import Testimonials from "../pages/Testimonials";
import BannerSlider from "../pages/BannerSlider";
import Login from "../pages/Login";
import Register from "../pages/Register";
import HeaderMenu from "../pages/HeaderMenu";
import PublicRoute from "../components/layout/PublicRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* LOGIN & REGISTER */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* PROTECTED */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />

        <Route path="/products" element={<Products />}>
          <Route path="new" element={<NewProducts />} />
          <Route path="edit/:id" element={<EditProducts />} />

          <Route path="brands">
            <Route index element={<Brands />} />
            <Route path="add" element={<AddBrands />} />
            <Route path="edit/:id" element={<AddBrands />} />
          </Route>

          <Route path="collection">
            <Route index element={<Collection />} />
            <Route path="add" element={<AddCollection />} />
            <Route path="edit/:id" element={<AddCollection />} />
          </Route>

          <Route path="material" element={<Material />} />
        </Route>

        <Route
          path="/collection"
          element={<Navigate to="/products/collection" replace />}
        />
        <Route
          path="/collections"
          element={<Navigate to="/products/collection" replace />}
        />

        <Route path="/orders" element={<Orders />}>
          <Route path="pending" element={<PendingOrders />} />
          <Route path="delivered" element={<DeliveredOrders />} />
        </Route>

        <Route path="/customers" element={<Customers />} />

        <Route path="/analytics" element={<Analytics />}>
          <Route path="sales-report" element={<SalesReport />} />
          <Route path="revenue" element={<Revenue />} />
        </Route>

        <Route path="/coupons" element={<Coupons />} />

        <Route path="/settings" element={<Settings />}>
          <Route path="payment-methods" element={<PaymentMethods />} />
          <Route path="shipping" element={<Shipping />} />
        </Route>

        <Route path="/category" element={<Category />} />

        <Route path="/navigation">
          <Route
            index
            element={<Navigate to="/navigation/header-menu" replace />}
          />
          <Route path="header-menu" element={<HeaderMenu />} />
        </Route>
        <Route
          path="/header-menu"
          element={<Navigate to="/navigation/header-menu" replace />}
        />

        <Route path="/website">
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="banner-slider" element={<BannerSlider />} />
        </Route>

        {/* Unknown URL */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
