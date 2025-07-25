import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Star } from "lucide-react";
import f1 from "../../assets/f1.png";
import f2 from "../../assets/f2.png";
import f3 from "../../assets/f3.png";
import f4 from "../../assets/f4.png";
import f5 from "../../assets/f5.png";
import cart from "../../assets/cart.png";
import { AiFillEye } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa";
import { Tooltip } from "@mantine/core";
import { useNavigate } from "react-router-dom";

// Type definitions
interface BaseProduct {
  id: number;
  name: string;
  price: string;
  image: string;
  category: Category;
  description: string;
}

interface CarouselProduct extends BaseProduct {
  inStock: boolean;
  addToCart?: boolean;
}

interface GridProduct extends BaseProduct {
  rating: number;
  reviews: number;
}

type Category = "All" | "Fertilizers" | "Pesticides" | "Weed";

interface CarouselCardProps {
  product: CarouselProduct;
}

interface GridCardProps {
  product: GridProduct;
}

// Data
const carouselProducts: CarouselProduct[] = [
  { 
    id: 1, 
    name: "DAP", 
    price: "PKR 1,200/kg", 
    image: f1, 
    inStock: true,
    category: "Fertilizers",
    description: "Diammonium Phosphate (DAP) is a high-quality fertilizer providing essential nitrogen and phosphorus for healthy plant growth and root development."
  },
  { 
    id: 2, 
    name: "Urea", 
    price: "PKR 1,200/kg", 
    image: f4, 
    inStock: true,
    category: "Fertilizers",
    description: "Pure nitrogen fertilizer ideal for promoting vigorous leaf growth and overall plant development. Suitable for all crops."
  },
  {
    id: 3,
    name: "DAP",
    price: "PKR 1,200/kg",
    image: f1,
    inStock: false,
    addToCart: true,
    category: "Fertilizers",
    description: "Premium grade Diammonium Phosphate with enhanced formula for maximum nutrient absorption and crop yield."
  },
  { 
    id: 4, 
    name: "Urea", 
    price: "PKR 1,200/kg", 
    image: f4, 
    inStock: true,
    category: "Fertilizers",
    description: "High-grade urea fertilizer with slow-release formula to provide consistent nitrogen supply throughout the growing season."
  },
  { 
    id: 5, 
    name: "Urea", 
    price: "PKR 1,200/kg", 
    image: f5, 
    inStock: true,
    category: "Fertilizers",
    description: "Concentrated nitrogen fertilizer perfect for cereal crops, vegetables, and fruit trees. Fast-acting formula."
  },
];

const gridProducts: GridProduct[] = [
  {
    id: 1,
    name: "Nitrophos",
    price: "PKR 250/L",
    image: f1,
    rating: 4,
    reviews: 12,
    category: "Fertilizers",
    description: "Liquid nitrogen-phosphorus fertilizer for quick nutrient uptake. Ideal for foliar application and soil treatment."
  },
  {
    id: 2,
    name: "Calcium Ammonium",
    price: "PKR 1,300/kg",
    image: f2,
    rating: 5,
    reviews: 8,
    category: "Fertilizers",
    description: "Calcium Ammonium Nitrate provides both nitrogen and calcium, improving soil structure and plant nutrition."
  },
  {
    id: 3,
    name: "Nitrophos",
    price: "PKR 250/L",
    image: f3,
    rating: 4,
    reviews: 12,
    category: "Fertilizers",
    description: "Advanced liquid fertilizer with balanced NPK ratio for optimal plant growth and higher crop yields."
  },
  {
    id: 4,
    name: "Urea",
    price: "PKR 1,500/kg",
    image: f4,
    rating: 4,
    reviews: 22,
    category: "Fertilizers",
    description: "Premium urea fertilizer with anti-caking agents for easy application and maximum nitrogen efficiency."
  },
  {
    id: 5,
    name: "Calcium Ammonium",
    price: "PKR 1,300/kg",
    image: f5,
    rating: 5,
    reviews: 8,
    category: "Fertilizers",
    description: "High-quality calcium ammonium nitrate for improved root development and disease resistance in crops."
  },
  {
    id: 6,
    name: "Nitrophos",
    price: "PKR 250/L",
    image: f3,
    rating: 4,
    reviews: 12,
    category: "Pesticides",
    description: "Multi-purpose liquid fertilizer with added micronutrients for comprehensive plant nutrition."
  },
  {
    id: 7,
    name: "Calcium Ammonium",
    price: "PKR 1,200/kg",
    image: f1,
    rating: 5,
    reviews: 8,
    category: "Pesticides",
    description: "Granulated calcium ammonium nitrate with controlled-release technology for sustained nutrient supply."
  },
  {
    id: 8,
    name: "Nitrophos",
    price: "PKR 250/L",
    image: f4,
    rating: 4,
    reviews: 12,
    category: "Pesticides",
    description: "Concentrated liquid fertilizer suitable for drip irrigation and foliar feeding systems."
  },
  {
    id: 9,
    name: "Urea",
    price: "PKR 1,500/kg",
    image: f2,
    rating: 4,
    reviews: 11,
    category: "Weed",
    description: "Agricultural grade urea with uniform granule size for even distribution and consistent crop response."
  },
  {
    id: 10,
    name: "Calcium Ammonium",
    price: "PKR 1,300/kg",
    image: f5,
    rating: 5,
    reviews: 8,
    category: "Weed",
    description: "Professional-grade calcium ammonium nitrate for commercial farming operations and greenhouse cultivation."
  },
];

