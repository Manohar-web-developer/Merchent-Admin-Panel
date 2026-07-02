import { Outlet, useLocation } from "react-router-dom";

export default function Orders() {
  const { pathname } = useLocation();

  if (pathname !== "/orders") {
    return <Outlet />;
  }

  return <div>Orders</div>;
}
