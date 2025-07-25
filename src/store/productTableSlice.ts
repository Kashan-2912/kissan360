import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { ProductTableItem, ProductFilters } from "../types/index"

interface ProductTableState {
  products: ProductTableItem[]
  filteredProducts: ProductTableItem[]
  filters: ProductFilters
  loading: boolean
}

// const dummyProducts: ProductTableItem[] = [
//   {
//     id: "1",
//     name: "Wheat",
//     category: "Grain",
//     availableQuantity: 15000,
//     unit: "Kg",
//     status: "Submitted",
//     image: "https://th.bing.com/th/id/R.cdf9159d9ee445f75d2857d37b1e48e7?rik=7O542DvXnaYcGQ&pid=ImgRaw&r=0",
//   },
//   {
//     id: "2",
//     name: "Sugar",
//     category: "Grain",
//     availableQuantity: 400,
//     unit: "Kg",
//     status: "Rejected",
//     image: "https://th.bing.com/th/id/R.d27976be2eda3f60bd2dc50aca182cb9?rik=ipQG0gwjgC6A6g&pid=ImgRaw&r=0",
//   },
//   {
//     id: "3",
//     name: "Rice",
//     category: "Grain",
//     availableQuantity: 300,
//     unit: "Kg",
//     status: "Live for sale",
//     image: "https://th.bing.com/th/id/R.4e6654f78bcd50bc3ed83f943986bde4?rik=D2J5oVchmhpcLA&riu=http%3a%2f%2fphotos.demandstudios.com%2fgetty%2farticle%2f110%2f117%2f87515380.jpg&ehk=5y5RdcLIp6zMrfk0HIUovvZTYbLwp8Sx8UX29e%2b%2buCU%3d&risl=&pid=ImgRaw&r=0",
//   },
// ]

const initialState: ProductTableState = {
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
  initialState,
  reducers: {
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
  },
})

export const { setFilters, applyFilters, resetFilters, deleteProduct } = productTableSlice.actions
