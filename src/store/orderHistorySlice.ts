import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, OrderDetails } from "../types";

interface OrderHistoryFilters {
  searchByProduct: string;
  searchByStatus: string;
  searchById: string;
}

interface OrderHistoryState {
  orders: OrderDetails[];
  filteredOrders: OrderDetails[];
  filters: OrderHistoryFilters;
  loading: boolean;
  error: string | null;
  selectedOrder: OrderDetails | null;
}

const initialState: OrderHistoryState = {
  orders: [],
  filteredOrders: [],
  filters: {
    searchByProduct: "",
    searchByStatus: "",
    searchById: "",
  },
  loading: false,
  error: null,
  selectedOrder: null,
};

const orderHistorySlice = createSlice({
  name: "orderHistory",
  initialState,
  reducers: {
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // Set error state
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Set orders data
    setOrders: (state, action: PayloadAction<OrderDetails[]>) => {
      state.orders = action.payload;
      state.filteredOrders = action.payload;
      state.error = null;
    },

    // Add new order from cart
    addOrderFromCart: (
      state,
      action: PayloadAction<{
        customerInfo: {
          customerName: string;
          customerEmail: string;
          contactNumber: string;
          alternateNumber: string;
          shippingAddress: {
            country: string;
            state: string;
            district: string;
            city: string;
            address: string;
            postalCode: string;
          };
        };
        cartItems: CartItem[];
        totalAmount: number;
        totalItems: number;
      }>
    ) => {
      const { customerInfo, cartItems, totalAmount, totalItems } =
        action.payload;

      const newOrder: OrderDetails = {
        orderId: `ORD-${Date.now()}`,
        ...customerInfo,
        orderDate: new Date().toISOString(),
        status: "Pending",
        orderedProducts: cartItems.map(item => ({
          ...item.product,
          orderId: `ORD-${Date.now()}`,
          quantity: item.quantity,
          unitPrice: parseFloat(item.product.price),
          totalPrice: item.totalPrice,
        })),
        totalItems,
        totalAmount,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      state.orders.unshift(newOrder);
      state.filteredOrders = state.orders;
    },

    // Update order status
    updateOrderStatus: (
      state,
      action: PayloadAction<{
        orderId: string;
        status: OrderDetails["status"];
      }>
    ) => {
      const { orderId, status } = action.payload;
      const orderIndex = state.orders.findIndex(
        (order) => order.orderId === orderId
      );
      if (orderIndex !== -1) {
        state.orders[orderIndex].status = status;
        state.orders[orderIndex].updatedAt = new Date().toISOString();
      }

      const filteredIndex = state.filteredOrders.findIndex(
        (order) => order.orderId === orderId
      );
      if (filteredIndex !== -1) {
        state.filteredOrders[filteredIndex].status = status;
        state.filteredOrders[filteredIndex].updatedAt =
          new Date().toISOString();
      }
    },

    // Set selected order for detailed view
    setSelectedOrder: (state, action: PayloadAction<OrderDetails | null>) => {
      state.selectedOrder = action.payload;
    },

    // Set filters
    setFilters: (
      state,
      action: PayloadAction<Partial<OrderHistoryFilters>>
    ) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },

    // Apply filters to orders
    applyFilters: (state) => {
      let filtered = [...state.orders];

      if (state.filters.searchById.trim()) {
        filtered = filtered.filter((order) =>
          order.orderId
            .toLowerCase()
            .includes(state.filters.searchById.toLowerCase())
        );
      }

      if (state.filters.searchByStatus.trim()) {
        filtered = filtered.filter(
          (order) =>
            order.status.toLowerCase() ===
            state.filters.searchByStatus.toLowerCase()
        );
      }

      if (state.filters.searchByProduct.trim()) {
        filtered = filtered.filter((order) =>
          order.orderedProducts.some((product) =>
            product.name
              .toLowerCase()
              .includes(state.filters.searchByProduct.toLowerCase())
          )
        );
      }

      state.filteredOrders = filtered;
    },

    // Reset all filters
    resetFilters: (state) => {
      state.filters = {
        searchByProduct: "",
        searchByStatus: "",
        searchById: "",
      };
      state.filteredOrders = state.orders;
    },

    // Filter by status
    filterByStatus: (
      state,
      action: PayloadAction<OrderDetails["status"] | "all">
    ) => {
      if (action.payload === "all") {
        state.filteredOrders = state.orders;
      } else {
        state.filteredOrders = state.orders.filter(
          (order) => order.status === action.payload
        );
      }
    },

    // Sort orders by date
    sortOrdersByDate: (state, action: PayloadAction<"asc" | "desc">) => {
      const sortOrder = action.payload;
      const sortedOrders = [...state.filteredOrders].sort((a, b) => {
        const dateA = new Date(a.orderDate).getTime();
        const dateB = new Date(b.orderDate).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
      state.filteredOrders = sortedOrders;
    },

    // Clear all data
    clearOrderHistory: (state) => {
      return initialState;
    },
  },
});

export const {
  setLoading,
  setError,
  setOrders,
  addOrderFromCart,
  updateOrderStatus,
  setSelectedOrder,
  setFilters,
  applyFilters,
  resetFilters,
  filterByStatus,
  sortOrdersByDate,
  clearOrderHistory,
} = orderHistorySlice.actions;

export default orderHistorySlice.reducer;

// Selectors
export const selectOrders = (state: { orderHistory: OrderHistoryState }) =>
  state.orderHistory.orders;

export const selectFilteredOrders = (state: {
  orderHistory: OrderHistoryState;
}) => state.orderHistory.filteredOrders;

export const selectOrderFilters = (state: {
  orderHistory: OrderHistoryState;
}) => state.orderHistory.filters;

export const selectOrderLoading = (state: {
  orderHistory: OrderHistoryState;
}) => state.orderHistory.loading;

export const selectOrderError = (state: { orderHistory: OrderHistoryState }) =>
  state.orderHistory.error;

export const selectSelectedOrder = (state: {
  orderHistory: OrderHistoryState;
}) => state.orderHistory.selectedOrder;

export const selectOrdersByStatus =
  (status: OrderDetails["status"]) =>
  (state: { orderHistory: OrderHistoryState }) =>
    state.orderHistory.orders.filter((order) => order.status === status);

export const selectOrdersCount = (state: { orderHistory: OrderHistoryState }) =>
  state.orderHistory.orders.length;

export const selectFilteredOrdersCount = (state: {
  orderHistory: OrderHistoryState;
}) => state.orderHistory.filteredOrders.length;

export const selectTotalRevenue = (state: {
  orderHistory: OrderHistoryState;
}) =>
  state.orderHistory.orders
    .filter((order) => order.status === "Delivered")
    .reduce((total, order) => total + order.totalAmount, 0);

export const selectPendingOrdersCount = (state: {
  orderHistory: OrderHistoryState;
}) =>
  state.orderHistory.orders.filter((order) => order.status === "Pending")
    .length;
