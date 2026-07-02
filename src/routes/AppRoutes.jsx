import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard.jsx'
import Products from '../pages/Products.jsx'
import Orders from '../pages/Orders.jsx'
import Customers from '../pages/Customers.jsx'
import Analytics from '../pages/Analytics.jsx'
import Settings from '../pages/Settings.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  )
}
