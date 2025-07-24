import React from "react";
import { Button, Select, TextInput } from "@mantine/core";
import { useFormik } from "formik";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Tooltip } from "@mantine/core";
import { useState } from "react";
import { Modal, Center } from "@mantine/core";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import shippingSchema from "../../validation/shippingSchema";

const CheckoutPage: React.FC = () => {
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {

      // Contact Details
      name: "",
      email: "",
      phoneNumber: "",
      alternateNumber: "",

      // Shipping Details
      country: "Pakistan",
      state: "",
      district: "",
      city: "",
      address: "",
      postalCode: "",
    },

    validationSchema: shippingSchema,

    onSubmit: (values) => {
      console.log("Form submitted:", values);
      handleConfirmOrder();
    },
  });

  const handleConfirmOrder = () => {
    console.log("Form values:", formik.values);
    console.log("Order confirmed");
    setOrderSubmitted(true);
  };

  const handleCancel = () => {
    console.log("Order cancelled");
    formik.resetForm();
    navigate("/purchase");
  };

  const handleModalClose = () => {
    setOrderSubmitted(false);
    navigate("/purchase/history");
  };

  return (
    <>
      <Modal
        opened={orderSubmitted}
        onClose={handleModalClose}
        centered
        withCloseButton={false}
        size="md"
        radius="lg"
        overlayProps={{
          color: "gray",
        }}
      >
        <Center className="flex flex-col gap-4 text-center px-4 py-6">
          <div className="w-16 h-16 rounded-full bg-[#0F783B] flex items-center justify-center">
            <Check size={28} color="white" />
          </div>
          <h2 className="text-[18px] font-bold text-[#0F783B] font-[Montserrat] leading-[100%] tracking-[0px]">
            Your order has been placed Successfully!
          </h2>
          <p className="text-[12px] font-[Montserrat] text-[#646464] leading-[20px] tracking-[0px]">
            Our team will reach out to you with the next steps and further
            details regarding your purchase.
          </p>
        </Center>
      </Modal>

      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #0F783B1F",
          borderRadius: "12px",
          padding: "24px",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {/* Contact Details Section */}

        <div style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontFamily: "Montserrat",
              fontWeight: "bold",
              fontSize: "18px",
              lineHeight: "100%",
              letterSpacing: "0%",
              color: "#BE8B45",
              margin: "0 0 16px 0",
            }}
          >
            Contact Details
          </h2>

          <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                gap: "16px",
                marginBottom: "16px",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: "600",
                    fontSize: "10px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#000000",
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  Name <span style={{ color: "red" }}>*</span>
                </div>
                <TextInput
                  {...formik.getFieldProps("name")}
                  placeholder="Basit Ali Khan"
                  styles={{
                    input: {
                      width: "183px",
                      height: "36px",
                      borderRadius: "8px",
                      border:
                        formik.touched.name && formik.errors.name
                          ? "1px solid red"
                          : "1px solid #00000012",
                      backgroundColor: "#F5F5F599",
                      fontFamily: "Montserrat",
                      fontWeight: "500",
                      fontSize: "12px",
                      color: "#0F783B",
                      "&::placeholder": {
                        fontFamily: "Montserrat",
                        fontWeight: "600",
                        fontSize: "12px",
                        color: "#9D9999",
                      },
                    },
                  }}
                />
                {formik.touched.name && formik.errors.name && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "8px",
                      fontFamily: "Montserrat",
                      marginTop: "2px",
                    }}
                  >
                    {formik.errors.name}
                  </div>
                )}
              </div>

              <div>
                <div
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: "600",
                    fontSize: "10px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#000000",
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  Email <span style={{ color: "red" }}>*</span>
                </div>
                <TextInput
                  {...formik.getFieldProps("email")}
                  type="email"
                  placeholder="basitali@gmail.com"
                  styles={{
                    input: {
                      width: "183px",
                      height: "36px",
                      borderRadius: "8px",
                      border:
                        formik.touched.email && formik.errors.email
                          ? "1px solid red"
                          : "1px solid #00000012",
                      backgroundColor: "#F5F5F599",
                      fontFamily: "Montserrat",
                      fontWeight: "500",
                      fontSize: "12px",
                      color: "#0F783B",
                      "&::placeholder": {
                        fontFamily: "Montserrat",
                        fontWeight: "600",
                        fontSize: "12px",
                        color: "#9D9999",
                      },
                    },
                  }}
                />
                {formik.touched.email && formik.errors.email && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "8px",
                      fontFamily: "Montserrat",
                      marginTop: "2px",
                    }}
                  >
                    {formik.errors.email}
                  </div>
                )}
              </div>

              <div>
                <div
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: "600",
                    fontSize: "10px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#000000",
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  Phone Number <span style={{ color: "red" }}>*</span>
                </div>
                <TextInput
                  {...formik.getFieldProps("phoneNumber")}
                  type="tel"
                  placeholder="03045672973"
                  styles={{
                    input: {
                      width: "183px",
                      height: "36px",
                      borderRadius: "8px",
                      border:
                        formik.touched.phoneNumber && formik.errors.phoneNumber
                          ? "1px solid red"
                          : "1px solid #00000012",
                      backgroundColor: "#F5F5F599",
                      fontFamily: "Montserrat",
                      fontWeight: "500",
                      fontSize: "12px",
                      color: "#0F783B",
                      "&::placeholder": {
                        fontFamily: "Montserrat",
                        fontWeight: "600",
                        fontSize: "12px",
                        color: "#9D9999",
                      },
                    },
                  }}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "8px",
                      fontFamily: "Montserrat",
                      marginTop: "2px",
                    }}
                  >
                    {formik.errors.phoneNumber}
                  </div>
                )}
              </div>

              <div>
                <div
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: "600",
                    fontSize: "10px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#000000",
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  Alternate Number
                </div>
                <TextInput
                  {...formik.getFieldProps("alternateNumber")}
                  type="tel"
                  placeholder="-"
                  styles={{
                    input: {
                      width: "183px",
                      height: "36px",
                      borderRadius: "8px",
                      border:
                        formik.touched.alternateNumber && formik.errors.alternateNumber
                          ? "1px solid red"
                          : "1px solid #00000012",
                      backgroundColor: "#F5F5F599",
                      fontFamily: "Montserrat",
                      fontWeight: "500",
                      fontSize: "12px",
                      color: "#0F783B",
                      "&::placeholder": {
                        fontFamily: "Montserrat",
                        fontWeight: "600",
                        fontSize: "12px",
                        color: "#9D9999",
                      },
                    },
                  }}
                />
                {formik.touched.alternateNumber && formik.errors.alternateNumber && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "8px",
                      fontFamily: "Montserrat",
                      marginTop: "2px",
                    }}
                  >
                    {formik.errors.alternateNumber}
                  </div>
                )}
              </div>
          </div>
        </div>

        {/* Product Section */}
        <div style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontFamily: "Montserrat",
              fontWeight: "bold",
              fontSize: "18px",
              lineHeight: "100%",
              letterSpacing: "0%",
              color: "#BE8B45",
              margin: "0 0 16px 0",
            }}
          >
            Product (2)
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: "16px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                fontFamily: "Montserrat",
                fontWeight: "normal",
                fontSize: "14px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#5C5C5C",
              }}
            >
              Name
            </div>
            <div
              style={{
                fontFamily: "Montserrat",
                fontWeight: "normal",
                fontSize: "14px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#5C5C5C",
              }}
            >
              Category
            </div>
            <div
              style={{
                fontFamily: "Montserrat",
                fontWeight: "normal",
                fontSize: "14px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#5C5C5C",
              }}
            >
              Quantity
            </div>
            <div
              style={{
                fontFamily: "Montserrat",
                fontWeight: "normal",
                fontSize: "14px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#5C5C5C",
              }}
            >
              Price
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: "16px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                fontFamily: "Montserrat",
                fontWeight: "600",
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#000000",
              }}
            >
              Nitrophos
            </div>
            <div
              style={{
                fontFamily: "Montserrat",
                fontWeight: "600",
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#000000",
              }}
            >
              Fertilizers
            </div>
            <div
              style={{
                fontFamily: "Montserrat",
                fontWeight: "600",
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#000000",
              }}
            >
              1 bag
            </div>
            <div
              style={{
                fontFamily: "Montserrat",
                fontWeight: "600",
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#000000",
              }}
            >
              PKR 15,000
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: "16px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                fontFamily: "Montserrat",
                fontWeight: "600",
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#000000",
              }}
            >
              Urea
            </div>
            <div
              style={{
                fontFamily: "Montserrat",
                fontWeight: "600",
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#000000",
              }}
            >
              Fertilizers
            </div>
            <div
              style={{
                fontFamily: "Montserrat",
                fontWeight: "600",
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#000000",
              }}
            >
              1 bag
            </div>
            <div
              style={{
                fontFamily: "Montserrat",
                fontWeight: "600",
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#000000",
              }}
            >
              PKR 15,000
            </div>
          </div>
        </div>

        {/* Coupon Section */}
        <div style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontFamily: "Montserrat",
              fontWeight: "bold",
              fontSize: "18px",
              lineHeight: "100%",
              letterSpacing: "0%",
              color: "#BE8B45",
              margin: "0 0 16px 0",
            }}
          >
            Coupon
          </h2>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <input
              type="text"
              placeholder="Coupon code"
              style={{
                width: "313px",
                height: "36px",
                padding: "8px 12px",
                border: "1px solid #E0E0E0",
                borderTopLeftRadius: "8px",
                borderBottomLeftRadius: "8px",
                borderRight: "none",
                fontFamily: "Montserrat",
                fontWeight: "normal",
                fontSize: "10px",
                lineHeight: "100%",
                letterSpacing: "0%",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            <button
              style={{
                height: "36px",
                padding: "8px 16px",
                backgroundColor: "#F0F0F0",
                border: "1px solid #E0E0E0",
                borderTopRightRadius: "8px",
                borderBottomRightRadius: "8px",
                fontFamily: "Montserrat",
                fontWeight: "normal",
                fontSize: "10px",
                lineHeight: "100%",
                letterSpacing: "0%",
                cursor: "pointer",
              }}
            >
              Apply
            </button>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: "normal",
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: "#5C5C5C",
                }}
              >
                Shipping Price
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
                0
              </span>

              <Tooltip
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "8px",
                  fontWeight: "normal",
                  maxWidth: "125px",
                  whiteSpace: "normal",
                  textAlign: "center",
                }}
                bg={"#252525"}
                radius={"4px"}
                label="Our team will contact you regarding this"
                withArrow
                position="top-start"
                className="font-[Montserrat] font-normal leading-[100%] tracking-[0%] text-white"
                arrowOffset={60}
                arrowSize={8}
              >
                <div className="cursor-pointer text-[#7B7B7B80] text-[16px] flex items-center justify-center">
                  <AiOutlineInfoCircle />
                </div>
              </Tooltip>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: "normal",
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: "#5C5C5C",
                }}
              >
                Total Price
              </span>
              <span
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: "600",
                  fontSize: "16px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: "#000000",
                }}
              >
                PKR 31,000
              </span>
            </div>
          </div>
        </div>

        {/* Horizontal Divider */}
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "#D9D9D9",
            marginBottom: "24px",
          }}
        ></div>

        {/* Shipping Details Section - MOVED FORM TAG TO WRAP ENTIRE FORM INCLUDING BUTTONS */}
        <form onSubmit={formik.handleSubmit}>
          <div style={{ marginBottom: "24px" }}>
            <h2
              style={{
                fontFamily: "Montserrat",
                fontWeight: "bold",
                fontSize: "18px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#BE8B45",
                margin: "0 0 16px 0",
              }}
            >
              Shipping Details
            </h2>

            <div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      fontSize: "10px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      color: "#000000",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    Country <span style={{ color: "red" }}>*</span>
                  </div>
                  <TextInput
                    {...formik.getFieldProps("country")}
                    value="Pakistan"
                    style={{
                      backgroundColor: "#F5F5F599",
                    }}
                    styles={{
                      input: {
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        fontSize: "12px",
                        color: "#0F783B",
                        backgroundColor: "#F5F5F599",
                        border:
                          formik.touched.country && formik.errors.country
                            ? "1px solid red"
                            : "1px solid #00000012",
                        borderRadius: "4px",
                      },
                    }}
                  />
                  {formik.touched.country && formik.errors.country && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "8px",
                        fontFamily: "Montserrat",
                        marginTop: "2px",
                      }}
                    >
                      {formik.errors.country}
                    </div>
                  )}
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      fontSize: "10px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      color: "#000000",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    State <span style={{ color: "red" }}>*</span>
                  </div>
                  <TextInput
                    {...formik.getFieldProps("state")}
                    placeholder="Write your state"
                    styles={{
                      input: {
                        fontFamily: "Montserrat",
                        fontWeight: 500,
                        fontSize: "12px",
                        color: "#0F783B",
                        backgroundColor: "#F5F5F599",
                        border:
                          formik.touched.state && formik.errors.state
                            ? "1px solid red"
                            : "1px solid #00000012",
                        borderRadius: "4px",
                        "&::placeholder": {
                          fontFamily: "Montserrat",
                          fontWeight: "400",
                          fontSize: "10px",
                          color: "#9D9999",
                        },
                      },
                    }}
                  />
                  {formik.touched.state && formik.errors.state && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "8px",
                        fontFamily: "Montserrat",
                        marginTop: "2px",
                      }}
                    >
                      {formik.errors.state}
                    </div>
                  )}
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      fontSize: "10px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      color: "#000000",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    District <span style={{ color: "red" }}>*</span>
                  </div>
                  <Select
                    value={formik.values.district}
                    onChange={(value) =>
                      formik.setFieldValue("district", value)
                    }
                    onBlur={() => formik.setFieldTouched("district", true)}
                    placeholder="Select District"
                    data={["Islamabad", "Lahore", "Karachi", "Peshawar"]}
                    styles={{
                      input: {
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        fontSize: "12px",
                        color: "#0F783B",
                        backgroundColor: "#F5F5F599",
                        border:
                          formik.touched.district && formik.errors.district
                            ? "1px solid red"
                            : "1px solid #00000012",
                        borderRadius: "4px",
                        "&::placeholder": {
                          fontFamily: "Montserrat",
                          fontWeight: "400",
                          fontSize: "10px",
                          color: "#9D9999",
                        },
                      },
                    }}
                  />
                  {formik.touched.district && formik.errors.district && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "8px",
                        fontFamily: "Montserrat",
                        marginTop: "2px",
                      }}
                    >
                      {formik.errors.district}
                    </div>
                  )}
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "16px",
                  marginBottom: "24px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      fontSize: "10px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      color: "#000000",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    City <span style={{ color: "red" }}>*</span>
                  </div>
                  <Select
                    value={formik.values.city}
                    onChange={(value) => formik.setFieldValue("city", value)}
                    onBlur={() => formik.setFieldTouched("city", true)}
                    placeholder="Select City"
                    data={["Islamabad", "Lahore", "Karachi", "Peshawar"]}
                    styles={{
                      input: {
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        fontSize: "12px",
                        color: "#0F783B",
                        backgroundColor: "#F5F5F599",
                        border:
                          formik.touched.city && formik.errors.city
                            ? "1px solid red"
                            : "1px solid #00000012",
                        borderRadius: "4px",
                        "&::placeholder": {
                          fontFamily: "Montserrat",
                          fontWeight: "400",
                          fontSize: "10px",
                          color: "#9D9999",
                        },
                      },
                    }}
                  />
                  {formik.touched.city && formik.errors.city && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "8px",
                        fontFamily: "Montserrat",
                        marginTop: "2px",
                      }}
                    >
                      {formik.errors.city}
                    </div>
                  )}
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      fontSize: "10px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      color: "#000000",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    Address <span style={{ color: "red" }}>*</span>
                  </div>
                  <TextInput
                    {...formik.getFieldProps("address")}
                    placeholder="Write your address"
                    styles={{
                      input: {
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        fontSize: "12px",
                        color: "#0F783B",
                        backgroundColor: "#F5F5F599",
                        border:
                          formik.touched.address && formik.errors.address
                            ? "1px solid red"
                            : "1px solid #00000012",
                        borderRadius: "4px",
                        "&::placeholder": {
                          fontFamily: "Montserrat",
                          fontWeight: "400",
                          fontSize: "10px",
                          color: "#9D9999",
                        },
                      },
                    }}
                  />
                  {formik.touched.address && formik.errors.address && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "8px",
                        fontFamily: "Montserrat",
                        marginTop: "2px",
                      }}
                    >
                      {formik.errors.address}
                    </div>
                  )}
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      fontSize: "10px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      color: "#000000",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    Postal Code <span style={{ color: "red" }}>*</span>
                  </div>
                  <TextInput
                    {...formik.getFieldProps("postalCode")}
                    placeholder="Write postal code"
                    styles={{
                      input: {
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        fontSize: "12px",
                        color: "#0F783B",
                        backgroundColor: "#F5F5F599",
                        border:
                          formik.touched.postalCode && formik.errors.postalCode
                            ? "1px solid red"
                            : "1px solid #00000012",
                        borderRadius: "4px",
                        "&::placeholder": {
                          fontFamily: "Montserrat",
                          fontWeight: "400",
                          fontSize: "10px",
                          color: "#9D9999",
                        },
                      },
                    }}
                  />
                  {formik.touched.postalCode && formik.errors.postalCode && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "8px",
                        fontFamily: "Montserrat",
                        marginTop: "2px",
                      }}
                    >
                      {formik.errors.postalCode}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons - NOW INSIDE THE FORM */}
          <div style={{ display: "flex", gap: "16px" }}>
            <Button
              type="submit"
              style={{
                backgroundColor: "#0F783B",
                border: "1px solid #0F783B1A",
                borderRadius: "100px",
                padding: "16px 23px",
                width: "160px",
                height: "45px",
                fontFamily: "Montserrat",
                fontWeight: "600",
                fontSize: "12px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Confirm Order
            </Button>

            <Button
              type="button"
              onClick={handleCancel}
              style={{
                backgroundColor: "#F3FBF2",
                border: "1px solid #BE8B454D",
                borderRadius: "100px",
                padding: "16px 23px",
                width: "160px",
                height: "45px",
                fontFamily: "Montserrat",
                fontWeight: "600",
                fontSize: "12px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#BE8B45",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CheckoutPage;
