import { Button, Container, Image, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
// import f5 from "../../assets/f5.png";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import {
  selectProductById,
  updateProductCartStatus,
} from "../../store/purchaseProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import type { PurchaseProduct } from "../../types";
import type { RootState } from "../../store";
import { removeProductFromCart } from "../../store/cartSlice";

const SinglePurchaseProduct = () => {
  const { productId } = useParams();
  const productIdNumber = Number(productId);

  console.log("Product ID:", productIdNumber);

  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<PurchaseProduct | undefined>(
    undefined
  );
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const pdt = useSelector((state: RootState) =>
    selectProductById(state, productIdNumber)
  );

  useEffect(() => {
    setProduct(pdt);
    console.log("PRODUCT NAME: ", pdt?.name);
  }, [pdt]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();

  const handleCheckout = () => {
    navigate(`/purchase/product/${productId}/checkout`);
  };

  const handleAddToCart = () => {
    console.log("Entered add to cart");

    const updatedProduct = { ...product, addToCart: true };

    // just changes addToCart boolean to true and does nothing else ...
    dispatch(
      updateProductCartStatus({ productId: productIdNumber, addToCart: true })
    );

    dispatch(addToCart({ product: updatedProduct, quantity: count }));

    console.log(
      `Added product`,
      updatedProduct,
      `to cart with quantity ${count}`
    );

    setIsCartOpen(true);
  };

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    setQuantity(newCount);
  };

  const handleDecrement = () => {
    const newCount = Math.max(1, count - 1);
    setCount(newCount);
    setQuantity(newCount);
  };

  const handleRemove = (productIdNumber: number) => {
    dispatch(
      updateProductCartStatus({ productId: productIdNumber, addToCart: false })
    );
    dispatch(removeProductFromCart(productIdNumber));
    setIsCartOpen(false);
  }

  return (
    <Container size="lg" py="xl" className="mt-[-25px]">
      <div style={{ position: "relative", overflow: "hidden" }}>
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
            PKR {pdt?.price * count}{" "}
            <Text
              span
              fw={700}
              style={{ fontFamily: "Montserrat", fontSize: "20px" }}
              size="sm"
              c="#646464"
            >
              ({count} bag)
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

          {/* Rating and Reviews */}
          {/* {pdt?.rating && pdt?.reviews && (
            <div
              style={{
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Text
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "14px",
                  color: "#FFB800",
                }}
              >
                ★ {pdt?.rating}
              </Text>
              <Text
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "14px",
                  color: "#646464",
                }}
              >
                ({pdt?.reviews} reviews)
              </Text>
            </div>
          )} */}

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
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "30px",
                  height: "30px",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#686868",
                  borderRadius: "50%",
                  lineHeight: "1",
                  padding: "0",
                  margin: "0",
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
                {count}
              </span>

              <button
                onClick={handleIncrement}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "30px",
                  height: "30px",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#686868",
                  borderRadius: "50%",
                  lineHeight: "1",
                  padding: "0",
                  margin: "0",
                }}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
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

      {isCartOpen && (
        <div
          style={{
            position: "fixed",
            top: "2px",
            right: "0",
            height: "100vh",
            width: "396px",
            backgroundColor: "#FFFFFF",
            borderRadius: "16px 0 0 16px",
            boxShadow: "0px 10px 10px 0px #0000001A",
            zIndex: 1000,
            transition: "transform 0.3s ease-in-out",
            padding: "0",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "24px",
            }}
          >
            <div
              style={{
                fontFamily: "Montserrat",
                fontWeight: 600,
                fontSize: "20px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#0F783B",
              }}
            >
              Cart (1)
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                fontSize: "20px",
                fontWeight: "bold",
                cursor: "pointer",
                color: "#0F783B",
              }}
            >
              <AiOutlineClose />
            </button>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "0 24px 24px 24px", // Add padding to scrollable content
            }}
          >
            {/* Product Label */}
            <div
              style={{
                fontFamily: "Montserrat",
                fontWeight: 600,
                fontSize: "20px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#000000",
                marginBottom: "16px",
              }}
            >
              Product
            </div>

            {/* Product Image */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "24px",
              }}
            >
              <img
                src={pdt?.image}
                alt={pdt?.name}
                style={{
                  width: "243px",
                  height: "243px",
                  boxShadow: "0px 4px 10px 0px #0000001A",
                  borderRadius: "8px",
                }}
              />
            </div>

            {/* Product Details Container */}
            <div
              style={{
                marginBottom: "24px",
                flexGrow: 1,
                overflowY: "auto",
                paddingRight: "8px",
              }}
            >
              {/* Product Name */}
              <div
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: 600,
                  fontSize: "32px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: "#000000",
                  textAlign: "left",
                  marginBottom: "20px",
                }}
              >
                {pdt?.name}
              </div>

              {/* Category */}
              <div style={{ marginBottom: "20px" }}>
                <span
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: 400,
                    fontSize: "20px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#000000",
                  }}
                >
                  Category:{" "}
                </span>
                <span
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: 400,
                    fontSize: "20px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#646464",
                  }}
                >
                  {pdt?.category}
                </span>
              </div>

              {/* Price */}
              <div style={{ marginBottom: "20px" }}>
                <span
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#0F783B",
                  }}
                >
                  PKR{" "}{pdt?.price * count}{" "}
                </span>
                <span
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#646464",
                  }}
                >
                  ({count} bag)
                </span>
              </div>

              {/* Counter and Remove */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                {/* Counter */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #0F783B1A",
                    borderRadius: "100px",
                    padding: "8px 16px",
                    gap: "12px",
                  }}
                >
                  {/* <button
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#686868",
                      fontSize: "20px",
                      cursor: "pointer",
                      padding: "0",
                      lineHeight: "1",
                    }}
                  >
                    -
                  </button> */}
                  <span
                    style={{
                      fontFamily: "Montserrat",
                      fontWeight: 600,
                      fontSize: "16px",
                      color: "#0F783B",
                      minWidth: "20px",
                      textAlign: "center",
                    }}
                  >
                    {count}
                  </span>
                  {/* <button
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#686868",
                      fontSize: "20px",
                      cursor: "pointer",
                      padding: "0",
                      lineHeight: "1",
                    }}
                  >
                    +
                  </button> */}
                </div>

                {/* Remove Button */}
                <button
                onClick={() => handleRemove(productIdNumber)}
                  style={{
                    background: "transparent",
                    border: "none",
                    fontFamily: "Montserrat",
                    fontWeight: 600,
                    fontSize: "16px",
                    color: "#0F783B",
                    textTransform: "uppercase",
                    textDecoration: "underline",
                    textDecorationColor: "#0F783B",
                    textDecorationStyle: "solid",
                    cursor: "pointer",
                  }}
                >
                  REMOVE
                </button>
              </div>

              {/* Horizontal Divider */}
              <div
                style={{
                  width: "336px",
                  height: "1px",
                  backgroundColor: "#0F783B",
                  opacity: "20%",
                  borderRadius: "100px",
                  marginBottom: "15px",
                }}
              ></div>

              {/* Sub Total */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "30px",
                }}
              >
                <span
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#000000",
                  }}
                >
                  Sub Total
                </span>
                <span
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#000000",
                  }}
                >
                  {pdt?.price * count}
                </span>
              </div>

              {/* Total */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "24px",
                }}
              >
                <span
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#000000",
                  }}
                >
                  Total
                </span>
                <span
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: 700,
                    fontSize: "20px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#0F783B",
                    textAlign: "center",
                  }}
                >
                  {pdt?.price * count}
                </span>
              </div>
            </div>

            {/* Buttons Container */}
            <div style={{ marginTop: "auto" }}>
              {/* Check Out Button */}
              <Button
                onClick={handleCheckout}
                style={{
                  width: "333px",
                  height: "44px",
                  backgroundColor: "#0F783B",
                  border: "1px solid #0F783B1A",
                  borderRadius: "100px",
                  color: "#FFFFFF",
                  fontFamily: "Montserrat",
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  marginBottom: "12px",
                }}
                fullWidth
              >
                Check Out
              </Button>

              {/* View Cart Button */}
              <Button
                style={{
                  width: "336px",
                  height: "44px",
                  backgroundColor: "#F3FBF2",
                  border: "1px solid #BE8B454D",
                  borderRadius: "100px",
                  padding: "13px 23px",
                  fontFamily: "Montserrat",
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: "#BE8B45",
                  marginBottom: "12px",
                }}
                fullWidth
                variant="outline"
              >
                View Cart
              </Button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default SinglePurchaseProduct;
