import {
  useSelector,
  // useDispatch
} from "react-redux";
import {
  Table,
  Select,
  Button,
  Group,
  Badge,
  ActionIcon,
  TextInput,
} from "@mantine/core";
import type {
  RootState,
  // AppDispatch
} from "../../store";
import {
  //   setFilters,
  //   applyFilters,
  //   resetFilters,
  selectFilteredOrders,
  selectOrderLoading,
  selectOrderError,
} from "../../store/orderHistorySlice";
import { FaSortDown } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { CgUndo } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import {
  useState,
  // useEffect
} from "react";
// import axios from "axios";
import NotFound from "../../assets/not_found.png";
import View from "../../assets/search-file.png";

const OrderHistory = () => {
  //   const dispatch = useDispatch<AppDispatch>();

  // Redux selectors
  const { filters } = useSelector((state: RootState) => state.orderHistory);
  //   const orders = useSelector(selectFilteredOrders);
  const loading = useSelector(selectOrderLoading);
  const error = useSelector(selectOrderError);

  type Order = {
    id: string;
    orderDate: string;
    totalProducts: number;
    totalPrice: number;
    status: "Shipped" | "Pending" | "Delivered" | "Cancelled";
    currency?: string;
  };

  // All orders data
  const [allOrders, setAllOrders] = useState<Order[]>([
    {
      id: "094328449#PM",
      orderDate: "11/08/2024",
      totalProducts: 3,
      totalPrice: 20000,
      status: "Shipped",
      currency: "PKR",
    },
    {
      id: "094328450#PM",
      orderDate: "12/08/2024",
      totalProducts: 2,
      totalPrice: 3000,
      status: "Pending",
      currency: "PKR",
    },
    {
      id: "094328451#PM",
      orderDate: "13/08/2024",
      totalProducts: 1,
      totalPrice: 5000,
      status: "Delivered",
      currency: "PKR",
    },
    {
      id: "094328452#PM",
      orderDate: "14/08/2024",
      totalProducts: 4,
      totalPrice: 15000,
      status: "Cancelled",
      currency: "PKR",
    },
  ]);

  // Filtered orders for display
  const [orders, setOrders] = useState<Order[]>(allOrders);

  // Local filter states
  const [localFilters, setLocalFilters] = useState({
    searchByProduct: "",
    searchByStatus: "",
    searchById: "",
  });

  const navigate = useNavigate();

  const handleFilterChange = (field: string, value: string) => {
    setLocalFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    let filteredOrders = [...allOrders];

    // Filter by ID
    if (localFilters.searchById.trim()) {
      filteredOrders = filteredOrders.filter((order) =>
        order.id.toLowerCase().includes(localFilters.searchById.toLowerCase())
      );
    }

    // Filter by status
    if (localFilters.searchByStatus) {
      filteredOrders = filteredOrders.filter(
        (order) => order.status === localFilters.searchByStatus
      );
    }

    // Filter by product (this would need to be implemented based on your product data structure)
    if (localFilters.searchByProduct.trim()) {
      // For now, this is a placeholder - you'd need to modify based on your actual product data
      console.log("Filtering by product:", localFilters.searchByProduct);
    }

    setOrders(filteredOrders);
    console.log("Searching with filters:", localFilters);
    console.log("Filtered results:", filteredOrders);
  };

  const handleReset = () => {
    setLocalFilters({
      searchByProduct: "",
      searchByStatus: "",
      searchById: "",
    });
    setOrders(allOrders); // Reset to show all orders
  };

  const handleViewOrder = (orderId: string) => {
    console.log("Viewing order with ID:", orderId);
    // navigate(`/purchase/order/${orderId}`); // TODO: right now using dummy, but for later go for dynamic

    navigate("/purchase/order/1");
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

  //   const inputStyles = {
  //     input: {
  //       paddingBottom: 25,
  //       paddingLeft: 8,
  //       paddingRight: 8,
  //       borderBottom: "2px solid #BFE1C8",
  //       borderRadius: 0,
  //       fontFamily: "Montserrat, sans-serif",
  //       fontSize: 14,
  //       borderTop: "none",
  //       borderLeft: "none",
  //       borderRight: "none",
  //       backgroundColor: "transparent",
  //       textAlign: "left" as const,
  //       height: "40px",
  //       display: "flex",
  //       alignItems: "center",
  //       "::placeholder": {
  //         textAlign: "left" as const,
  //         fontSize: 12,
  //         fontWeight: 600,
  //         color: "#0F783B",
  //         fontFamily: "Montserrat, sans-serif",
  //         lineHeight: "40px", // Match the height for vertical centering
  //       },
  //     },
  //     wrapper: {
  //       position: "relative" as const,
  //     },
  //   };

  //   // Updated select styles for dropdown (status)
  //   const selectStyles = {
  //     input: {
  //       paddingBottom: 25,
  //       paddingLeft: 8,
  //       paddingRight: 36,
  //       borderBottom: "2px solid #BFE1C8",
  //       borderRadius: 0,
  //       fontFamily: "Montserrat, sans-serif",
  //       fontSize: 14,
  //       borderTop: "none",
  //       borderLeft: "none",
  //       borderRight: "none",
  //       backgroundColor: "transparent",
  //       textAlign: "left" as const,
  //       height: "40px",
  //       display: "flex",
  //       alignItems: "center",
  //       lineHeight: "40px", // Vertical centering for text
  //     },
  //     placeholder: {
  //       textAlign: "left" as const,
  //       fontSize: 12,
  //       fontWeight: 600,
  //       color: "#0F783B",
  //       fontFamily: "Montserrat, sans-serif",
  //       lineHeight: "40px", // Match the height for vertical centering
  //     },
  //     wrapper: {
  //       position: "relative" as const,
  //     },
  //   };

  return (
    <div
      style={{
        width: "1043px",
        height: "731px",
        borderRadius: "12px",
        border: "1px solid #0F783B1F",
        backgroundColor: "#FFFFFF",
        overflow: "auto",
      }}
    >
      <div className="p-6 mt-[-65px] mb-25">
        {loading && (
          <div className="mb-4 text-center text-[#0F783B] font-[Montserrat] text-sm">
            Loading orders...
          </div>
        )}

        {error && (
          <div className="mb-4 text-center text-red-600 font-[Montserrat] text-sm">
            {error}
          </div>
        )}

        <div className="p-6">
          {/* Header - Now aligned with the inputs */}
          <div className="mb-8">
            <h1 className="text-[18px] font-bold text-[#BE8B45] font-[Montserrat] pt-[50px]">
              Order History
            </h1>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-4 justify-between">
            <div className="flex flex-wrap gap-4">
              {/* Search by Product - Text Input */}
              <div className="relative w-60">
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
                  className="w-full"
                  styles={inputStyles}
                />
              </div>

              {/* Search by Status - Select with Dropdown */}
              <div className="relative w-60">
                <div className="absolute top-[6px] right-2 z-10 pointer-events-none">
                  <FaSortDown className="text-[#0F783B]" size={12} />
                </div>
                <Select
                  variant="unstyled"
                  placeholder="Search by status"
                  data={["Shipped", "Pending", "Delivered", "Cancelled"]}
                  value={localFilters.searchByStatus}
                  onChange={(value) =>
                    handleFilterChange("searchByStatus", value || "")
                  }
                  className="w-full"
                  clearable
                  rightSectionWidth={0}
                  styles={selectStyles}
                />
              </div>

              {/* Search by ID - Text Input */}
              <div className="relative w-60">
                <TextInput
                  variant="unstyled"
                  placeholder="Search by ID"
                  value={localFilters.searchById}
                  onChange={(event) =>
                    handleFilterChange("searchById", event.currentTarget.value)
                  }
                  className="w-full"
                  styles={inputStyles}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                color="#0F783B"
                variant="filled"
                leftSection={<BsSearch className="w-3 h-3" />}
                className="text-[#FDFDFD]"
                onClick={handleSearch}
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: "500",
                  fontSize: "13px",
                  width: "110px",
                  height: "35px",
                  borderRadius: "100px",
                  border: "1px solid #00000012",
                  gap: "8px",
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
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CgUndo size={20} color="#D63535" />
              </ActionIcon>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block">
            <div className="rounded-[8px] overflow-hidden border border-[#D9D9D9] w-full">
              <Table style={{ tableLayout: "fixed", width: "100%" }}>
                <Table.Thead className="bg-[#0F783B] h-[48px]">
                  <Table.Tr className="font-[Montserrat] font-semibold text-[12px] text-[#FFFFFF]">
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
                  {orders.length > 0 ? (
                    orders.map((order, index) => (
                      <Table.Tr key={`${order.id}-${index}`} bg="#f3fbf2">
                        <Table.Td style={{ paddingLeft: "16px" }}>
                          <span className="text-[#000000] font-[Montserrat] text-[10px] font-normal">
                            {order.id}
                          </span>
                        </Table.Td>
                        <Table.Td>
                          <span className="text-[#000000] font-[Montserrat] text-[12px]">
                            {order.orderDate}
                          </span>
                        </Table.Td>
                        <Table.Td>
                          <span className="text-[#000000] font-[Montserrat] text-[10px] font-semibold">
                            {order.totalProducts}
                          </span>
                        </Table.Td>
                        <Table.Td>
                          <span className="text-[#000000] font-[Montserrat] text-[10px] font-semibold">
                            {order.currency} {order.totalPrice.toLocaleString()}
                          </span>
                        </Table.Td>
                        <Table.Td>
                          <Badge
                            variant="light"
                            styles={{
                              root: {
                                color: getStatusColor(order.status),
                                fontSize: 10,
                                backgroundColor: getStatusBgColor(order.status),
                                fontFamily: "Montserrat, sans-serif",
                                fontWeight: 600,
                                borderRadius: 100,
                                textTransform: "capitalize",
                                height: "24px",
                                lineHeight: "24px",
                                padding: "0 12px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              },
                            }}
                          >
                            {order.status}
                          </Badge>
                        </Table.Td>
                        <Table.Td>
                          <Group gap="xs">
                            <ActionIcon
                              onClick={() => handleViewOrder(order.id)}
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
                                className="w-4 h-4 opacity-70"
                              />
                            </ActionIcon>
                          </Group>
                        </Table.Td>
                      </Table.Tr>
                    ))
                  ) : (
                    <Table.Tr>
                      <Table.Td colSpan={6} style={{ paddingLeft: "16px" }}>
                        <div className="flex flex-col items-center justify-center py-8">
                          <img
                            src={NotFound}
                            alt="Not Found"
                            className="w-40 h-auto mb-4"
                          />
                          <h3 className="text-[#0F783B] text-lg font-semibold mb-2">
                            No Order History?
                          </h3>
                          <p className="text-[#9D9999] text-sm text-center max-w-xs">
                            Your order history will appear here once you start
                            making purchases.
                          </p>
                        </div>
                      </Table.Td>
                    </Table.Tr>
                  )}
                </Table.Tbody>
              </Table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden flex flex-col gap-4">
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <div
                  key={`${order.id}-${index}`}
                  className="border rounded-lg p-4 flex flex-col gap-3 shadow-sm bg-[#f3fbf2]"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                      <h3 className="font-semibold text-sm text-[#000000] font-[Montserrat]">
                        Order ID: {order.id}
                      </h3>
                      <p className="text-xs text-[#666666] font-[Montserrat]">
                        {order.orderDate}
                      </p>
                    </div>
                    <Badge
                      variant="light"
                      styles={{
                        root: {
                          color: getStatusColor(order.status),
                          fontSize: 10,
                          backgroundColor: getStatusBgColor(order.status),
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: 600,
                          borderRadius: 100,
                          textTransform: "capitalize",
                        },
                      }}
                    >
                      {order.status}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <p className="text-xs font-[Montserrat]">
                        <span className="font-medium text-[#666666]">
                          Products:
                        </span>{" "}
                        <span className="font-semibold text-[#000000]">
                          {order.totalProducts}
                        </span>
                      </p>
                      <p className="text-xs font-[Montserrat]">
                        <span className="font-medium text-[#666666]">
                          Total:
                        </span>{" "}
                        <span className="font-semibold text-[#000000]">
                          {order.currency} {order.totalPrice.toLocaleString()}
                        </span>
                      </p>
                    </div>

                    <ActionIcon
                      onClick={() => handleViewOrder(order.id)}
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
                        className="w-4 h-4 opacity-70"
                      />
                    </ActionIcon>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <img
                  src={NotFound}
                  alt="Not Found"
                  className="w-40 h-auto mb-4"
                />
                <h3 className="text-[#0F783B] text-lg font-semibold mb-2">
                  No Order History?
                </h3>
                <p className="text-[#9D9999] text-sm text-center max-w-xs">
                  Your order history will appear here once you start making
                  purchases.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
