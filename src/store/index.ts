import { configureStore } from "@reduxjs/toolkit"
import productReducer from "./sellProductSlice"
import purchaseProductReduer from "./purchaseProductSlice"
import { userSlice } from "./userSlice"
import { productTableSlice } from "./sellProductSlice"
import orderHistoryReducer from './orderHistorySlice';
import cartReducer from "./cartSlice"

export const store = configureStore({
  reducer: {
    products: productReducer,
    purchaseProducts: purchaseProductReduer,
    user: userSlice.reducer,
    productTable: productTableSlice.reducer,
    orderHistory: orderHistoryReducer,
    cart: cartReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
