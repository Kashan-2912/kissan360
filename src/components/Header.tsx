import { useSelector } from "react-redux";
import type { RootState } from "../store";
import User from "../assets/user.png";
import { FiBell } from "react-icons/fi";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { LuSearch, LuSettings, LuArrowLeft } from "react-icons/lu";
import { useMediaQuery } from "@mantine/hooks";
import { useState, useRef, useEffect } from "react";
import Logo from "../assets/Logo2.png";
import msg from "../assets/not_found.png"

// Mock notification data - replace with your actual data
const mockNotifications = [
  {
    id: 1,
    image: msg,
    title: "You have a new Order.",
    description: "100kg wheat order by Basit Ali",
    date: "March 10, 2024",
    time: "12:15 am"
  },
  {
    id: 2,
    image: msg,
    title: "You have received Payment From Ali ...",
    description: "Amount: 35000 PKR",
    date: "March 10, 2024",
    time: "11:15 am"
  },
  {
    id: 3,
    image: msg,
    title: "Your Request of wheat (ID# 10298) Has been...",
    description: "The request of wheat Product has been approved",
    date: "March 10, 2024",
    time: "10:15 am"
  },
  {
    id: 4,
    image: msg,
    title: "Your Wheat stock has dropped below 25 kg",
    description: "Increase you most sold product",
    date: "March 10, 2024",
    time: "09:15 am"
  },
  {
    id: 5,
    image: msg,
    title: "Your Request for Rice (ID# 10298) Has been...",
    description: "The request of wheat Product has been rejected",
    date: "March 10, 2024",
    time: "10:15 am"
  },
  {
    id: 6,
    image: msg,
    title: "Additional notification",
    description: "This would trigger Show All",
    date: "March 10, 2024",
    time: "08:15 am"
  }
];

interface NotificationItemProps {
  notification: typeof mockNotifications[0];
}

const NotificationItem = ({ notification }: NotificationItemProps) => (
  <>
    <div className="flex items-center px-3 py-3">
      {/* Image */}
      <img
        src={notification.image}
        alt="notification"
        className="w-[25px] h-[25px] rounded-full object-cover flex-shrink-0 border border-[#BE8B45]"
      />
      
      {/* Main content div */}
      <div className="flex-1 ml-2 min-w-0">
        <div className="flex justify-between items-center">
          {/* Left div - Title and Description */}
          <div className="flex flex-col justify-center flex-1 min-w-0 pr-2">
            <div 
              className="font-[Montserrat] font-medium text-[9px] leading-[100%] text-[#000000] break-words"
              style={{ letterSpacing: '0%' }}
            >
              {notification.title}
            </div>
            <div 
              className="font-[Montserrat] font-normal text-[9px] leading-[100%] text-[#8E8E8E] break-words mt-2"
              style={{ letterSpacing: '0%' }}
            >
              {notification.description}
            </div>
          </div>
          
          {/* Right div - Date and Time */}
          <div className="flex flex-col justify-center items-end flex-shrink-0">
            <div 
              className="font-[Montserrat] font-medium text-[9px] leading-[100%] text-[#2F2F2F] whitespace-nowrap"
              style={{ letterSpacing: '0%' }}
            >
              {notification.date}
            </div>
            <div 
              className="font-[Montserrat] font-normal text-[9px] leading-[100%] text-[#8E8E8E] whitespace-nowrap mt-2"
              style={{ letterSpacing: '0%' }}
            >
              {notification.time}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div 
      className="w-full h-[1px] bg-[#0F783B] opacity-20 rounded-[4px] mx-auto"
      style={{ 
        boxShadow: '0px 2px 10px 0px #00000014'
      }}
    />
  </>
);

