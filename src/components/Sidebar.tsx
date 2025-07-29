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
import { Modal, Center } from "@mantine/core";

// Define types for menu items
interface MenuChild {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  url: string;
}

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  url: string;
  children?: MenuChild[];
}

type SidebarProps = {
  route: "sell" | "purchase" | "default";
};

export const Sidebar = ({ route }: SidebarProps) => {
  const location = useLocation();
  const [showMore, setShowMore] = useState(false);

  // Define separate menu items based on route with proper typing
  const purchaseMenuItems: MenuItem[] = [
    { icon: LayoutDashboard, label: "Dashboard", url: "/purchase/dashboard" },
    { icon: MapPin, label: "Manage Farm", url: "/purchase/manage-farm" },
    { icon: Warehouse, label: "Warehouse", url: "/purchase/warehouse" },
    { icon: TreePine, label: "Lands", url: "/purchase/lands" },
    {
      icon: ShoppingCart,
      label: "Marketplace",
      url: "/purchase",
      children: [
        {
          icon: Package,
          label: "My Products",
          url: "/purchase",
        },
      ],
    },
  ];

  const sellMenuItems: MenuItem[] = [
    { icon: LayoutDashboard, label: "Dashboard", url: "/sell" },
    { icon: CheckSquare, label: "Task", url: "/sell/tasks" },
    { icon: MapPin, label: "Farm Locations", url: "/sell/locations" },
    { icon: Sprout, label: "Planting", url: "/sell/planting" },
    { icon: TreePine, label: "Orchard", url: "/sell/orchard" },
    { icon: Warehouse, label: "Warehouse", url: "/sell/warehouse" },
    { icon: Package, label: "Inventory", url: "/sell/inventory" },
    { icon: Settings, label: "Machinery/Tools", url: "/sell/tools" },
    { icon: ShoppingCart, label: "Market Place", url: "/sell/add-new" },
  ];

  const menuItems = route === "sell" ? sellMenuItems : purchaseMenuItems;

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

              // for sell routes, isActive is buggy
              const isActive =
                item.label === "Marketplace"
                  ? (route === "purchase" &&
                      location.pathname.startsWith("/purchase")) ||
                    (route === "sell" &&
                      (location.pathname === "/sell/add-new" ||
                        /^\/sell\/product(\/.*)?$/.test(location.pathname) ||
                        /^\/sell\/update-product\/[^/]+$/.test(
                          location.pathname
                        )))
                  : location.pathname === item.url;

              const itemClasses = `group flex items-center gap-3 px-3 py-2 transition-all font-medium text-[14px] leading-[100%] tracking-[0%] font-[Montserrat] hover:text-white ${
                isActive
                  ? "bg-[#0F783B] text-white rounded-l-full w-[239px] h-[42px]"
                  : "text-[#414141] rounded-l-lg hover:bg-[#0F783B] hover:rounded-l-full hover:w-[239px] h-[42px]"
              }`;

              return (
                <li key={index} className="w-[239px]">
                  <Link to={item.url} className={itemClasses}>
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
                  </Link>

                  {/* Child routes like "My Products" under Marketplace */}
                  {item.children && (
                    <ul className="ml-6 mt-2 space-y-1">
                      {item.children.map((child: MenuChild, idx: number) => {
                        const ChildIcon = child.icon;
                        const isChildActive = location.pathname === child.url;

                        return (
                          <>
                            <li key={idx}>
                              <Link
                                to={child.url}
                                className={`flex items-center gap-2 px-3 py-1 text-[14px] font-[Montserrat] font-medium transition-colors ${
                                  isChildActive
                                    ? "text-[#0F783B] font-semibold"
                                    : "text-[#414141] hover:text-[#0F783B]"
                                }`}
                              >
                                <ChildIcon
                                  className={`w-4 h-4 ml-2 ${
                                    isChildActive
                                      ? "text-[#0F783B]"
                                      : "text-[#BE8B45]"
                                  }`}
                                />
                                <span>{child.label}</span>
                              </Link>
                            </li>
                            <div className="ml-4 mt-2 w-[176px] h-[1px] rounded-[2px] bg-[#BFE1C8]" />
                          </>
                        );
                      })}
                    </ul>
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
