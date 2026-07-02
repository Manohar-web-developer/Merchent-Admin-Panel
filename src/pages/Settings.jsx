import { Outlet, useLocation } from "react-router-dom";

export default function Settings() {
  const { pathname } = useLocation();

  if (pathname !== "/settings") {
    return <Outlet />;
  }

  return <div>Settings</div>;
}
