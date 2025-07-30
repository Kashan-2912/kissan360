import { Plus, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EyeIcon from "./EyeIcon";

const GridCard = ({ product }: { product: any }) => {
  const navigate = useNavigate();

  const handleNavigate = (productId: number) => {
    navigate(`/purchase/product/${productId}`);
  };

  return (
    <div
      className="group relative w-[184px] h-[219px] rounded-2xl bg-white p-3 flex flex-col"
      style={{ boxShadow: "0px 10px 10px 0px rgba(0, 0, 0, 0.1)" }}
    >
      <EyeIcon />

      {/* Product Image */}
      <div className="flex-1 flex items-center justify-center mb-5">
        <img
          src={product.image || "/placeholder.svg?height=60&width=60"}
          alt={product.name}
          className="w-[75px] h-[75px] object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="text-center mb-6">
        <h3 className="text-black font-semibold text-[16px] font-['Montserrat'] leading-[100%] flex items-center justify-center">
          {product.name}
        </h3>
      </div>

      <div className="mb-3 flex items-center justify-between">
        {/* Price */}

        <div className="flex flex-col items-start">
          <p className="text-[#0F783B] font-bold text-[14px] font-['Montserrat'] text-left">
            PKR {product.price}/L
          </p>

          {/* Stars + Reviews */}
          {product.rating && (
            <div className="flex items-center justify-left gap-1">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={12}
                    className={
                      star <= product.rating
                        ? "text-[#FFD600] fill-[#FFD600]"
                        : "text-[#DBDCDD] fill-[#DBDCDD]"
                    }
                  />
                ))}
              </div>
              <span className="text-[#7B7B7B] text-[11px] font-[Poppins]">
                ({product.reviews || 0})
              </span>
            </div>
          )}
        </div>

        <div
          className="absolute bottom-4 right-4 w-[32px] h-[32px] rounded-full bg-gradient-to-r from-[#13783C] to-[#38BE17] flex items-center justify-center cursor-pointer"
          // onClick={() => handleAddToCart(product.id)}
        >
          <Plus size={14} className="text-white font-bold" />
        </div>
      </div>

      {/* Stock Status Indicator */}
      {product.inStock === false && (
        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
          Out of Stock
        </div>
      )}

      {/* Hover Overlay */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 rounded-2xl flex items-center justify-center z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#13783C] to-[#38BE17] opacity-70 rounded-2xl"></div>
        <div className="text-white text-center flex items-center justify-center bg-[#BE8B45] w-[100px] h-[30px] rounded-[16px] gap-[8px] font-semibold font-[Montserrat] text-[12px] z-20">
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

export default GridCard;
