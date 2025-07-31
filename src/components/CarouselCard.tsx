import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EyeIcon from "./EyeIcon";
import type { PurchaseProduct } from "../types";

const CarouselCard = ({ product }: { product: PurchaseProduct }) => {
  const navigate = useNavigate();

  const handleNavigate = (productId: number) => {
    navigate(`/purchase/product/${productId}`);
  };

  return (
    <div
      className="group relative w-[210px] h-[220px] rounded-2xl border border-[#0F783B] bg-white p-4 flex flex-col"
      style={{ boxShadow: "0px 10px 10px 0px rgba(0, 0, 0, 0.1)" }}
    >
      <EyeIcon />

      {/* Product Image */}
      <div className="flex-1 flex items-center justify-center mb-4 mt-6">
        <img
          src={product.image || "/placeholder.svg?height=80&width=80"}
          alt={product.name}
          className="w-[102px] h-[102px] object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="text-center mb-4">
        <h3 className="text-black font-semibold text-base font-['Montserrat'] mb-2">
          {product.name}
        </h3>
        <p className="text-[#686868] font-bold text-sm font-['Montserrat']">
          PKR {product.price}/kg
        </p>
      </div>

      {/* Stock Status Indicator */}
      {product.inStock === false && (
        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
          Out of Stock
        </div>
      )}

      {/* Always-visible Plus icon */}
      <div
        className="absolute bottom-4 right-4 w-[40px] h-[35px] top-[184px] left-[169px] rounded-tl-[4px] rounded-br-[16px] bg-gradient-to-r from-[#13783C] to-[#38BE17] flex items-center justify-center cursor-pointer"
        // onClick={() => handleAddToCart(product.id)}
      >
        <Plus size={16} className="text-white font-bold" />
      </div>

      {/* Hover Overlay */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 rounded-2xl flex items-center justify-center z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#13783C] to-[#38BE17] opacity-70 rounded-2xl"></div>
        <div className="text-white text-center flex items-center justify-center bg-[#BE8B45] w-[110px] h-[34px] rounded-[16px] gap-[10px] font-semibold font-[Montserrat] text-[14px] z-20">
          <button
            onClick={() => handleNavigate(product.id)}
            className="cursor-pointer"
            disabled={product.inStock === false}
          >
            {product.inStock === false ? "Out of Stock" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;
