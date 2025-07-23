import {
  Button,
  Container,
  Image,
  Text,
  Title,
} from "@mantine/core";
import { useState } from "react";
import f5 from "../../assets/f5.png";

const SinglePurchaseProduct = () => {
//   const [quantity, setQuantity] = useState(1);
  const [count, setCount] = useState(0);

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
              backgroundColor: "#0F783B",
              color: "white",
              fontWeight: 600,
              fontFamily: "Montserrat",
              fontSize: 12,
              minWidth: 0,
            }}
            variant="filled"
          >
            In Stock
          </Button>

          <Image
            src={f5}
            alt="Sarzab Nitrophos"
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

        {/* Content flowing around the image */}
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
            Sarzab Nitrophos NP
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
            PKR 5,000{" "}
            <Text
              span
              fw={700}
              style={{ fontFamily: "Montserrat", fontSize: "20px" }}
              size="sm"
              c="#646464"
            >
              (1 bag)
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
              Fertilizers
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
                onClick={() => setCount(Math.max(1, count - 1))}
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
                onClick={() => setCount(count + 1)}
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
              style={{
                border: "1px solid #0F783B1A",
                borderRadius: "100px",
                width: "175px",
                height: "40px",
                backgroundColor: "#0F783B",
                fontFamily: "Montserrat",
                fontWeight: 600,
                fontSize: "12px",
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
              Boost your agricultural yield with our high-quality Basic
              Fertilizers, available exclusively on Zarea. Designed to meet the
              nutritional needs of various crops, our Basic Fertilizers provide
              essential nutrients to enhance soil fertility and promote healthy
              plant growth. Ideal for farmers and agricultural businesses across
              Pakistan, our fertilizers ensure optimal crop production and
              sustainability. Basic Fertilizers provide essential nutrients to
              enhance
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
    </Container>
  );
};

export default SinglePurchaseProduct;
