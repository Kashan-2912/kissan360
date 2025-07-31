import { Carousel } from "@mantine/carousel";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";
import { Tooltip } from "@mantine/core";
import CarouselCard from "../../components/CarouselCard";
import GridCard from "../../components/GridCard";
import cart from "../../assets/cart.png";
import {
  fallbackGridProducts,
} from "../../util/dummyData";
import { selectCarouselProducts } from "../../store/purchaseProductSlice"

// Redux imports
import {
  fetchPurchaseProducts,
  selectAllPurchaseProducts,
  selectPurchaseProductsLoading,
  selectPurchaseProductsError,
  addDummyProducts,
} from "../../store/purchaseProductSlice";
import CartSidebar from "../../components/CartSidebar";
import type { EmblaCarouselType } from 'embla-carousel';

const categories = ["All", "Fertilizers", "Pesticides", "Weed"] as const;

export default function AgriculturalProductsUI() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>("Fertilizers");

  // DOING ......
  const [isCartOpen, setIsCartOpen] = useState(false);

  const dispatch = useDispatch();

  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null);

  const allProducts = useSelector(selectAllPurchaseProducts);
  const carouselProducts = useSelector(selectCarouselProducts);

  console.log("TOTAL CAROUSEL: ", carouselProducts.length)

  const loading = useSelector(selectPurchaseProductsLoading);
  const error = useSelector(selectPurchaseProductsError);

  useEffect(() => {
    // dispatch(fetchPurchaseProducts() as any);
    dispatch(addDummyProducts());

    console.log("API call disabled - using fallback data");
  }, [dispatch]);

  const displayGridProducts = fallbackGridProducts.filter(
    (product) => activeCategory === "All" || product.category === activeCategory
  );

  const scrollPrev = useCallback(() => {
    if (embla) embla.scrollPrev();
  }, [embla]);

  const scrollNext = useCallback(() => {
    if (embla) embla.scrollNext();
  }, [embla]);

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

  const NavigationArrow = ({
    direction,
    onClick,
  }: {
    direction: "left" | "right";
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className="w-10 h-10 rounded-full border border-[#0F783B] bg-white flex items-center justify-center transition-colors hover:bg-gray-50"
    >
      {direction === "left" ? (
        <ChevronLeft size={20} className="text-[#0F783B]" />
      ) : (
        <ChevronRight size={20} className="text-[#0F783B]" />
      )}
    </button>
  );

  const openCart = () => {
    setIsCartOpen(true);
  };

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
          <div className="mb-4">
            <div className="max-w-full">
              <Carousel
                getEmblaApi={setEmbla}
                height={240}
                type="container"
                slideSize={{ "300px": "100%", "480px": "50%", "560px": "20%" }}
                slideGap={{ base: 10 }}
                emblaOptions={{ loop: false, align: "start" }}
                withControls={false}
                withIndicators={false}
              >
                {carouselProducts.map((product) => (
                  <Carousel.Slide key={product.id}>
                    <div className="flex justify-center px-2">
                      <CarouselCard product={product} />
                    </div>
                  </Carousel.Slide>
                ))}
              </Carousel>
            </div>
          </div>

          {/* Custom Navigation Arrows */}
          <div className="flex flex-row sm:flex-row items-center justify-center gap-5">
            <NavigationArrow direction="left" onClick={scrollPrev} />
            <NavigationArrow direction="right" onClick={scrollNext} />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12 px-4">
          <div
            className="w-max rounded-[27px] border border-[#F6F6F6] bg-white p-2"
            style={{ boxShadow: "0px 0px 20.3px 0px rgba(0, 0, 0, 0.05)" }}
          >
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
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
        <div className="flex flex-wrap justify-center gap-8 px-4 mb-12">
          {displayGridProducts.map((product) => (
            <GridCard key={product.id} product={product} />
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
          <div
            onClick={openCart}
            className="fixed bottom-4 right-4 md:bottom-10 md:right-10 sm:bottom-25 sm:right-5 z-999"
          >
            <div className="relative">
              <div className="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] bg-[#BD8E43] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <img src={cart} alt="cart" width={32} height={32} />
              </div>
            </div>
          </div>
        </Tooltip>

        {isCartOpen && <CartSidebar setIsCartOpen={setIsCartOpen} />}
      </div>
    </div>
  );
}