const categories: Category[] = ["All", "Fertilizers", "Pesticides", "Weed"];

const EyeIcon: React.FC = () => (
  <div
    className="w-8 h-8 rounded-full border-[0.5px] border-[#0F783B] bg-white flex items-center justify-center absolute top-3 right-3"
    style={{ boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.25)" }}
  >
    {/* <Eye size={16} className="text-[#0F783B]" /> */}
    <AiFillEye size={16} className="text-[#0F783B]" />
  </div>
);

const AgriculturalProductsUI: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("Fertilizers");
  const navigate = useNavigate();

  const handleNavigate = (productId: number): void => {
    navigate(`/purchase/product/${productId}`);
  };

  const CarouselCard: React.FC<CarouselCardProps> = ({ product }) => (
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
          {product.price}
        </p>
      </div>

      {/* Always-visible Plus icon */}
      <div className="absolute bottom-4 right-4 w-[40px] h-[35px] top-[184px] left-[169px] rounded-tl-[4px] rounded-br-[16px] bg-gradient-to-r from-[#13783C] to-[#38BE17] flex items-center justify-center">
        <Plus size={16} className="text-white font-bold" />
      </div>

      {/* Hover Overlay */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 rounded-2xl flex items-center justify-center z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#13783C] to-[#38BE17] opacity-70 rounded-2xl"></div>
        <div className="text-white text-center flex items-center justify-center bg-[#BE8B45] w-[110px] h-[34px] rounded-[16px] gap-[10px] font-semibold font-[Montserrat] text-[14px] z-20">
          <button onClick={() => handleNavigate(product.id)} className="cursor-pointer">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );

  const GridCard: React.FC<GridCardProps> = ({ product }) => (
    <div
      className="group relative w-[210px] h-[250px] rounded-2xl bg-white p-4 flex flex-col"
      style={{ boxShadow: "0px 10px 10px 0px rgba(0, 0, 0, 0.1)" }}
    >
      <EyeIcon />

      {/* Product Image */}
      <div className="flex-1 flex items-center justify-center mb-4 mt-6">
        <img
          src={product.image || "/placeholder.svg?height=80&width=80"}
          alt={product.name}
          className="w-20 h-20 object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="text-center mb-3">
        <h3 className="text-black font-semibold text-[16px] font-['Montserrat'] mb-2">
          {product.name}
        </h3>
      </div>

      <div className="mb-4">
        {/* Price */}
        <p className="text-[#0F783B] font-bold text-sm font-['Montserrat'] mb-1">
          {product.price}
        </p>

        {/* Stars + Reviews */}
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star: number) => (
              <Star
                key={star}
                size={14}
                className={
                  star <= product.rating
                    ? "text-[#FFD600] fill-[#FFD600]"
                    : "text-[#DBDCDD] fill-[#DBDCDD]"
                }
              />
            ))}
          </div>
          <span className="text-[#7B7B7B] text-[13px] font-[Poppins]">
            ({product.reviews})
          </span>
        </div>
      </div>

      {/* Plus icon */}
      <div className="absolute bottom-3 right-2 w-[40px] h-[40px] rounded-full bg-gradient-to-r from-[#13783C] to-[#38BE17] flex items-center justify-center">
        <Plus size={16} className="text-white font-bold" />
      </div>

      {/* Hover Overlay */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 rounded-2xl flex items-center justify-center z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#13783C] to-[#38BE17] opacity-70 rounded-2xl"></div>
        <div className="text-white text-center flex items-center justify-center bg-[#BE8B45] w-[110px] h-[34px] rounded-[16px] gap-[10px] font-semibold font-[Montserrat] text-[14px] z-20">
          <button onClick={() => handleNavigate(product.id)} className="cursor-pointer">Add to cart</button>
        </div>
      </div>
    </div>
  );

  // const NavigationArrow = ({
  //   direction,
  //   onClick,
  // }: {
  //   direction: "left" | "right";
  //   onClick: () => void;
  // }) => (
  //   <button
  //     onClick={onClick}
  //     className="w-10 h-10 rounded-full border border-[#0F783B] bg-white flex items-center justify-center transition-colors"
  //   >
  //     {direction === "left" ? (
  //       <ChevronLeft size={20} className="text-[#0F783B]" />
  //     ) : (
  //       <ChevronRight size={20} className="text-[#0F783B]" />
  //     )}
  //   </button>
  // );

  return (
    <div className="min-h-screen py-8 mt-[-40px] overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-[#BE8B45] font-bold text-[22px] font-[Montserrat] leading-[100%] tracking-[0%]">
            New Arrivals
          </h1>
        </div>

        {/* Carousel Section */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-8">
            {carouselProducts.slice(0, 3).map((product: CarouselProduct) => (
              <div
                key={product.id}
                className="flex justify-center w-full sm:w-auto"
              >
                <CarouselCard product={product} />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {/* <div className="flex flex-row sm:flex-row items-center justify-center gap-2">
            <NavigationArrow direction="left" onClick={() => {}} />
            <NavigationArrow direction="right" onClick={() => {}} />
          </div> */}
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12 px-4">
          <div
            className="w-max rounded-[27px] border border-[#F6F6F6] bg-white p-2"
            style={{ boxShadow: "0px 0px 20.3px 0px rgba(0, 0, 0, 0.05)" }}
          >
            <div
              className="
        grid grid-cols-2 gap-2
        sm:flex sm:gap-2 sm:overflow-x-auto sm:scrollbar-hide sm:justify-center
      "
            >
              {categories.map((category: Category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 min-w-[110px] flex items-center justify-center rounded-full text-sm font-medium transition-all whitespace-nowrap
            ${
              activeCategory === category
                ? "bg-gradient-to-r from-[#13783C] to-[#38BE17] text-white"
                : "bg-[rgba(223,223,223,0.4)] text-[#0F783B]"
            }
          `}
                >
                  <div className="font-[Montserrat] font-semibold text-[12px]">
                    {category}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8 px-4 mb-12">
          {gridProducts.map((product: GridProduct) => (
            <div className="w-full flex justify-center" key={product.id}>
              <GridCard product={product} />
            </div>
          ))}
        </div>

        {/* View All Products Link */}
        <div className="text-center mb-20">
          <button className="text-[#0F783B] leading-[100%] tracking-[0%] underline decoration-solid decoration-[#0F783B] hover:opacity-80 transition-opacity">
            <div className="flex items-center justify-center gap-2 font-[Poppins] font-semibold text-[16px]">
              VIEW ALL PRODUCTS <FaArrowRight color="#0F783B" />
            </div>
          </button>
        </div>

        {/* Floating Cart */}
        <Tooltip
          className="rounded-[8px] font-[Montserrat] font-normal text-[8px] leading-[100%] tracking-[0%] text-white"
          arrowOffset={45}
          arrowSize={8}
          label="Cart Items"
          withArrow
          opened
          position="top-start"
        >
          <div className="fixed bottom-4 right-4 md:bottom-10 md:right-10 sm:bottom-25 sm:right-5 z-999">
            <div className="relative">
              <div className="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] bg-[#BD8E43] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <img src={cart} alt="cart" width={32} height={32} />
              </div>
            </div>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default AgriculturalProductsUI;