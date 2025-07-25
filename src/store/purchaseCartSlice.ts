import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartState, CartItem, PurchaseProduct } from '../types/index';

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: PurchaseProduct; quantity: number }>) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice = existingItem.quantity * parseFloat(product.price.replace(/[^\d]/g, ''));
      } else {
        const newItem: CartItem = {
          id: product.id,
          product,
          quantity,
          totalPrice: quantity * parseFloat(product.price.replace(/[^\d]/g, '')),
        };
        state.items.push(newItem);
      }
      
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
    },
    
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
    },
    
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item && quantity > 0) {
        item.quantity = quantity;
        item.totalPrice = quantity * parseFloat(item.product.price.replace(/[^\d]/g, ''));
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
      }
    },
    
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    
    closeCart: (state) => {
      state.isOpen = false;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, toggleCart, closeCart } = cartSlice.actions;
export default cartSlice.reducer;