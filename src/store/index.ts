import { configureStore } from "@reduxjs/toolkit"
// import { productSlice } from "./productSlice"
import productReducer from "./productSlice"
import { userSlice } from "./userSlice"
import { productTableSlice } from "./productTableSlice"
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