export const Header = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const bellRef = useRef<HTMLDivElement>(null);

  const isMedium = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");

  const routeTitleMap: Record<string, string> = {
    "/": "My Products",
    "/add-new": "New Product",
    "/product/:id": "My Product",
    "/purchase": "Marketplace",
    "/purchase/product": "Marketplace", // temporary... will be /purchase/product/:id
    "/purchase/product/checkout": "Marketplace", // temporary... will be /purchase/product/:id/checkout
    "/purchase/history": "Marketplace",
    "/purchase/order/1": "Inventory", // temporary, should be /purchase/order/:id
  };

  let pageTitle = "Dashboard";

  for (const path in routeTitleMap) {
    const match = matchPath({ path, end: true }, location.pathname);
    if (match) {
      pageTitle = routeTitleMap[path];
      break;
    }
  }

  const handleClick = () => {
    navigate("/add-new");
  };

  const orderHistory = () => {
    console.log("Order History");
    navigate("/purchase/history");
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
    // Reset show all state when reopening notifications
    if (!showNotifications) {
      setShowAllNotifications(false);
    }
  };

  const handleShowAll = () => {
    setShowAllNotifications(true);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  const displayedNotifications = showAllNotifications ? mockNotifications : mockNotifications.slice(0, 5);
  const hasMoreNotifications = mockNotifications.length > 5 && !showAllNotifications;

  return (
    <header className="px-6 py-5 relative">
      {/* Desktop / Tablet */}
      <div className="md:flex md:items-center md:justify-between hidden">
        {/* Left Section - User Info */}
        <div className="w-[254px] h-[42px] flex items-center gap-4">
          {/* Bell Icon */}
          <div 
            ref={bellRef}
            className="relative"
          >
            <div 
              className="w-[40px] h-[40px] border bg-[#FFFFFF] border-[#0F783B6B] rounded-full flex items-center justify-center relative cursor-pointer"
              onClick={handleBellClick}
            >
              <FiBell color="#0F783B" size={16} className="z-10" />
              <div className="absolute w-[9px] h-[9px] top-0 right-0 bg-[#0F783B] rounded-full" />
            </div>

            {/* Notifications Modal */}
            {showNotifications && (
              <div 
                className="absolute top-[45px] left-0 w-[320px] h-[340px] bg-white rounded-[4px] z-50 overflow-hidden"
                style={{
                  border: '2px solid #FFFFFF',
                  boxShadow: '0px 4px 10px 0px #0000001A'
                }}
              >
                {/* Modal Header */}
                <div 
                  className="w-full h-[26px] bg-[#F8F7EF] flex items-center justify-between px-3 rounded-t-[4px] flex-shrink-0"
                  style={{
                    boxShadow: '0px 2px 10px 0px #00000014'
                  }}
                >
                  <span 
                    className="font-[Montserrat] font-bold text-[10px] leading-[100%] text-[#0F783B]"
                    style={{ letterSpacing: '0%' }}
                  >
                    Notifications
                  </span>
                  <span 
                    className="font-[Montserrat] font-semibold text-[8px] leading-[100%] text-[#000000] cursor-pointer"
                    style={{ letterSpacing: '0%' }}
                  >
                    Mark all Read
                  </span>
                </div>

                {/* Notifications List */}
                <div className="overflow-y-auto scrollbar-hide overflow-x-hidden" style={{ height: 'calc(292px - 2px)' }}>
                  {displayedNotifications.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))}
                </div>

                {/* Show All Button */}
                {hasMoreNotifications && (
                  <div 
                    className="w-full h-[26px] bg-[#F8F7EF] flex items-center justify-center cursor-pointer rounded-b-[4px] flex-shrink-0"
                    style={{
                      boxShadow: '0px 2px 10px 0px #00000014'
                    }}
                    onClick={handleShowAll}
                  >
                    <span 
                      className="font-[Montserrat] font-semibold text-[8px] leading-[100%] text-[#000000]"
                      style={{ letterSpacing: '0%' }}
                    >
                      Show All
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="h-[35px] w-px bg-[#D9D9D9]" />

          <img
            src={User}
            alt="User avatar"
            className="w-[40px] h-[40px] object-cover rounded-full border border-[#BE8B45]"
          />
          <div className="flex flex-col justify-center gap-[1px]">
            <span className="w-[85px] h-[17px] font-[Montserrat] font-semibold text-[14px] md:text-[10px] lg:text-[14px] text-[#000000] leading-[100%]">
              {user.name}
            </span>
            <span className="w-[125px] h-[17px] font-[Montserrat] font-normal text-[11px] md:text-[10px] lg:text-[11px] text-[#9D9999] leading-[17px]">
              {user.email}
            </span>
          </div>
        </div>

        <h1 className="text-black font-[Montserrat] font-bold text-[24px] md:text-[18px] lg:text-[24px] my-auto">
          {pageTitle}
        </h1>

        <div className="flex items-center gap-3">
          {location.pathname === "/" && (
            <button
              onClick={handleClick}
              className={`cursor-pointer h-[40px] border rounded-[100px] pt-[13px] pr-[14px] pb-[13px] pl-[14px] gap-[3px] bg-[#0F783B] text-[#FFFFFF] border-[#0F783B1A] flex items-center ${
                isMedium ? "w-auto" : "w-[155px]"
              }`}
            >
              <span className="text-lg pb-1 leading-none">+</span>
              {!isMedium && (
                <span className="ml-[7px] font-[Montserrat] font-semibold text-[14px] leading-[100%] flex items-center justify-center">
                  New Product
                </span>
              )}
            </button>
          )}

          {location.pathname === "/purchase" && !isMedium && (
            <button
              onClick={orderHistory}
              className="cursor-pointer h-[40px] border rounded-[100px] pt-[13px] pr-[14px] pb-[13px] pl-[14px] bg-[#0F783B] text-[#FFFFFF] border-[#0F783B1A] flex items-center w-[130px]"
            >
              <span className="font-[Montserrat] font-semibold text-[14px] leading-[100%] flex items-center justify-center">
                Order History
              </span>
            </button>
          )}

          <div className="flex items-center w-[40px] h-[40px] rounded-[20px] bg-[#FFFFFF] border border-[#0F783B6B] p-[12px]">
            <LuSearch color="#0F783B" size={15} />
          </div>

          <div className="flex items-center w-[40px] h-[40px] rounded-[20px] bg-[#FFFFFF] border border-[#0F783B6B] p-[12px]">
            <LuSettings color="#0F783B" size={18} />
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex items-center justify-between md:hidden">
        {/* Back Arrow */}
        <button
          onClick={handleBack}
          className="w-[40px] h-[40px] bg-[#F8E8D2] rounded-full flex items-center justify-center"
        >
          <LuArrowLeft className="text-[#BE8B45] w-5 h-5" />
        </button>

        {/* Logo + Text */}
        <div className="flex items-center gap-2">
          <img
            src={Logo || "/placeholder.svg"}
            className="w-[28px] h-[57px]"
            alt="Farm Management System Logo"
          />
          <div className="flex flex-col text-left">
            <div className="tracking-normal text-[14px] leading-[100%] font-bold font-[Niramit] uppercase text-[#0F783B]">
              FARM MANAGEMENT
            </div>
            <div className="tracking-normal text-[14px] leading-[100%] font-bold font-[Niramit] uppercase text-[#0F783B]">
              SYSTEM
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};