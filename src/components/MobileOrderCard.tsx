import {
  Group,
  Badge,
  ActionIcon,
  Paper,
  Text,
  Image,
  Stack,
  Flex,
  Box,
} from "@mantine/core";
import type { OrderDetails } from "../types";

import View from "../assets/search-file.png";
import { useNavigate } from "react-router-dom";
import { LuCalendarDays } from "react-icons/lu";
import { Package } from "lucide-react";

const MobileOrderCard = ({ order }: { order: OrderDetails }) => {
  // Get the first product for display (assuming there's at least one)
  const firstProduct = order.orderedProducts[0];

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

  const navigate = useNavigate();

  const handleViewOrder = (orderId: string) => {
    console.log("Viewing order with ID:", orderId);
    navigate(`/purchase/order/${orderId}`);
  };

  const formatCurrency = (amount: number) => {
    return `PKR ${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // Format as DD/MM/YYYY
  };

  return (
    <Paper
      style={{
        backgroundColor: "#DFDFDF66",
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "12px",
      }}
    >
      <Flex align="flex-start" gap={16}>
        {/* Product Image */}

        {/* Order Details */}
        <Stack gap={8} style={{ flex: 1 }}>
          {/* ID and Product Name */}
          <Stack gap={2}>
            <Text
            component="div"
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#000000",
                fontFamily: "Montserrat",
                marginBottom: "4px",
              }}
            >
              <span className="flex items-center gap-[10px]">
                ID
                <Badge
                  className="text-[#149658] font-semibold font-[Montserrat] text-[10px] leading-[100%] tracking-normal"
                  style={{
                    backgroundColor: "#F3FBF2",
                    height: "24px",
                    border: "1px solid #0F783B1A",
                    borderRadius: "12px",
                    color: "#149658",
                  }}
                >
                  {order.orderId}
                </Badge>
              </span>
            </Text>

            <Text
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "black",
                fontFamily: "Montserrat",
                // marginBottom: "4px",
              }}
            >
              {firstProduct?.name || "Product Name"}
            </Text>
          </Stack>

          {/* Quantity and Total Price */}
          <Group gap={16}>
            <Text
              style={{
                fontSize: "10px",
                fontWeight: 400,
                color: "#666666",
                fontFamily: "Montserrat",
              }}
            >
              Quantity:{" "}
              <span className="font-[Montserrat] text-[10px] font-medium text-[#BE8B45]">
                {order.totalItems} bag{order.totalItems > 1 ? "s" : ""}
              </span>
            </Text>
          </Group>

          <Text
            style={{
              fontSize: "12px",
              fontWeight: 400,
              color: "#757575",
              fontFamily: "Montserrat",
            }}
          >
            Total Price:{" "}
            <span className="text-[#202020] text-[12px] font-semibold">
              {formatCurrency(order.totalAmount)}
            </span>
          </Text>

          {/* Date, Status, and Action */}
          <Flex
            align="center"
            justify="space-between"
            style={{ marginTop: "8px" }}
          >
            <Group gap={12}>
              {/* Date with Calendar Icon */}
              <Group gap={4}>
                <Box
                  style={{
                    width: "16px",
                    height: "16px",
                    backgroundColor: "#E8E8E8",
                    borderRadius: "2px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* <Text style={{ fontSize: '8px', color: '#666' }}>📅</Text> */}
                  <LuCalendarDays color="#757575" />
                </Box>
              </Group>

              <Stack gap={0}>
                <Text
                  style={{
                    fontSize: "8px",
                    fontWeight: 400,
                    color: "#757575",
                    fontFamily: "Montserrat",
                  }}
                >
                  Order Date
                </Text>

                <Text
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "black",
                    fontFamily: "Montserrat",
                    // colorScheme: "linear-gradient(to right, #13783C, #38BE17)",
                  }}
                >
                  <span className="bg-[linear-gradient(117.72deg,_#13783C_-0.33%,_#38BE17_94.99%)] bg-clip-text text-transparent">
                    {formatDate(order.orderDate)}
                  </span>
                </Text>
              </Stack>

              {/* Status Badge */}
              <Group gap={4}>
                <Box
                  style={{
                    width: "16px",
                    height: "16px",
                    backgroundColor: "#E8E8E8",
                    borderRadius: "2px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* <Text style={{ fontSize: "8px", color: "#666" }}>📋</Text> */}
                  <Package color="#757575" />
                </Box>
              </Group>

              <Stack gap={0}>
                <Text
                  style={{
                    fontSize: "8px",
                    fontWeight: 400,
                    color: "#757575",
                    fontFamily: "Montserrat",
                  }}
                >
                  Status
                </Text>

                <Text
                  style={{
                    backgroundColor: getStatusBgColor(order.status),
                    color: getStatusColor(order.status),
                    fontSize: "10px",
                    fontWeight: 600,
                    fontFamily: "Montserrat",
                    borderRadius: "12px",
                    textTransform: "capitalize",
                    // padding: "4px 8px",
                    height: "auto",
                  }}
                >
                  {order.status}
                </Text>
              </Stack>
            </Group>

            {/* View Action Icon */}
          </Flex>
        </Stack>
        <Stack
          style={{
            alignItems: "center",
          }}
        >
          <Paper
            style={{
              width: "105px",
              height: "105px",
              backgroundColor: "white",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0px 4px 20px 0px #00000033",
            }}
          >
            <Image
              src={firstProduct?.image || "/placeholder.svg"}
              alt={firstProduct?.name || "Product"}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
          </Paper>
          <ActionIcon
            onClick={() => handleViewOrder(order.orderId)}
            variant="light"
            size="md"
            radius="xl"
            style={{
              backgroundColor: "#D9D9D994",
              border: "1px solid #0000001F",
            }}
          >
            <img
              src={View || "/placeholder.svg"}
              alt="view"
              style={{ width: "16px", height: "16px", opacity: 0.7 }}
            />
          </ActionIcon>
        </Stack>
      </Flex>
    </Paper>
  );
};

export default MobileOrderCard;
