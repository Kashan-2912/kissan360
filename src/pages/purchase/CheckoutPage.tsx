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
import { selectCartItemsCount, selectCartItems, selectCartTotalAmount } from "../../store/cartSlice";
import { useSelector } from "react-redux";

const CheckoutPage: React.FC = () => {
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const navigate = useNavigate();

  const totalItems = useSelector(selectCartItemsCount);
  const allCartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);

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

  const inputStyles = (hasError) => ({
    input: {
      width: "100%",
      height: "36px",
      borderRadius: "8px",
      border: hasError ? "1px solid red" : "1px solid #00000012",
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
  });

  const selectStyles = (hasError) => ({
    input: {
      fontFamily: "Montserrat",
      fontWeight: "500",
      fontSize: "12px",
      color: "#0F783B",
      backgroundColor: "#F5F5F599",
      border: hasError ? "1px solid red" : "1px solid #00000012",
      borderRadius: "4px",
      "&::placeholder": {
        fontFamily: "Montserrat",
        fontWeight: "400",
        fontSize: "10px",
        color: "#9D9999",
      },
    },
  });

  const labelStyle = {
    fontFamily: "Montserrat",
    fontWeight: "600",
    fontSize: "10px",
    lineHeight: "100%",
    letterSpacing: "0%",
    color: "#000000",
    display: "block",
    marginBottom: "4px",
  };

  const errorStyle = {
    color: "red",
    fontSize: "8px",
    fontFamily: "Montserrat",
    marginTop: "2px",
  };

  const sectionHeaderStyle = {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "100%",
    letterSpacing: "0%",
    color: "#BE8B45",
    margin: "0 0 16px 0",
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

      <div className="bg-white border border-[#0F783B1F] rounded-xl p-4 sm:p-6 max-w-6xl mx-auto">
        {/* Contact Details Section */}
        <div className="mb-6">
          <h2 style={sectionHeaderStyle}>Contact Details</h2>

          {/* Mobile Layout (xs) - Stack in rows */}
          <div className="block sm:hidden space-y-4">
            {/* Name row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div style={labelStyle}>
                  Name <span style={{ color: "red" }}>*</span>
                </div>
                <TextInput
                  {...formik.getFieldProps("name")}
                  placeholder="Basit Ali Khan"
                  styles={inputStyles(formik.touched.name && formik.errors.name)}
                />
                {formik.touched.name && formik.errors.name && (
                  <div style={errorStyle}>{formik.errors.name}</div>
                )}
              </div>
              <div>
                <div style={labelStyle}>
                  Email <span style={{ color: "red" }}>*</span>
                </div>
                <TextInput
                  {...formik.getFieldProps("email")}
                  type="email"
                  placeholder="basitali@gmail.com"
                  styles={inputStyles(formik.touched.email && formik.errors.email)}
                />
                {formik.touched.email && formik.errors.email && (
                  <div style={errorStyle}>{formik.errors.email}</div>
                )}
              </div>
            </div>

            {/* Phone numbers row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div style={labelStyle}>
                  Phone Number <span style={{ color: "red" }}>*</span>
                </div>
                <TextInput
                  {...formik.getFieldProps("phoneNumber")}
                  type="tel"
                  placeholder="03045672973"
                  styles={inputStyles(formik.touched.phoneNumber && formik.errors.phoneNumber)}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <div style={errorStyle}>{formik.errors.phoneNumber}</div>
                )}
              </div>
              <div>
                <div style={labelStyle}>Alternate Number</div>
                <TextInput
                  {...formik.getFieldProps("alternateNumber")}
                  type="tel"
                  placeholder="-"
                  styles={inputStyles(formik.touched.alternateNumber && formik.errors.alternateNumber)}
                />
                {formik.touched.alternateNumber && formik.errors.alternateNumber && (
                  <div style={errorStyle}>{formik.errors.alternateNumber}</div>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Layout (sm and above) - 4 columns */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <div style={labelStyle}>
                Name <span style={{ color: "red" }}>*</span>
              </div>
              <TextInput
                {...formik.getFieldProps("name")}
                placeholder="Basit Ali Khan"
                styles={inputStyles(formik.touched.name && formik.errors.name)}
              />
              {formik.touched.name && formik.errors.name && (
                <div style={errorStyle}>{formik.errors.name}</div>
              )}
            </div>

            <div>
              <div style={labelStyle}>
                Email <span style={{ color: "red" }}>*</span>
              </div>
              <TextInput
                {...formik.getFieldProps("email")}
                type="email"
                placeholder="basitali@gmail.com"
                styles={inputStyles(formik.touched.email && formik.errors.email)}
              />
              {formik.touched.email && formik.errors.email && (
                <div style={errorStyle}>{formik.errors.email}</div>
              )}
            </div>

            <div>
              <div style={labelStyle}>
                Phone Number <span style={{ color: "red" }}>*</span>
              </div>
              <TextInput
                {...formik.getFieldProps("phoneNumber")}
                type="tel"
                placeholder="03045672973"
                styles={inputStyles(formik.touched.phoneNumber && formik.errors.phoneNumber)}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <div style={errorStyle}>{formik.errors.phoneNumber}</div>
              )}
            </div>

            <div>
              <div style={labelStyle}>Alternate Number</div>
              <TextInput
                {...formik.getFieldProps("alternateNumber")}
                type="tel"
                placeholder="-"
                styles={inputStyles(formik.touched.alternateNumber && formik.errors.alternateNumber)}
              />
              {formik.touched.alternateNumber && formik.errors.alternateNumber && (
                <div style={errorStyle}>{formik.errors.alternateNumber}</div>
              )}
            </div>
          </div>
        </div>

        {/* Product Section */}
        <div className="mb-6">
          <h2 style={sectionHeaderStyle}>Product ({totalItems})</h2>

          {/* Mobile Layout - Stack vertically */}
          <div className="block md:hidden">
            {allCartItems.map((item, index) => (
              <div key={index} className="border-b border-gray-200 py-3 last:border-b-0">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span style={{
                      fontFamily: "Montserrat",
                      fontWeight: "normal",
                      fontSize: "14px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      color: "#5C5C5C",
                    }}>Name:</span>
                    <div style={{
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      fontSize: "16px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      color: "#000000",
                    }}>{item?.product?.name}</div>
                  </div>
                  <div>
                    <span style={{
                      fontFamily: "Montserrat",
                      fontWeight: "normal",
                      fontSize: "14px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      color: "#5C5C5C",
                    }}>Category:</span>
                    <div style={{
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      fontSize: "16px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      color: "#000000",
                    }}>{item?.product?.category}</div>
                  </div>
                  <div>
                    <span style={{
                      fontFamily: "Montserrat",
                      fontWeight: "normal",
                      fontSize: "14px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      color: "#5C5C5C",
                    }}>Quantity:</span>
                    <div style={{
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      fontSize: "16px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      color: "#000000",
                    }}>{item?.quantity} bag{item?.quantity > 1 ? "s" : ""}</div>
                  </div>
                  <div>
                    <span style={{
                      fontFamily: "Montserrat",
                      fontWeight: "normal",
                      fontSize: "14px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      color: "#5C5C5C",
                    }}>Price:</span>
                    <div style={{
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      fontSize: "16px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      color: "#000000",
                    }}>PKR {item?.totalPrice}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Layout - Table format */}
          <div className="hidden md:block">
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div style={{
                fontFamily: "Montserrat",
                fontWeight: "normal",
                fontSize: "14px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#5C5C5C",
              }}>Name</div>
              <div style={{
                fontFamily: "Montserrat",
                fontWeight: "normal",
                fontSize: "14px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#5C5C5C",
              }}>Category</div>
              <div style={{
                fontFamily: "Montserrat",
                fontWeight: "normal",
                fontSize: "14px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#5C5C5C",
              }}>Quantity</div>
              <div style={{
                fontFamily: "Montserrat",
                fontWeight: "normal",
                fontSize: "14px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#5C5C5C",
              }}>Price</div>
            </div>

            {allCartItems.map((item, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 mb-4">
                <div style={{
                  fontFamily: "Montserrat",
                  fontWeight: "600",
                  fontSize: "16px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: "#000000",
                }}>{item?.product?.name}</div>
                <div style={{
                  fontFamily: "Montserrat",
                  fontWeight: "600",
                  fontSize: "16px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: "#000000",
                }}>{item?.product?.category}</div>
                <div style={{
                  fontFamily: "Montserrat",
                  fontWeight: "600",
                  fontSize: "16px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: "#000000",
                }}>{item?.quantity} bag{item?.quantity > 1 ? "s" : ""}</div>
                <div style={{
                  fontFamily: "Montserrat",
                  fontWeight: "600",
                  fontSize: "16px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: "#000000",
                }}>PKR {item?.totalPrice}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Coupon Section */}
        <div className="mb-6">
          <h2 style={sectionHeaderStyle}>Coupon</h2>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
            <div className="flex flex-1 max-w-md">
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
                  maxWidth: "100%",
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
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <span style={{
                fontFamily: "Montserrat",
                fontWeight: "normal",
                fontSize: "14px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#5C5C5C",
              }}>Shipping Price</span>
              <span style={{
                fontFamily: "Montserrat",
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#000000",
              }}>0</span>
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
            <div className="flex items-center gap-2">
              <span style={{
                fontFamily: "Montserrat",
                fontWeight: "normal",
                fontSize: "14px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#5C5C5C",
              }}>Total Price</span>
              <span style={{
                fontFamily: "Montserrat",
                fontWeight: "600",
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#000000",
              }}>PKR {totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Horizontal Divider */}
        <div className="w-full h-px bg-[#D9D9D9] mb-6"></div>

        {/* Shipping Details Section */}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <h2 style={sectionHeaderStyle}>Shipping Details</h2>

            {/* First row - Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <div style={labelStyle}>
                  Country <span style={{ color: "red" }}>*</span>
                </div>
                <TextInput
                  {...formik.getFieldProps("country")}
                  value="Pakistan"
                  styles={selectStyles(formik.touched.country && formik.errors.country)}
                />
                {formik.touched.country && formik.errors.country && (
                  <div style={errorStyle}>{formik.errors.country}</div>
                )}
              </div>

              <div>
                <div style={labelStyle}>
                  State <span style={{ color: "red" }}>*</span>
                </div>
                <TextInput
                  {...formik.getFieldProps("state")}
                  placeholder="Write your state"
                  styles={selectStyles(formik.touched.state && formik.errors.state)}
                />
                {formik.touched.state && formik.errors.state && (
                  <div style={errorStyle}>{formik.errors.state}</div>
                )}
              </div>

              <div>
                <div style={labelStyle}>
                  District <span style={{ color: "red" }}>*</span>
                </div>
                <Select
                  value={formik.values.district}
                  onChange={(value) => formik.setFieldValue("district", value)}
                  onBlur={() => formik.setFieldTouched("district", true)}
                  placeholder="Select District"
                  data={["Islamabad", "Lahore", "Karachi", "Peshawar"]}
                  styles={selectStyles(formik.touched.district && formik.errors.district)}
                />
                {formik.touched.district && formik.errors.district && (
                  <div style={errorStyle}>{formik.errors.district}</div>
                )}
              </div>
            </div>

            {/* Second row - Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div>
                <div style={labelStyle}>
                  City <span style={{ color: "red" }}>*</span>
                </div>
                <Select
                  value={formik.values.city}
                  onChange={(value) => formik.setFieldValue("city", value)}
                  onBlur={() => formik.setFieldTouched("city", true)}
                  placeholder="Select City"
                  data={["Islamabad", "Lahore", "Karachi", "Peshawar"]}
                  styles={selectStyles(formik.touched.city && formik.errors.city)}
                />
                {formik.touched.city && formik.errors.city && (
                  <div style={errorStyle}>{formik.errors.city}</div>
                )}
              </div>

              <div>
                <div style={labelStyle}>
                  Address <span style={{ color: "red" }}>*</span>
                </div>
                <TextInput
                  {...formik.getFieldProps("address")}
                  placeholder="Write your address"
                  styles={selectStyles(formik.touched.address && formik.errors.address)}
                />
                {formik.touched.address && formik.errors.address && (
                  <div style={errorStyle}>{formik.errors.address}</div>
                )}
              </div>

              <div>
                <div style={labelStyle}>
                  Postal Code <span style={{ color: "red" }}>*</span>
                </div>
                <TextInput
                  {...formik.getFieldProps("postalCode")}
                  placeholder="Write postal code"
                  styles={selectStyles(formik.touched.postalCode && formik.errors.postalCode)}
                />
                {formik.touched.postalCode && formik.errors.postalCode && (
                  <div style={errorStyle}>{formik.errors.postalCode}</div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row gap-4 pb-20">
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
              className="w-full sm:w-40"
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
              className="w-full sm:w-40"
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