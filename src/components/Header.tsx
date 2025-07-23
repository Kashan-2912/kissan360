import { useSelector } from "react-redux";
import type { RootState } from "../store";
import User from "../assets/user.png";
import { FiBell } from "react-icons/fi";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { LuSearch, LuSettings, LuArrowLeft } from "react-icons/lu";
import { useMediaQuery } from "@mantine/hooks";
import Logo from "../assets/Logo2.png"; // Assuming same logo

export const Header = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const location = useLocation();
  const navigate = useNavigate();

  const isMedium = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");

  const routeTitleMap: Record<string, string> = {
    "/": "My Products",
    "/add-new": "New Product",
    "/product/:id": "My Product",
    "/purchase": "Marketplace",
    "/purchase/product": "Marketplace" // temporary... will be /purchase/product/:id
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
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <header className="px-6 py-5 relative">
      {/* Desktop / Tablet */}
      <div className="md:flex md:items-center md:justify-between hidden">
        {/* Left Section - User Info */}
        <div className="w-[254px] h-[42px] flex items-center gap-4">
          {/* Bell Icon */}
          <div className="w-[40px] h-[40px] border bg-[#FFFFFF] border-[#0F783B6B] rounded-full flex items-center justify-center relative">
            <FiBell color="#0F783B" size={16} className="z-10" />
            <div className="absolute w-[9px] h-[9px] top-0 right-0 bg-[#0F783B] rounded-full" />
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
