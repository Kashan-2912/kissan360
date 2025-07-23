import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Order {
  id: string;
  orderDate: string;
  totalProducts: number;
  totalPrice: number;
  status: "Shipped" | "Pending" | "Delivered" | "Cancelled";
  currency?: string;
  customerName?: string;
  customerEmail?: string;
  shippingAddress?: string;
  products?: Array<{
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }>;
  createdAt?: string;
  updatedAt?: string;
}

interface OrderHistoryFilters {
  searchByProduct: string;
  searchByStatus: string;
  searchById: string;
}

interface OrderHistoryState {
  orders: Order[];
  filteredOrders: Order[];
  filters: OrderHistoryFilters;
  loading: boolean;
  error: string | null;
  selectedOrder: Order | null;
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
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
      state.filteredOrders = action.payload;
      state.error = null;
    },

    // Add new order
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload); // Add to beginning for latest first
      state.filteredOrders = state.orders;
    },

    // Update order status
    updateOrderStatus: (state, action: PayloadAction<{ id: string; status: Order["status"] }>) => {
      const { id, status } = action.payload;
      const orderIndex = state.orders.findIndex((order) => order.id === id);
      if (orderIndex !== -1) {
        state.orders[orderIndex].status = status;
        state.orders[orderIndex].updatedAt = new Date().toISOString();
      }
      // Update filtered orders as well
      const filteredIndex = state.filteredOrders.findIndex((order) => order.id === id);
      if (filteredIndex !== -1) {
        state.filteredOrders[filteredIndex].status = status;
        state.filteredOrders[filteredIndex].updatedAt = new Date().toISOString();
      }
    },

    // Delete order (if needed for admin functionality)
    deleteOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter((order) => order.id !== action.payload);
      state.filteredOrders = state.filteredOrders.filter((order) => order.id !== action.payload);
    },

    // Set selected order for detailed view
    setSelectedOrder: (state, action: PayloadAction<Order | null>) => {
      state.selectedOrder = action.payload;
    },

    // Set filters
    setFilters: (state, action: PayloadAction<Partial<OrderHistoryFilters>>) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },

    // Apply filters to orders
    applyFilters: (state) => {
      let filtered = [...state.orders];

      // Filter by order ID
      if (state.filters.searchById.trim()) {
        filtered = filtered.filter((order) =>
          order.id.toLowerCase().includes(state.filters.searchById.toLowerCase())
        );
      }

      // Filter by status
      if (state.filters.searchByStatus.trim()) {
        filtered = filtered.filter((order) =>
          order.status.toLowerCase() === state.filters.searchByStatus.toLowerCase()
        );
      }

      // Filter by product (search in order products if available)
      if (state.filters.searchByProduct.trim()) {
        filtered = filtered.filter((order) => {
          if (order.products && order.products.length > 0) {
            return order.products.some((product) =>
              product.productName.toLowerCase().includes(state.filters.searchByProduct.toLowerCase())
            );
          }
          return false;
        });
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

    // Clear all data (for logout or reset)
    clearOrderHistory: (state) => {
      return initialState;
    },

    // Sort orders by date (newest first or oldest first)
    sortOrdersByDate: (state, action: PayloadAction<"asc" | "desc">) => {
      const sortOrder = action.payload;
      const sortedOrders = [...state.filteredOrders].sort((a, b) => {
        const dateA = new Date(a.orderDate).getTime();
        const dateB = new Date(b.orderDate).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
      state.filteredOrders = sortedOrders;
    },

    // Sort orders by total price
    sortOrdersByPrice: (state, action: PayloadAction<"asc" | "desc">) => {
      const sortOrder = action.payload;
      const sortedOrders = [...state.filteredOrders].sort((a, b) => {
        return sortOrder === "asc" ? a.totalPrice - b.totalPrice : b.totalPrice - a.totalPrice;
      });
      state.filteredOrders = sortedOrders;
    },

    // Get orders by status
    filterByStatus: (state, action: PayloadAction<Order["status"] | "all">) => {
      if (action.payload === "all") {
        state.filteredOrders = state.orders;
      } else {
        state.filteredOrders = state.orders.filter((order) => order.status === action.payload);
      }
    },

    // Get orders by date range
    filterByDateRange: (state, action: PayloadAction<{ startDate: string; endDate: string }>) => {
      const { startDate, endDate } = action.payload;
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();
      
      state.filteredOrders = state.orders.filter((order) => {
        const orderDate = new Date(order.orderDate).getTime();
        return orderDate >= start && orderDate <= end;
      });
    },
  },
});

export const {
  setLoading,
  setError,
  setOrders,
  addOrder,
  updateOrderStatus,
  deleteOrder,
  setSelectedOrder,
  setFilters,
  applyFilters,
  resetFilters,
  clearOrderHistory,
  sortOrdersByDate,
  sortOrdersByPrice,
  filterByStatus,
  filterByDateRange,
} = orderHistorySlice.actions;

export default orderHistorySlice.reducer;

// Selectors
export const selectOrders = (state: { orderHistory: OrderHistoryState }) => state.orderHistory.orders;
export const selectFilteredOrders = (state: { orderHistory: OrderHistoryState }) => state.orderHistory.filteredOrders;
export const selectOrderFilters = (state: { orderHistory: OrderHistoryState }) => state.orderHistory.filters;
export const selectOrderLoading = (state: { orderHistory: OrderHistoryState }) => state.orderHistory.loading;
export const selectOrderError = (state: { orderHistory: OrderHistoryState }) => state.orderHistory.error;
export const selectSelectedOrder = (state: { orderHistory: OrderHistoryState }) => state.orderHistory.selectedOrder;

// Additional utility selectors
export const selectOrdersByStatus = (status: Order["status"]) => 
  (state: { orderHistory: OrderHistoryState }) => 
    state.orderHistory.orders.filter(order => order.status === status);

export const selectOrdersCount = (state: { orderHistory: OrderHistoryState }) => state.orderHistory.orders.length;
export const selectFilteredOrdersCount = (state: { orderHistory: OrderHistoryState }) => state.orderHistory.filteredOrders.length;

export const selectTotalRevenue = (state: { orderHistory: OrderHistoryState }) => 
  state.orderHistory.orders
    .filter(order => order.status === "Delivered")
    .reduce((total, order) => total + order.totalPrice, 0);

export const selectPendingOrdersCount = (state: { orderHistory: OrderHistoryState }) => 
  state.orderHistory.orders.filter(order => order.status === "Pending").length;