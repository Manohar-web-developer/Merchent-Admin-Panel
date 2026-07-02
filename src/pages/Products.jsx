import { Outlet, useLocation } from "react-router-dom";

export default function Products() {
  const { pathname } = useLocation();

  if (pathname !== "/products") {
    return <Outlet />;
  }

  return <div>Products</div>;
}
