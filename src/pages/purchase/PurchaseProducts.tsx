import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Star } from "lucide-react";
import { AiFillEye } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa";
import { Tooltip } from "@mantine/core";
import { useNavigate } from "react-router-dom";

// Redux imports
import {
  fetchPurchaseProducts,
  selectAllPurchaseProducts,
  // selectCarouselProducts,
  // selectProductsByCategoryWithAll,
  selectPurchaseProductsLoading,
  selectPurchaseProductsError,
  // updateProductCartStatus,
  addDummyProducts,
} from "../../store/purchaseProductSlice";

// Static imports (you can remove these once fully integrated with Redux)
import f1 from "../../assets/f1.png";
import f2 from "../../assets/f2.png";
import f3 from "../../assets/f3.png";
import f4 from "../../assets/f4.png";
import f5 from "../../assets/f5.png";
import cart from "../../assets/cart.png";
// import { addToCart } from "../../store/cartSlice";

// Fallback data (remove once API is working)
const fallbackCarouselProducts = [
  {
    id: 1,
    name: "DAP",
    price: "1200",
    image: f1,
    inStock: true,
    category: "Fertilizers" as const,
    description: "High quality DAP fertilizer",
  },
  {
    id: 2,
    name: "Urea",
    price: "1200",
    image: f4,
    inStock: true,
    category: "Fertilizers" as const,
    description: "Premium Urea fertilizer",
  },
  {
    id: 3,
    name: "DAP",
    price: "1200",
    image: f1,
    inStock: false,
    addToCart: true,
    category: "Fertilizers" as const,
    description: "High quality DAP fertilizer",
  },
  {
    id: 4,
    name: "Urea",
    price: "1200",
    image: f4,
    inStock: true,
    category: "Fertilizers" as const,
    description: "Premium Urea fertilizer",
  },
  {
    id: 5,
    name: "Urea",
    price: "1200",
    image: f5,
    inStock: true,
    category: "Fertilizers" as const,
    description: "Premium Urea fertilizer",
  },
];

const fallbackGridProducts = [
  {
    id: 6,
    name: "Nitrophos",
    price: "250",
    image: f1,
    rating: 4,
    reviews: 12,
    category: "Fertilizers" as const,
    description: "Nitrophos fertilizer",
  },
  {
    id: 7,
    name: "Calcium Ammonium",
    price: "1300",
    image: f2,
    rating: 5,
    reviews: 8,
    category: "Fertilizers" as const,
    description: "Calcium Ammonium fertilizer",
  },
  {
    id: 8,
    name: "Nitrophos",
    price: "250",
    image: f3,
    rating: 4,
    reviews: 12,
    category: "Fertilizers" as const,
    description: "Nitrophos fertilizer",
  },
  {
    id: 9,
    name: "Urea",
    price: "1500",
    image: f4,
    rating: 4,
    reviews: 22,
    category: "Fertilizers" as const,
    description: "Premium Urea fertilizer",
  },
  {
    id: 10,
    name: "Calcium Ammonium",
    price: "1300",
    image: f5,
    rating: 5,
    reviews: 8,
    category: "Fertilizers" as const,
    description: "Calcium Ammonium fertilizer",
  },
  {
    id: 11,
    name: "Nitrophos",
    price: "250",
    image: f3,
    rating: 4,
    reviews: 12,
    category: "Pesticides" as const,
    description: "Nitrophos pesticide",
  },
  {
    id: 12,
    name: "Calcium Ammonium",
    price: "1200",
    image: f1,
    rating: 5,
    reviews: 8,
    category: "Pesticides" as const,
    description: "Calcium Ammonium pesticide",
  },
  {
    id: 13,
    name: "Nitrophos",
    price: "250",
    image: f4,
    rating: 4,
    reviews: 12,
    category: "Weed" as const,
    description: "Nitrophos weed control",
  },
  {
    id: 14,
    name: "Urea",
    price: "1500",
    image: f2,
    rating: 4,
    reviews: 11,
    category: "Weed" as const,
    description: "Urea weed control",
  },
  {
    id: 15,
    name: "Calcium Ammonium",
    price: "1300",
    image: f5,
    rating: 5,
    reviews: 8,
    category: "Weed" as const,
    description: "Calcium Ammonium weed control",
  },
];

