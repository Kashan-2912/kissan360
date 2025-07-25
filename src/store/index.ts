import { configureStore } from "@reduxjs/toolkit"
import productReducer from "./sellProductSlice"
import { userSlice } from "./userSlice"
import { productTableSlice } from "./sellProductSlice"
import orderHistoryReducer from './orderHistorySlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    user: userSlice.reducer,
    productTable: productTableSlice.reducer,
    orderHistory: orderHistoryReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
