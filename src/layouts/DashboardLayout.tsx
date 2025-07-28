import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { Outlet, useLocation } from "react-router-dom";

const DashboardLayout = () => {
  const location = useLocation();

  const isSellRoute = location.pathname.startsWith("/sell");
  const isPurchaseRoute = location.pathname.startsWith("/purchase");

  let sidebarType: "sell" | "purchase" | "default" = "default";
  if (isSellRoute) sidebarType = "sell";
  else if (isPurchaseRoute) sidebarType = "purchase";

  return (
    <div className="flex h-screen bg-[#f8f7ef]">
      <Sidebar route={sidebarType} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