const categories = ["All", "Fertilizers", "Pesticides", "Weed"] as const;

const EyeIcon = () => (
  <div
    className="w-8 h-8 rounded-full border-[0.5px] border-[#0F783B] bg-white flex items-center justify-center absolute top-3 right-3"
    style={{ boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.25)" }}
  >
    <AiFillEye size={16} className="text-[#0F783B]" />
  </div>
);

export default function AgriculturalProductsUI() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>("Fertilizers");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux selectors

  const allProducts = useSelector(selectAllPurchaseProducts);

  // will only display if backend call is made (for dumy, its working)
  console.log(allProducts);

  // const carouselProducts = useSelector(selectCarouselProducts);
  // const filteredProducts = useSelector((state: any) =>
  //   selectProductsByCategoryWithAll(state, activeCategory)
  // );

  const loading = useSelector(selectPurchaseProductsLoading);
  const error = useSelector(selectPurchaseProductsError);

  useEffect(() => {
    // Temporarily disable API call until backend is ready
    // dispatch(fetchPurchaseProducts() as any);

    // adding dummy products jsut for skae of testing:
    dispatch(addDummyProducts());

    console.log("API call disabled - using fallback data");
  }, [dispatch]);

  // Use fallback data since API is not ready

  const displayCarouselProducts = fallbackCarouselProducts.slice(0, 3);
  const displayGridProducts = fallbackGridProducts.filter(
    (product) => activeCategory === "All" || product.category === activeCategory
  );

  const handleNavigate = (productId: number) => {
    navigate(`/purchase/product/${productId}`);
  };

  // ---> no need for redux add to cart here, cuz we have add to cart on next page as well...

  // const handleAddToCart = (productId: number) => {
  //
  //   console.log("Entered add to cart")
  //   dispatch(updateProductCartStatus({ productId, addToCart: true }));

  //   dispatch(addToCart({ productId, quantity: 1 }));

  //   console.log(`Added product ${productId} to cart`);
  // };

  const CarouselCard = ({ product }: { product: any }) => (
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

  const GridCard = ({ product }: { product: any }) => (
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
          PKR {product.price}/L
        </p>

        {/* Stars + Reviews */}
        {product.rating && (
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
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
              ({product.reviews || 0})
            </span>
          </div>
        )}
      </div>

      {/* Stock Status Indicator */}
      {product.inStock === false && (
        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
          Out of Stock
        </div>
      )}

      {/* Plus icon */}
      <div
        className="absolute bottom-3 right-2 w-[40px] h-[40px] rounded-full bg-gradient-to-r from-[#13783C] to-[#38BE17] flex items-center justify-center cursor-pointer"
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

  // Loading and error states - disabled for now since we're using fallback data
  if (loading && allProducts.length === 0) {
    return (
      <div className="min-h-screen py-8 mt-[-40px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0F783B] mx-auto mb-4"></div>
          <p className="text-[#0F783B] font-[Montserrat]">
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  // Show error only if we attempted to fetch and failed
  if (error && allProducts.length === 0) {
    return (
      <div className="min-h-screen py-8 mt-[-40px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-[Montserrat] mb-4">Error: {error}</p>
          <button
            onClick={() => dispatch(fetchPurchaseProducts() as any)}
            className="bg-[#0F783B] text-white px-4 py-2 rounded font-[Montserrat]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
            {displayCarouselProducts.map((product) => (
              <div
                key={product.id}
                className="flex justify-center w-full sm:w-auto"
              >
                <CarouselCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12 px-4">
          <div
            className="w-max rounded-[27px] border border-[#F6F6F6] bg-white p-2"
            style={{ boxShadow: "0px 0px 20.3px 0px rgba(0, 0, 0, 0.05)" }}
          >
            <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-2 sm:overflow-x-auto sm:scrollbar-hide sm:justify-center">
              {categories.map((category) => (
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
          {displayGridProducts.map((product) => (
            <div className="w-full flex justify-center" key={product.id}>
              <GridCard product={product} />
            </div>
          ))}
        </div>

        {/* No products message */}
        {displayGridProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#686868] font-[Montserrat] text-lg">
              No products found in {activeCategory} category
            </p>
          </div>
        )}

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
}
