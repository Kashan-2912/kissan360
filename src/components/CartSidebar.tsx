import { Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import {
  selectProductById,
  updateProductCartStatus,
} from "../store/purchaseProductSlice";
import { useDispatch, useSelector } from "react-redux";
import {
//   addToCart,
  removeProductFromCart,
//   incrementQuantity,
//   decrementQuantity,
  selectCartItemByProductId,
  selectCartTotalItems,
  selectCartTotalAmount,
//   selectIsProductInCart,
  formatPrice,
} from "../store/cartSlice";
import type { PurchaseProduct } from "../types";
import type { RootState } from "../store";

const CartSidebar = ({setIsCartOpen} : {setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const { productId } = useParams();
  const productIdNumber = Number(productId);

  console.log("Product ID:", productIdNumber);

  const [product, setProduct] = useState<PurchaseProduct | undefined>(
    undefined
  );
//   const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux selectors
  const pdt = useSelector((state: RootState) =>
    selectProductById(state, productIdNumber)
  );

  const cartItem = useSelector((state: RootState) =>
    selectCartItemByProductId(state, productIdNumber)
  );

//   const isProductInCart = useSelector((state: RootState) =>
//     selectIsProductInCart(state, productIdNumber)
//   );

  const totalCartItems = useSelector(selectCartTotalItems);
  const totalCartAmount = useSelector(selectCartTotalAmount);

  useEffect(() => {
    setProduct(pdt);
    console.log("PRODUCT NAME: ", pdt?.name);
  }, [pdt]);

  // Get current quantity from cart or default to 1
  const currentQuantity = cartItem?.quantity || 1;

  const handleRemove = (productIdNumber: number) => {
    dispatch(
      updateProductCartStatus({ productId: productIdNumber, addToCart: false })
    );
    dispatch(removeProductFromCart(productIdNumber));
    setIsCartOpen(false);
  };

  const handleCheckout = () => {
    navigate(`/purchase/product/${productId}/checkout`);
  };

  // Calculate display price based on current quantity
  const displayPrice = pdt ? Number(pdt.price) * currentQuantity : 0;

  return (
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
          Cart ({totalCartItems})
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
        className="overflow-x-hidden scrollbar-hide"
        style={{
          flex: 1,
          overflowY: "auto",
          // overflowX: "scroll-hidden",
          padding: "0 24px 24px 24px",
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
              {formatPrice(displayPrice)}{" "}
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
              ({currentQuantity} bag{currentQuantity !== 1 ? "s" : ""})
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
                {currentQuantity}
              </span>
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
              {formatPrice(cartItem?.totalPrice || displayPrice)}
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
              {formatPrice(totalCartAmount)}
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
  );
};

export default CartSidebar;
