import { useSelector } from "react-redux";

import {
  Table,
  Select,
  Button,
  Group,
  Badge,
  ActionIcon,
  TextInput,
  Text,
  Stack,
  Flex,
  Box,
  Container,
} from "@mantine/core";

import {
  selectOrderLoading,
  selectOrderError,
  selectOrdersCount,
  selectOrders,
} from "../../store/orderHistorySlice";

import { FaSortDown } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { CgUndo } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import NotFound from "../../assets/not_found.png";
import View from "../../assets/search-file.png";
import type { OrderDetails } from "../../types";
import MobileOrderCard from "../../components/MobileOrderCard";

const OrderHistory = () => {
  const orders = useSelector(selectOrders);
  const loading = useSelector(selectOrderLoading);
  const error = useSelector(selectOrderError);
  const reduxOrders = useSelector(selectOrdersCount);

  console.log("REDUX ORDERS HISTORY: ", reduxOrders);
  console.log("ORDERS DATA: ", orders);

  // Filtered orders for display
  const [filteredOrders, setFilteredOrders] = useState<OrderDetails[]>([]);

  // Local filter states
  const [localFilters, setLocalFilters] = useState({
    searchByProduct: "",
    searchByStatus: "",
    searchById: "",
  });

  const navigate = useNavigate();

  // Update filtered orders when orders change
  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  const handleFilterChange = (field: string, value: string) => {
    setLocalFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    let filtered = [...orders];

    // Filter by Order ID
    if (localFilters.searchById.trim()) {
      filtered = filtered.filter((order) =>
        order.orderId
          .toLowerCase()
          .includes(localFilters.searchById.toLowerCase())
      );
    }

    // Filter by status
    if (localFilters.searchByStatus) {
      filtered = filtered.filter(
        (order) => order.status === localFilters.searchByStatus
      );
    }

    // Filter by product name in ordered products
    if (localFilters.searchByProduct.trim()) {
      filtered = filtered.filter((order) =>
        order.orderedProducts.some((product) =>
          product.name
            .toLowerCase()
            .includes(localFilters.searchByProduct.toLowerCase())
        )
      );
    }

    setFilteredOrders(filtered);
    console.log("Searching with filters:", localFilters);
    console.log("Filtered results:", filtered);
  };

  const handleReset = () => {
    setLocalFilters({
      searchByProduct: "",
      searchByStatus: "",
      searchById: "",
    });
    setFilteredOrders(orders); // Reset to show all orders
  };

  const handleViewOrder = (orderId: string) => {
    console.log("Viewing order with ID:", orderId);
    navigate(`/purchase/order/${orderId}`);
  };

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

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "Shipped":
        return "#F8E8D2";
      case "Pending":
        return "#FFECEC";
      case "Delivered":
        return "#DDEEE0";
      case "Cancelled":
        return "#F3F4F6";
      default:
        return "#F3F4F6";
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // Format as DD/MM/YYYY
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return `PKR ${amount.toLocaleString()}`;
  };

  const inputStyles = {
    input: {
      paddingBottom: 25,
      paddingLeft: 8,
      paddingRight: 8,
      borderBottom: "2px solid #BFE1C8",
      borderRadius: 0,
      fontFamily: "Montserrat, sans-serif",
      fontSize: 14,
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      backgroundColor: "transparent",
      textAlign: "left" as const,
      height: "40px",
      display: "flex",
      alignItems: "center",
      "::placeholder": {
        textAlign: "left" as const,
        fontSize: 12,
        fontWeight: 600,
        color: "#0F783B",
        fontFamily: "Montserrat, sans-serif",
      },
    },
    wrapper: {
      position: "relative" as const,
    },
  };

  // Select styles for dropdown (status)
  const selectStyles = {
    input: {
      paddingBottom: 25,
      paddingLeft: 8,
      paddingRight: 30,
      borderBottom: "2px solid #BFE1C8",
      borderRadius: 0,
      fontFamily: "Montserrat, sans-serif",
      fontSize: 14,
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      backgroundColor: "transparent",
      textAlign: "left" as const,
      height: "40px",
      display: "flex",
      alignItems: "center",
    },
    placeholder: {
      textAlign: "left" as const,
      fontSize: 12,
      fontWeight: 600,
      color: "#0F783B",
      fontFamily: "Montserrat, sans-serif",
    },
    wrapper: {
      position: "relative" as const,
    },
  };

  return (
    <Container size="xl" style={{ padding: "16px" }}>
      <div
        style={{
          maxWidth: "1043px",
          minHeight: "731px",
          borderRadius: "12px",
          border: "1px solid #0F783B1F",
          backgroundColor: "#FFFFFF",
          margin: "0 auto",
          overflow: "auto",
        }}
      >
        <div style={{ padding: "24px" }}>
          {loading && (
            <div
              style={{
                marginBottom: "16px",
                textAlign: "center",
                color: "#0F783B",
                fontFamily: "Montserrat",
                fontSize: "14px",
              }}
            >
              Loading orders...
            </div>
          )}

          {error && (
            <div
              style={{
                marginBottom: "16px",
                textAlign: "center",
                color: "#D63535",
                fontFamily: "Montserrat",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          {/* Header */}
          <div style={{ marginBottom: "32px" }}>
            <Text
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#BE8B45",
                fontFamily: "Montserrat",
                paddingTop: "20px",
              }}
            >
              Order History
            </Text>
          </div>

          {/* Filters - Desktop */}
          <Box visibleFrom="md" style={{ marginBottom: "24px" }}>
            <Flex justify="space-between" align="flex-end" gap={16} wrap="wrap">
              <Group gap={16}>
                {/* Search by Product - Text Input */}
                <div style={{ position: "relative", width: "240px" }}>
                  <TextInput
                    variant="unstyled"
                    placeholder="Search by product"
                    value={localFilters.searchByProduct}
                    onChange={(event) =>
                      handleFilterChange(
                        "searchByProduct",
                        event.currentTarget.value
                      )
                    }
                    styles={inputStyles}
                  />
                </div>

                {/* Search by Status - Select with Dropdown */}
                <div style={{ position: "relative", width: "240px" }}>
                  <div
                    style={{
                      position: "absolute",
                      top: "6px",
                      right: "8px",
                      zIndex: 10,
                      pointerEvents: "none",
                    }}
                  >
                    <FaSortDown
                      style={{ color: "#0F783B", fontSize: "12px" }}
                    />
                  </div>
                  <Select
                    variant="unstyled"
                    placeholder="Search by status"
                    data={["Shipped", "Pending", "Delivered", "Cancelled"]}
                    value={localFilters.searchByStatus}
                    onChange={(value) =>
                      handleFilterChange("searchByStatus", value || "")
                    }
                    clearable
                    rightSectionWidth={0}
                    styles={selectStyles}
                  />
                </div>

                {/* Search by ID - Text Input */}
                <div style={{ position: "relative", width: "240px" }}>
                  <TextInput
                    variant="unstyled"
                    placeholder="Search by ID"
                    value={localFilters.searchById}
                    onChange={(event) =>
                      handleFilterChange(
                        "searchById",
                        event.currentTarget.value
                      )
                    }
                    styles={inputStyles}
                  />
                </div>
              </Group>

              <Group gap={16}>
                <Button
                  color="#0F783B"
                  variant="filled"
                  leftSection={
                    <BsSearch style={{ width: "12px", height: "12px" }} />
                  }
                  onClick={handleSearch}
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: "500",
                    fontSize: "13px",
                    width: "110px",
                    height: "35px",
                    borderRadius: "100px",
                    border: "1px solid #00000012",
                  }}
                >
                  Search
                </Button>
                <ActionIcon
                  variant="light"
                  size="lg"
                  radius="xl"
                  onClick={handleReset}
                  style={{
                    backgroundColor: "#D634342B",
                    border: "1px solid #FF6B6B40",
                    borderRadius: "100px",
                    width: "50px",
                    height: "35px",
                  }}
                >
                  <CgUndo size={20} color="#D63535" />
                </ActionIcon>
              </Group>
            </Flex>
          </Box>

          {/* Filters - Mobile */}
          <Stack gap={16} hiddenFrom="md" style={{ marginBottom: "24px" }}>
            <TextInput
              variant="unstyled"
              placeholder="Search by product"
              value={localFilters.searchByProduct}
              onChange={(event) =>
                handleFilterChange("searchByProduct", event.currentTarget.value)
              }
              styles={inputStyles}
            />

            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  top: "6px",
                  right: "8px",
                  zIndex: 10,
                  pointerEvents: "none",
                }}
              >
                <FaSortDown style={{ color: "#0F783B", fontSize: "12px" }} />
              </div>
              <Select
                variant="unstyled"
                placeholder="Search by status"
                data={["Shipped", "Pending", "Delivered", "Cancelled"]}
                value={localFilters.searchByStatus}
                onChange={(value) =>
                  handleFilterChange("searchByStatus", value || "")
                }
                clearable
                rightSectionWidth={0}
                styles={selectStyles}
              />
            </div>

            <TextInput
              variant="unstyled"
              placeholder="Search by ID"
              value={localFilters.searchById}
              onChange={(event) =>
                handleFilterChange("searchById", event.currentTarget.value)
              }
              styles={inputStyles}
            />

            <Group gap={16}>
              <Button
                color="#0F783B"
                variant="filled"
                leftSection={
                  <BsSearch style={{ width: "12px", height: "12px" }} />
                }
                onClick={handleSearch}
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: "500",
                  fontSize: "13px",
                  height: "35px",
                  borderRadius: "100px",
                  border: "1px solid #00000012",
                  flex: 1,
                }}
              >
                Search
              </Button>
              <ActionIcon
                variant="light"
                size="lg"
                radius="xl"
                onClick={handleReset}
                style={{
                  backgroundColor: "#D634342B",
                  border: "1px solid #FF6B6B40",
                  borderRadius: "100px",
                  width: "50px",
                  height: "35px",
                }}
              >
                <CgUndo size={20} color="#D63535" />
              </ActionIcon>
            </Group>
          </Stack>

          {/* Desktop Table */}
          <Box visibleFrom="md">
            <div
              style={{
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid #D9D9D9",
                width: "100%",
              }}
            >
              <Table style={{ tableLayout: "fixed", width: "100%" }}>
                <Table.Thead
                  style={{ backgroundColor: "#0F783B", height: "48px" }}
                >
                  <Table.Tr
                    style={{
                      fontFamily: "Montserrat",
                      fontWeight: 600,
                      fontSize: "12px",
                      color: "#FFFFFF",
                    }}
                  >
                    <Table.Th style={{ paddingLeft: "16px" }}>
                      Order ID
                    </Table.Th>
                    <Table.Th>Order Date</Table.Th>
                    <Table.Th>Total Products</Table.Th>
                    <Table.Th>Total Price</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order, index) => (
                      <Table.Tr
                        key={`${order.orderId}-${index}`}
                        style={{ backgroundColor: "#f3fbf2" }}
                      >
                        <Table.Td style={{ paddingLeft: "16px" }}>
                          <Text
                            style={{
                              color: "#000000",
                              fontFamily: "Montserrat",
                              fontSize: "10px",
                              fontWeight: 400,
                            }}
                          >
                            {order.orderId}
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          <Text
                            style={{
                              color: "#000000",
                              fontFamily: "Montserrat",
                              fontSize: "12px",
                            }}
                          >
                            {formatDate(order.orderDate)}
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          <Text
                            style={{
                              color: "#000000",
                              fontFamily: "Montserrat",
                              fontSize: "10px",
                              fontWeight: 600,
                            }}
                          >
                            {order.totalItems}
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          <Text
                            style={{
                              color: "#000000",
                              fontFamily: "Montserrat",
                              fontSize: "10px",
                              fontWeight: 600,
                            }}
                          >
                            {formatCurrency(order.totalAmount)}
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          <Badge
                            variant="light"
                            style={{
                              color: getStatusColor(order.status),
                              fontSize: "10px",
                              backgroundColor: getStatusBgColor(order.status),
                              fontFamily: "Montserrat, sans-serif",
                              fontWeight: 600,
                              borderRadius: "100px",
                              textTransform: "capitalize",
                              height: "24px",
                              lineHeight: "24px",
                              padding: "0 12px",
                            }}
                          >
                            {order.status}
                          </Badge>
                        </Table.Td>
                        <Table.Td>
                          <Group gap="xs">
                            <ActionIcon
                              onClick={() => handleViewOrder(order.orderId)}
                              variant="light"
                              size="lg"
                              radius="xl"
                              style={{
                                backgroundColor: "#D9D9D994",
                                border: "1px solid #0000001F",
                              }}
                            >
                              <img
                                src={View || "/placeholder.svg"}
                                alt="view"
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  opacity: 0.7,
                                }}
                              />
                            </ActionIcon>
                          </Group>
                        </Table.Td>
                      </Table.Tr>
                    ))
                  ) : (
                    <Table.Tr>
                      <Table.Td colSpan={6} style={{ paddingLeft: "16px" }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "32px 0",
                          }}
                        >
                          <img
                            src={NotFound}
                            alt="Not Found"
                            style={{
                              width: "160px",
                              height: "auto",
                              marginBottom: "16px",
                            }}
                          />
                          <Text
                            style={{
                              color: "#0F783B",
                              fontSize: "18px",
                              fontWeight: 600,
                              marginBottom: "8px",
                            }}
                          >
                            No Order History?
                          </Text>
                          <Text
                            style={{
                              color: "#9D9999",
                              fontSize: "14px",
                              textAlign: "center",
                              maxWidth: "300px",
                            }}
                          >
                            Your order history will appear here once you start
                            making purchases.
                          </Text>
                        </div>
                      </Table.Td>
                    </Table.Tr>
                  )}
                </Table.Tbody>
              </Table>
            </div>
          </Box>

          {/* Mobile Card View */}
          <Box hiddenFrom="md">
            {filteredOrders.length > 0 ? (
              <Stack gap={0}>
                {filteredOrders.map((order, index) => (
                  <MobileOrderCard
                    key={`${order.orderId}-${index}`}
                    order={order}
                  />
                ))}
              </Stack>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "32px 0",
                }}
              >
                <img
                  src={NotFound}
                  alt="Not Found"
                  style={{
                    width: "160px",
                    height: "auto",
                    marginBottom: "16px",
                  }}
                />
                <Text
                  style={{
                    color: "#0F783B",
                    fontSize: "18px",
                    fontWeight: 600,
                    marginBottom: "8px",
                  }}
                >
                  No Order History?
                </Text>
                <Text
                  style={{
                    color: "#9D9999",
                    fontSize: "14px",
                    textAlign: "center",
                    maxWidth: "300px",
                  }}
                >
                  Your order history will appear here once you start making
                  purchases.
                </Text>
              </div>
            )}
          </Box>
        </div>
      </div>
    </Container>
  );
};

export default OrderHistory;
