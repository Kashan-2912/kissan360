import {
  LayoutDashboard,
  CheckSquare,
  MapPin,
  Sprout,
  TreePine,
  Warehouse,
  Package,
  Settings,
  ShoppingCart,
  Menu as MenuIcon,
} from "lucide-react";
import Logo from "../assets/Logo2.png";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Modal, Center } from "@mantine/core"; // ✅ Make sure Mantine Modal is imported

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", url: "/" },
  { icon: CheckSquare, label: "Task", url: "/a" },
  { icon: MapPin, label: "Farm Locations", url: "/b" },
  { icon: Sprout, label: "Planting", url: "/c" },
  { icon: TreePine, label: "Orchard", url: "/d" },
  { icon: Warehouse, label: "Warehouse", url: "/e" },
  { icon: Package, label: "Inventory", url: "/single-product" },
  { icon: Settings, label: "Machinery/Tools", url: "/g" },
  { icon: ShoppingCart, label: "Market Place", url: "/add-new" },
];

export const Sidebar = () => {
  const location = useLocation();
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 bg-[#F3FBF2] h-screen border-r border-[#BFE1C8] flex-col top-[2px]">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <img
              src={Logo || "/placeholder.svg"}
              className="w-[28px] h-[57px]"
              alt="Farm Management System Logo"
            />
            <div>
              <div className="tracking-normal w-[160px] h-[22px] font-[Niramit] uppercase text-[17px] leading-[100%] font-bold text-[#0F783B]">
                FARM MANAGEMENT
              </div>
              <div className="tracking-normal w-[64px] h-[22px] font-[Niramit] uppercase text-[17px] leading-[100%] font-bold text-[#0F783B]">
                SYSTEM
              </div>
            </div>
          </div>
        </div>

        <div className="w-[256px] h-px opacity-20 bg-[#0F783B]" />

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = item.url && location.pathname === item.url;

              const itemClasses = `group flex items-center gap-3 px-3 py-2 transition-all font-medium text-[14px] leading-[100%] tracking-[0%] font-[Montserrat] hover:text-white ${
                isActive
                  ? "bg-[#0F783B] text-white rounded-l-full w-[239px] h-[42px]"
                  : "text-[#414141] rounded-l-lg hover:bg-[#0F783B] hover:rounded-l-full hover:w-[239px] h-[42px]"
              }`;

              const content = (
                <>
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive
                        ? "text-white"
                        : "text-[#BE8B45] group-hover:text-white"
                    }`}
                  />
                  <span className="text-[14px] transition-colors">
                    {item.label}
                  </span>
                </>
              );

              return (
                <li key={index} className="w-[239px] h-[42px]">
                  {item.url ? (
                    <Link to={item.url} className={itemClasses}>
                      {content}
                    </Link>
                  ) : (
                    <div className={itemClasses}>{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 mx-auto bg-gradient-to-r from-[#13783C] to-[#38BE17] rounded-full flex justify-around items-center h-[60px] z-50 px-4 mb-4">
        {menuItems.slice(0, 4).map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={index}
              to={item.url || "#"}
              className="flex flex-col items-center text-white"
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-[Montserrat]">
                {item.label.split(" ")[0]}
              </span>
            </Link>
          );
        })}
        <button
          onClick={() => setShowMore(true)}
          className="flex flex-col items-center text-white"
        >
          <MenuIcon className="w-6 h-6" />
          <span className="text-[10px] font-[Montserrat]">Menu</span>
        </button>
      </div>

      {/* Mobile Hamburger Modal */}
      <Modal
        opened={showMore}
        onClose={() => setShowMore(false)}
        centered
        withCloseButton={false}
        size="sm"
        radius="lg"
        overlayProps={{
          color: "gray",
          opacity: 0.55,
          blur: 3,
        }}
      >
        <Center className="flex flex-col gap-4 text-center px-4 py-6">
          <ul className="w-full flex flex-col gap-4">
            {menuItems.slice(4).map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={index}
                  to={item.url || "#"}
                  onClick={() => setShowMore(false)}
                  className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 text-[#0F783B] w-full justify-center"
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[16px] font-[Montserrat]">
                    {item.label}
                  </span>
                </Link>
              );
            })}
            
          </ul>
          <button
            onClick={() => setShowMore(false)}
            className="mt-4 text-[#0F783B] font-[Montserrat] font-bold"
          >
            Close
          </button>
        </Center>
      </Modal>

      {/* Safe space above the bottom navbar */}
      <div className="md:hidden h-[80px]" />
    </>
  );
};
