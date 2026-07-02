import { Outlet, useLocation } from "react-router-dom";

export default function Analytics() {
  const { pathname } = useLocation();

  if (pathname !== "/analytics") {
    return <Outlet />;
  }

  return <div>Analytics</div>;
}
