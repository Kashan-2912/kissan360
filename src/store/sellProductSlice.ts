import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Product } from "../types"
import type { RootState } from "."
import type { ProductTableItem, ProductFilters } from "../types/index"

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

// till above, were sell products slice

// from below, are the sell product table slice (which is dashboard)

interface ProductTableState {
  products: ProductTableItem[]
  filteredProducts: ProductTableItem[]
  filters: ProductFilters
  loading: boolean
}

const productTableInitialState: ProductTableState = {
  products: [],
  filteredProducts: [],
  filters: {
    searchByName: "",
    searchByStatus: "",
    searchByCategory: "",
  },
  loading: false,
}

export const productTableSlice = createSlice({
  name: "productTable",
  initialState: productTableInitialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductTableItem[]>) => {
      state.products = action.payload
      state.filteredProducts = action.payload
    },
    setFilters: (state, action: PayloadAction<Partial<ProductFilters>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    applyFilters: (state) => {
      state.filteredProducts = state.products.filter((product) => {
        const nameMatch = state.filters.searchByName
          ? product.name.toLowerCase().includes(state.filters.searchByName.toLowerCase())
          : true;

        const statusMatch = state.filters.searchByStatus
          ? product.status.toLowerCase() === state.filters.searchByStatus.toLowerCase()
          : true;

        const categoryMatch = state.filters.searchByCategory
          ? product.category.toLowerCase().includes(state.filters.searchByCategory.toLowerCase())
          : true;

        return nameMatch && statusMatch && categoryMatch;
      });
    },
    resetFilters: (state) => {
      state.filters = {
        searchByName: "",
        searchByStatus: "",
        searchByCategory: "",
      }
      state.filteredProducts = state.products
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((product: { id: string }) => product.id !== action.payload)
      state.filteredProducts = state.filteredProducts.filter((product: { id: string }) => product.id !== action.payload)
    },
    setTableLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const { 
  setProducts, 
  setFilters, 
  applyFilters, 
  resetFilters, 
  deleteProduct, 
  setTableLoading 
} = productTableSlice.actions

export const productTableReducer = productTableSlice.reducer

// Selectors for product table
export const selectProductTableState = (state: RootState) => state.productTable
export const selectFilteredProducts = (state: RootState) => state.productTable.filteredProducts
export const selectProductTableFilters = (state: RootState) => state.productTable.filters
export const selectProductTableLoading = (state: RootState) => state.productTable.loading