import React, { useEffect } from "react";
import {
  Container,
  Group,
  Text,
  Stack,
  Paper,
  Image,
  Flex,
  // Box,
  Grid,
} from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  selectOrders,
  selectSelectedOrder,
  setSelectedOrder,
} from "../../store/orderHistorySlice";
import type { OrderDetails, OrderedProduct } from "../../types";
import IMG from "../../assets/f3.png";

const ViewOrderDetails: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();

  console.log("ORDER ID: ", orderId);

  const orders = useSelector(selectOrders);
  const selectedOrder = useSelector(selectSelectedOrder);

  // Find and set the selected order when component mounts or orderId changes
  useEffect(() => {
    if (orderId && orders.length > 0) {
      const order = orders.find((o) => o.orderId === orderId);
      if (order) {
        dispatch(setSelectedOrder(order));
      } else {
        // Order not found, redirect back to order history
        navigate(`/purchase/order/${orderId}`);
      }
    }
  }, [orderId, orders, dispatch, navigate]);

  // If no order is selected or found, show loading or redirect
  if (!selectedOrder) {
    return (
      <Container style={{ padding: "2px", minHeight: "100vh" }}>
        <Paper
          bg={"transparent"}
          style={{ maxWidth: "896px", borderRadius: "8px" }}
        >
          <Text>Loading order details...</Text>
        </Paper>
      </Container>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Shipped":
        return "#BD8E43";
      case "Pending":
        return "#D63535";
      case "Delivered":
        return "#0F783B";
      case "Cancelled":
        return "#6B7280";
      default:
        return "gray";
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  // Format shipping address
  const formatShippingAddress = (
    shippingAddress: OrderDetails["shippingAddress"]
  ) => {
    return `${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.district}, ${shippingAddress.state}, ${shippingAddress.country} - ${shippingAddress.postalCode}`;
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return `PKR ${amount.toLocaleString()}`;
  };

  // Info Item Component for grid layout
  const InfoItem: React.FC<{
    label: string;
    value: string;
    color?: string;
  }> = ({ label, value, color = "black" }) => (
    <Group gap={16}>
      <Text
        style={{
          fontWeight: 400,
          fontSize: "14px",
          color: "#5C5C5C",
          fontFamily: "Montserrat",
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontWeight: 600,
          fontSize: "16px",
          color: color,
          fontFamily: "Montserrat",
        }}
      >
        {value}
      </Text>
    </Group>
  );

  const ProductCard: React.FC<{ product: OrderedProduct }> = ({ product }) => (
    <Flex align="center" gap={42} style={{ width: "100%", maxWidth: "579px" }}>
      {/* Image Container with white background */}
      <Paper
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px 0px rgba(0,0,0,0.15)",
          width: "206px",
          height: "182px",
          flexShrink: 0,
        }}
      >
        <Image
          src={product.image || IMG}
          alt={product.name}
          style={{
            width: "98px",
            height: "133px",
            objectFit: "cover",
            borderRadius: "4px",
          }}
        />
      </Paper>

      {/* Product Details Container - Left aligned */}
      <Stack justify="center" style={{ flex: 1 }} gap={16}>
        {/* Product Name */}
        <Text
          style={{
            textAlign: "left",
            color: "black",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "1.2",
            letterSpacing: "normal",
            fontFamily: "Montserrat",
          }}
        >
          {product.name}
        </Text>

        {/* Category */}
        <Group gap={4} style={{ justifyContent: "flex-start" }}>
          <Text
            style={{
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "1",
              letterSpacing: "normal",
              color: "#7B7B7B",
              fontFamily: "Poppins",
            }}
          >
            Category:
          </Text>
          <Text
            style={{
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "1",
              letterSpacing: "normal",
              color: "#BE8B45",
              fontFamily: "Poppins",
            }}
          >
            {product.category}
          </Text>
        </Group>

        {/* Quantity */}
        <Group gap={4} style={{ justifyContent: "flex-start" }}>
          <Text
            style={{
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "1",
              letterSpacing: "normal",
              color: "#7B7B7B",
              fontFamily: "Poppins",
            }}
          >
            Quantity:
          </Text>
          <Text
            style={{
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "1",
              letterSpacing: "normal",
              color: "#202020",
              fontFamily: "Poppins",
            }}
          >
            {product.quantity}
          </Text>
        </Group>

        {/* Unit Price */}
        <Group gap={4} style={{ justifyContent: "flex-start" }}>
          <Text
            style={{
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "1",
              letterSpacing: "normal",
              color: "#7B7B7B",
              fontFamily: "Poppins",
            }}
          >
            Unit Price:
          </Text>
          <Text
            style={{
              fontWeight: 600,
              fontSize: "16px",
              lineHeight: "1",
              letterSpacing: "normal",
              color: "#202020",
              fontFamily: "Poppins",
            }}
          >
            {formatCurrency(product.unitPrice)}
          </Text>
        </Group>

        {/* Total Price for this product */}
        <Group gap={4} style={{ justifyContent: "flex-start" }}>
          <Text
            style={{
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "1",
              letterSpacing: "normal",
              color: "#7B7B7B",
              fontFamily: "Poppins",
            }}
          >
            Total:
          </Text>
          <Text
            style={{
              fontWeight: 600,
              fontSize: "16px",
              lineHeight: "1",
              letterSpacing: "normal",
              color: "#0F783B",
              fontFamily: "Poppins",
            }}
          >
            {formatCurrency(product.totalPrice)}
          </Text>
        </Group>
      </Stack>
    </Flex>
  );

  return (
    <Container
      size="lg"
      style={{ padding: "16px", minHeight: "100vh", marginBottom: "100px" }}
    >
      <Paper
        bg={"transparent"}
        style={{ maxWidth: "1000px", borderRadius: "8px", margin: "0 auto" }}
      >
        {/* Order Header Information */}
        <Group gap={32} style={{ marginBottom: "40px" }}>
          {/* Order Details Grid */}
          <Grid>
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
              <InfoItem label="Order ID" value={selectedOrder.orderId} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
              <InfoItem
                label="Order Date"
                value={formatDate(selectedOrder.orderDate)}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
              <InfoItem
                label="Total Price"
                value={formatCurrency(selectedOrder.totalAmount)}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
              <InfoItem
                label="Status"
                value={selectedOrder.status}
                color={getStatusColor(selectedOrder.status)}
              />
            </Grid.Col>
            {/* <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
              <InfoItem label="Customer" value={selectedOrder.customerName} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 12, md: 12 }}>
              <InfoItem label="Email" value={selectedOrder.customerEmail} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
              <InfoItem label="Contact" value={selectedOrder.contactNumber} />
            </Grid.Col>
            {selectedOrder.alternateNumber && (
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <InfoItem label="Alternate Contact" value={selectedOrder.alternateNumber} />
              </Grid.Col>
            )} */}
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Group gap={16} align="flex-start">
                <Text
                  style={{
                    fontWeight: 400,
                    fontSize: "14px",
                    color: "#5C5C5C",
                    fontFamily: "Montserrat",
                    whiteSpace: "nowrap",
                  }}
                >
                  Shipping Address
                </Text>
                <Text
                  style={{
                    fontWeight: 600,
                    fontSize: "16px",
                    color: "black",
                    fontFamily: "Montserrat",
                    lineHeight: "1.4",
                    flex: 1,
                  }}
                >
                  {formatShippingAddress(selectedOrder.shippingAddress)}
                </Text>
              </Group>
            </Grid.Col>
          </Grid>
        </Group>

        {/* Product Information Section */}
        <Stack style={{ marginTop: "48px" }}>
          <Text
            style={{
              fontWeight: 700,
              fontSize: "18px",
              lineHeight: "1",
              letterSpacing: "normal",
              marginBottom: "4px",
              color: "#BE8B45",
              fontFamily: "Montserrat",
            }}
          >
            Product Information
          </Text>

          {/* Total Products */}
          <Grid style={{ marginBottom: "32px" }}>
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
              <InfoItem
                label="Total Products"
                value={selectedOrder.totalItems.toString()}
              />
            </Grid.Col>
          </Grid>

          {/* Products List */}
          <Stack gap={30}>
            {selectedOrder.orderedProducts.map((product) => (
              <ProductCard
                key={`${product.id}-${product.orderId}`}
                product={product}
              />
            ))}
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ViewOrderDetails;
