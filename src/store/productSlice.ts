import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Product } from "../types"
import type { RootState } from "../store"

interface ProductState {
  products: Product[]
  loading: boolean
}

const initialState: ProductState = {
  products: [],
  loading: false,
}

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload)
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      )
      if (index !== -1) {
        state.products[index] = action.payload
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const { addProduct, updateProduct, setLoading } = productSlice.actions
export default productSlice.reducer

export const selectProductById = (state: RootState, id: string) =>
  state.products.products.find((product) => product.id === id)