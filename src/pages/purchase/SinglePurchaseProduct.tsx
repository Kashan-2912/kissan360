import { Button, Container, Image, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import {
  selectProductById,
  updateProductCartStatus,
} from "../../store/purchaseProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { 
  addToCart, 
  removeProductFromCart,
  incrementQuantity,
  decrementQuantity,
  selectCartItemByProductId,
  selectCartTotalItems,
  selectCartTotalAmount,
  selectIsProductInCart,
  formatPrice
} from "../../store/cartSlice";
import type { PurchaseProduct } from "../../types";
import type { RootState } from "../../store";
import CartSidebar from "../../components/CartSidebar";

const SinglePurchaseProduct = () => {
  const { productId } = useParams();
  const productIdNumber = Number(productId);

  console.log("Product ID:", productIdNumber);

  const [product, setProduct] = useState<PurchaseProduct | undefined>(undefined);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux selectors
  const pdt = useSelector((state: RootState) =>
    selectProductById(state, productIdNumber)
  );
  
  const cartItem = useSelector((state: RootState) =>
    selectCartItemByProductId(state, productIdNumber)
  );
  
  const isProductInCart = useSelector((state: RootState) =>
    selectIsProductInCart(state, productIdNumber)
  );
  
  const totalCartItems = useSelector(selectCartTotalItems);
  const totalCartAmount = useSelector(selectCartTotalAmount);

  useEffect(() => {
    setProduct(pdt);
    console.log("PRODUCT NAME: ", pdt?.name);
  }, [pdt]);

  // Get current quantity from cart or default to 1
  const currentQuantity = cartItem?.quantity || 1;

  

  const handleAddToCart = () => {
    console.log("Entered add to cart");

    if (!pdt) return;

    const updatedProduct = { ...pdt, addToCart: true };

    // Update product cart status
    dispatch(
      updateProductCartStatus({ productId: productIdNumber, addToCart: true })
    );

    // Add to cart with current quantity
    dispatch(addToCart({ product: updatedProduct, quantity: currentQuantity }));

    console.log(
      `Added product`,
      updatedProduct,
      `to cart with quantity ${currentQuantity}`
    );

    setIsCartOpen(true);
  };

  const handleIncrement = () => {
    if (!isProductInCart) {
      // If product is not in cart, we need to add it first
      handleAddToCart();
    } else {
      // If product is already in cart, increment its quantity
      dispatch(incrementQuantity(productIdNumber));
    }
  };

  const handleDecrement = () => {
    if (isProductInCart && cartItem) {
      // Only decrement if product is in cart
      dispatch(decrementQuantity(productIdNumber));
    }
  };

  const handleRemove = (productIdNumber: number) => {
    dispatch(
      updateProductCartStatus({ productId: productIdNumber, addToCart: false })
    );
    dispatch(removeProductFromCart(productIdNumber));
    setIsCartOpen(false);
  };

  // Calculate display price based on current quantity
  const displayPrice = pdt ? Number(pdt.price) * currentQuantity : 0;

  return (
    <Container pb={80} size="lg" py="xl" className="mt-[-25px] px-4 sm:px-6 lg:px-8">
      <div className="block lg:hidden">
        {/* Mobile/Tablet Layout */}
        <div className="flex flex-col">
          {/* Product Image - Mobile/Tablet: Top */}
          <div className="flex justify-center mb-6">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] h-[280px] sm:h-[320px] bg-white rounded-2xl shadow-lg p-4 sm:p-5 flex items-center justify-center">
              <Button
                style={{
                  position: "absolute",
                  top: 15,
                  right: 15,
                  height: 30,
                  paddingLeft: 12,
                  paddingRight: 12,
                  borderRadius: 15,
                  backgroundColor: pdt?.inStock ? "#0F783B" : "#FF6B6B",
                  color: "white",
                  fontWeight: 600,
                  fontFamily: "Montserrat",
                  fontSize: 12,
                  minWidth: 0,
                }}
                variant="filled"
              >
                {pdt?.inStock ? "In Stock" : "Out of Stock"}
              </Button>

              <Image
                src={pdt?.image}
                alt={pdt?.name}
                className="w-full h-full max-w-[200px] sm:max-w-[250px] max-h-[200px] sm:max-h-[250px] object-contain"
                radius="md"
              />
            </div>
          </div>

          {/* Product Details - Mobile/Tablet: Bottom */}
          <div className="flex-1">
            <Title
              style={{
                fontFamily: "Montserrat",
                fontWeight: 600,
                fontSize: "32px",
                color: "black",
                marginBottom: "10px",
              }}
              order={2}
            >
              {pdt?.name}
            </Title>

            <Text
              c="#0F783B"
              fw={700}
              style={{
                fontFamily: "Montserrat",
                fontSize: "20px",
                marginBottom: "10px",
              }}
              size="lg"
            >
              {formatPrice(displayPrice)}{" "}
              <Text
                span
                fw={700}
                style={{ fontFamily: "Montserrat", fontSize: "20px" }}
                size="sm"
                c="#646464"
              >
                ({currentQuantity} bag{currentQuantity !== 1 ? 's' : ''})
              </Text>
            </Text>

            <Text
              size="sm"
              fw={400}
              style={{
                fontFamily: "Montserrat",
                fontSize: "14px",
                marginBottom: "15px",
              }}
              c="#000000"
            >
              Category:{" "}
              <Text
                c="#646464"
                style={{ fontFamily: "Montserrat", fontSize: "14px" }}
                span
                fw={400}
              >
                {pdt?.category}
              </Text>
            </Text>

            <div className="mb-6 sm:mb-8">
              {/* Quantity Counter */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "white",
                  width: "120px",
                  height: "40px",
                  borderRadius: "100px",
                  padding: "0 10px",
                  marginBottom: "15px",
                  border: "1px solid #E5E5E5",
                }}
              >
                <button
                  onClick={handleDecrement}
                  disabled={!isProductInCart || currentQuantity <= 1}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "30px",
                    height: "30px",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: (!isProductInCart || currentQuantity <= 1) ? "not-allowed" : "pointer",
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: (!isProductInCart || currentQuantity <= 1) ? "#CCCCCC" : "#686868",
                    borderRadius: "50%",
                    lineHeight: "1",
                    padding: "0",
                    margin: "0",
                    opacity: (!isProductInCart || currentQuantity <= 1) ? 0.5 : 1,
                  }}
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <span
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: 600,
                    fontSize: "16px",
                    color: "#0F783B",
                    minWidth: "30px",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: "1",
                  }}
                >
                  {currentQuantity}
                </span>

                <button
                  onClick={handleIncrement}
                  disabled={!pdt?.inStock}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "30px",
                    height: "30px",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: !pdt?.inStock ? "not-allowed" : "pointer",
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: !pdt?.inStock ? "#CCCCCC" : "#686868",
                    borderRadius: "50%",
                    lineHeight: "1",
                    padding: "0",
                    margin: "0",
                    opacity: !pdt?.inStock ? 0.5 : 1,
                  }}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button - Only show if not in cart */}
              {!isProductInCart && (
                <Button
                  onClick={handleAddToCart}
                  disabled={!pdt?.inStock}
                  style={{
                    border: "1px solid #0F783B1A",
                    borderRadius: "100px",
                    width: "175px",
                    height: "40px",
                    backgroundColor: pdt?.inStock ? "#0F783B" : "#CCCCCC",
                    fontFamily: "Montserrat",
                    fontWeight: 600,
                    fontSize: "12px",
                    cursor: pdt?.inStock ? "pointer" : "not-allowed",
                  }}
                >
                  + Add to Cart
                </Button>
              )}
              
              {/* Already in Cart indicator */}
              {isProductInCart && (
                <div
                  style={{
                    border: "1px solid #0F783B",
                    borderRadius: "100px",
                    width: "175px",
                    height: "40px",
                    backgroundColor: "transparent",
                    fontFamily: "Montserrat",
                    fontWeight: 600,
                    fontSize: "12px",
                    color: "#0F783B",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ✓ In Cart
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-6 sm:mb-8">
              <Title
                c="#000000"
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "14px",
                  marginBottom: "10px",
                }}
                fw={400}
                order={5}
              >
                Description:
              </Title>
              <Text
                c="#646464"
                size="sm"
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "14px",
                  lineHeight: "1.6",
                  textAlign: "justify",
                }}
                fw={400}
              >
                {pdt?.description}
              </Text>
            </div>

            {/* Features */}
            <div>
              <Title
                c="#000000"
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "14px",
                  marginBottom: "10px",
                }}
                fw={400}
                order={5}
              >
                Features:
              </Title>
              <ul
                className="custom-bullets"
                style={{
                  marginTop: 0,
                  paddingLeft: 20,
                  listStyleType: "disc",
                }}
              >
                <li style={{ marginBottom: "8px" }}>
                  <Text
                    c="#646464"
                    size="sm"
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: "14px",
                      lineHeight: "1.6",
                    }}
                    fw={400}
                  >
                    Nutrient-Rich Formula: Packed with essential nutrients like
                    nitrogen, phosphorus, and potassium to support robust crop
                    growth.
                  </Text>
                </li>
                <li style={{ marginBottom: "8px" }}>
                  <Text
                    c="#646464"
                    size="sm"
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: "14px",
                      lineHeight: "1.6",
                    }}
                    fw={400}
                  >
                    Improved Soil Health: Enhances soil structure and fertility,
                    leading to healthier and more productive plants.
                  </Text>
                </li>
                <li style={{ marginBottom: "8px" }}>
                  <Text
                    c="#646464"
                    size="sm"
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: "14px",
                      lineHeight: "1.6",
                    }}
                    fw={400}
                  >
                    Versatile Application: Suitable for a wide range of crops
                    including wheat, rice, sugarcane, and vegetables.
                  </Text>
                </li>
                <li style={{ marginBottom: "8px" }}>
                  <Text
                    c="#646464"
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: "14px",
                      lineHeight: "1.6",
                    }}
                    fw={400}
                    size="sm"
                  >
                    Cost-Effective: Offers a high return on investment by
                    increasing crop yield and quality.
                  </Text>
                </li>
                <li style={{ marginBottom: "8px" }}>
                  <Text
                    c="#646464"
                    size="sm"
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: "14px",
                      lineHeight: "1.6",
                    }}
                    fw={400}
                  >
                    Eco-Friendly: Formulated to minimize environmental impact
                    while maximizing agricultural output.
                  </Text>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Hidden on mobile/tablet */}
      <div className="hidden lg:block" style={{ position: "relative", overflow: "hidden" }}>
        {/* Floating image card */}
        <div
          style={{
            float: "right",
            width: 320,
            height: 320,
            backgroundColor: "white",
            borderRadius: "16px",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
            position: "relative",
            marginLeft: 30,
            marginBottom: 20,
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            style={{
              position: "absolute",
              top: 15,
              right: 15,
              height: 30,
              paddingLeft: 12,
              paddingRight: 12,
              borderRadius: 15,
              backgroundColor: pdt?.inStock ? "#0F783B" : "#FF6B6B",
              color: "white",
              fontWeight: 600,
              fontFamily: "Montserrat",
              fontSize: 12,
              minWidth: 0,
            }}
            variant="filled"
          >
            {pdt?.inStock ? "In Stock" : "Out of Stock"}
          </Button>

          <Image
            src={pdt?.image}
            alt={pdt?.name}
            style={{
              width: "100%",
              height: "100%",
              maxWidth: "250px",
              maxHeight: "250px",
              objectFit: "contain",
            }}
            radius="md"
          />
        </div>

        <div>
          <Title
            style={{
              fontFamily: "Montserrat",
              fontWeight: 600,
              fontSize: "32px",
              color: "black",
              marginBottom: "10px",
            }}
            order={2}
          >
            {pdt?.name}
          </Title>

          <Text
            c="#0F783B"
            fw={700}
            style={{
              fontFamily: "Montserrat",
              fontSize: "20px",
              marginBottom: "10px",
            }}
            size="lg"
          >
            {formatPrice(displayPrice)}{" "}
            <Text
              span
              fw={700}
              style={{ fontFamily: "Montserrat", fontSize: "20px" }}
              size="sm"
              c="#646464"
            >
              ({currentQuantity} bag{currentQuantity !== 1 ? 's' : ''})
            </Text>
          </Text>

          <Text
            size="sm"
            fw={400}
            style={{
              fontFamily: "Montserrat",
              fontSize: "14px",
              marginBottom: "15px",
            }}
            c="#000000"
          >
            Category:{" "}
            <Text
              c="#646464"
              style={{ fontFamily: "Montserrat", fontSize: "14px" }}
              span
              fw={400}
            >
              {pdt?.category}
            </Text>
          </Text>

          <div style={{ marginBottom: "20px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                width: "120px",
                height: "40px",
                borderRadius: "100px",
                padding: "0 10px",
                marginBottom: "15px",
                border: "1px solid #E5E5E5",
              }}
            >
              <button
                onClick={handleDecrement}
                disabled={!isProductInCart || currentQuantity <= 1}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "30px",
                  height: "30px",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: (!isProductInCart || currentQuantity <= 1) ? "not-allowed" : "pointer",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: (!isProductInCart || currentQuantity <= 1) ? "#CCCCCC" : "#686868",
                  borderRadius: "50%",
                  lineHeight: "1",
                  padding: "0",
                  margin: "0",
                  opacity: (!isProductInCart || currentQuantity <= 1) ? 0.5 : 1,
                }}
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "#0F783B",
                  minWidth: "30px",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  lineHeight: "1",
                }}
              >
                {currentQuantity}
              </span>

              <button
                onClick={handleIncrement}
                disabled={!pdt?.inStock}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "30px",
                  height: "30px",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: !pdt?.inStock ? "not-allowed" : "pointer",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: !pdt?.inStock ? "#CCCCCC" : "#686868",
                  borderRadius: "50%",
                  lineHeight: "1",
                  padding: "0",
                  margin: "0",
                  opacity: !pdt?.inStock ? 0.5 : 1,
                }}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button - Only show if not in cart */}
            {!isProductInCart && (
              <Button
                onClick={handleAddToCart}
                disabled={!pdt?.inStock}
                style={{
                  border: "1px solid #0F783B1A",
                  borderRadius: "100px",
                  width: "175px",
                  height: "40px",
                  backgroundColor: pdt?.inStock ? "#0F783B" : "#CCCCCC",
                  fontFamily: "Montserrat",
                  fontWeight: 600,
                  fontSize: "12px",
                  cursor: pdt?.inStock ? "pointer" : "not-allowed",
                }}
              >
                + Add to Cart
              </Button>
            )}
            
            {/* Already in Cart indicator */}
            {isProductInCart && (
              <div
                style={{
                  border: "1px solid #0F783B",
                  borderRadius: "100px",
                  width: "175px",
                  height: "40px",
                  backgroundColor: "transparent",
                  fontFamily: "Montserrat",
                  fontWeight: 600,
                  fontSize: "12px",
                  color: "#0F783B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✓ In Cart
              </div>
            )}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <Title
              c="#000000"
              style={{
                fontFamily: "Montserrat",
                fontSize: "14px",
                marginBottom: "10px",
              }}
              fw={400}
              order={5}
            >
              Description:
            </Title>
            <Text
              c="#646464"
              size="sm"
              style={{
                fontFamily: "Montserrat",
                fontSize: "14px",
                lineHeight: "1.6",
                textAlign: "justify",
              }}
              fw={400}
            >
              {pdt?.description}
            </Text>
          </div>

          <div>
            <Title
              c="#000000"
              style={{
                fontFamily: "Montserrat",
                fontSize: "14px",
                marginBottom: "10px",
              }}
              fw={400}
              order={5}
            >
              Features:
            </Title>
            <ul
              className="custom-bullets"
              style={{
                marginTop: 0,
                paddingLeft: 20,
                listStyleType: "disc",
              }}
            >
              <li style={{ marginBottom: "8px" }}>
                <Text
                  c="#646464"
                  size="sm"
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "14px",
                    lineHeight: "1.6",
                  }}
                  fw={400}
                >
                  Nutrient-Rich Formula: Packed with essential nutrients like
                  nitrogen, phosphorus, and potassium to support robust crop
                  growth.
                </Text>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <Text
                  c="#646464"
                  size="sm"
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "14px",
                    lineHeight: "1.6",
                  }}
                  fw={400}
                >
                  Improved Soil Health: Enhances soil structure and fertility,
                  leading to healthier and more productive plants.
                </Text>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <Text
                  c="#646464"
                  size="sm"
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "14px",
                    lineHeight: "1.6",
                  }}
                  fw={400}
                >
                  Versatile Application: Suitable for a wide range of crops
                  including wheat, rice, sugarcane, and vegetables.
                </Text>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <Text
                  c="#646464"
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "14px",
                    lineHeight: "1.6",
                  }}
                  fw={400}
                  size="sm"
                >
                  Cost-Effective: Offers a high return on investment by
                  increasing crop yield and quality.
                </Text>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <Text
                  c="#646464"
                  size="sm"
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "14px",
                    lineHeight: "1.6",
                  }}
                  fw={400}
                >
                  Eco-Friendly: Formulated to minimize environmental impact
                  while maximizing agricultural output.
                </Text>
                </li>
            </ul>
          </div>
        </div>

        {/* Clear float */}
        <div style={{ clear: "both" }}></div>
      </div>

      {/* Cart Sidebar - Keeps original desktop-only styling */}
      {isCartOpen && (
        <CartSidebar setIsCartOpen={setIsCartOpen} />
      )}
    </Container>
  );
};

export default SinglePurchaseProduct;