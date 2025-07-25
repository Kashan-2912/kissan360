import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, CartState } from "../types/index";

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
  isOpen: false,
};

// Helper function to calculate totals
const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);
  return { totalItems, totalAmount };
};

// Helper function to parse price string (e.g., "PKR 1,200/kg" -> 1200)
const parsePriceString = (priceString: string): number => {
  const match = priceString.match(/[\d,]+/);
  if (match) {
    return parseInt(match[0].replace(/,/g, ""), 10);
  }
  return 0;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        // Update existing item
        existingItem.quantity += quantity;
        existingItem.totalPrice =
          existingItem.quantity * parsePriceString(existingItem.product.price);
      } else {
        // Add new item
        const newItem: CartItem = {
          id: Date.now(),
          quantity,
          product,
          totalPrice: quantity * parsePriceString(product.price),
        };
        state.items.push(newItem);
      }

      // Recalculate totals
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalAmount = totals.totalAmount;
    },

    removeProductFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.product.id !== productId);

      // Recalculate totals
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalAmount = totals.totalAmount;
    },

    updateProductQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.product.id === productId);

      if (item && quantity > 0) {
        item.quantity = quantity;
        item.totalPrice = quantity * parsePriceString(item.product.price);

        // Recalculate totals
        const totals = calculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalAmount = totals.totalAmount;
      } else if (item && quantity <= 0) {
        // Remove item if quantity is 0 or negative
        state.items = state.items.filter(
          (cartItem) => cartItem.product.id !== productId
        );

        // Recalculate totals
        const totals = calculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalAmount = totals.totalAmount;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

    openCart: (state) => {
      state.isOpen = true;
    },

    closeCart: (state) => {
      state.isOpen = false;
    },

    incrementQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const item = state.items.find((item) => item.product.id === productId);

      if (item) {
        item.quantity += 1;
        item.totalPrice = item.quantity * parsePriceString(item.product.price);

        // Recalculate totals
        const totals = calculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalAmount = totals.totalAmount;
      }
    },

    decrementQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const item = state.items.find((item) => item.product.id === productId);

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          item.totalPrice =
            item.quantity * parsePriceString(item.product.price);
        } else {
          // Remove item if quantity becomes 0
          state.items = state.items.filter(
            (cartItem) => cartItem.product.id !== productId
          );
        }

        // Recalculate totals
        const totals = calculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalAmount = totals.totalAmount;
      }
    },

    // For checkout process
    applyDiscount: (
      state,
      action: PayloadAction<{ code: string; amount: number }>
    ) => {
      // This could be extended to handle discount codes
      const { amount } = action.payload;
      state.totalAmount = Math.max(0, state.totalAmount - amount);
    },

    // Initialize cart from localStorage or API
    initializeCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalAmount = totals.totalAmount;
    },
  },
});

export const {
  addToCart,
  removeProductFromCart,
  updateProductQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
  incrementQuantity,
  decrementQuantity,
  applyDiscount,
  initializeCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

export const selectCartTotalItems = (state: { cart: CartState }) =>
  state.cart.totalItems;

export const selectCartTotalAmount = (state: { cart: CartState }) =>
  state.cart.totalAmount;

export const selectCartIsOpen = (state: { cart: CartState }) =>
  state.cart.isOpen;

export const selectCartItemByProductId = (
  state: { cart: CartState },
  productId: number
) => state.cart.items.find((item) => item.product.id === productId);

export const selectCartItemById = (
  state: { cart: CartState },
  cartItemId: number
) => state.cart.items.find((item) => item.id === cartItemId);

export const selectIsProductInCart = (
  state: { cart: CartState },
  productId: number
) => state.cart.items.some((item) => item.product.id === productId);

export const selectCartItemsCount = (state: { cart: CartState }) =>
  state.cart.items.length;

// Format price for display
export const formatPrice = (amount: number): string => {
  return `PKR ${amount.toLocaleString()}`;
};

// Get formatted total
export const selectFormattedCartTotal = (state: { cart: CartState }) =>
  formatPrice(state.cart.totalAmount);
