// import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
// import type { PurchaseProduct, PurchasedProductState } from '../types/index';

// // export interface PurchaseProduct {
// //   id: number;
// //   name: string;
// //   price: string;
// //   image: string;
// //   category: "All" | "Fertilizers" | "Pesticides" | "Weed";
// //   description: string;
// //   rating?: number;
// //   reviews?: number;
// //   inStock?: boolean;
// //   addToCart?: boolean;
// // }

// // export interface PurchasedProductState {
// //   products: PurchaseProduct[];
// //   carouselProducts: PurchaseProduct[];
// //   gridProducts: PurchaseProduct[];
// //   selectedProduct: PurchaseProduct | null;
// //   activeCategory: "All" | "Fertilizers" | "Pesticides" | "Weed";
// //   loading: boolean;
// //   error: string | null;
// // }

// const initialState: PurchasedProductState = {
//   products: [],
//   carouselProducts: [],
//   gridProducts: [],
//   selectedProduct: null,
//   activeCategory: "Fertilizers",
//   loading: false,
//   error: null,
// };

// // Async thunks for API calls
// export const fetchPurchaseProducts = createAsyncThunk(
//   'purchaseProducts/fetchAll',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetch('/api/purchase-products');
//       if (!response.ok) {
//         throw new Error('Failed to fetch products');
//       }
//       const data = await response.json();
//       return data as PurchaseProduct[];
//     } catch (error) {
//       return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
//     }
//   }
// );

// export const fetchProductById = createAsyncThunk(
//   'purchaseProducts/fetchById',
//   async (productId: number, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`/api/purchase-products/${productId}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch product');
//       }
//       const data = await response.json();
//       return data as PurchaseProduct;
//     } catch (error) {
//       return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
//     }
//   }
// );

// export const searchProducts = createAsyncThunk(
//   'purchaseProducts/search',
//   async (searchTerm: string, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`/api/purchase-products/search?q=${encodeURIComponent(searchTerm)}`);
//       if (!response.ok) {
//         throw new Error('Failed to search products');
//       }
//       const data = await response.json();
//       return data as PurchaseProduct[];
//     } catch (error) {
//       return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
//     }
//   }
// );

// const purchaseProductSlice = createSlice({
//   name: 'purchaseProducts',
//   initialState,
//   reducers: {
//     setActiveCategory: (state, action: PayloadAction<"All" | "Fertilizers" | "Pesticides" | "Weed">) => {
//       state.category = action.payload;
//     },
//     setSelectedProduct: (state, action: PayloadAction<PurchaseProduct | null>) => {
//       state.selectedProduct = action.payload;
//     },
//     updateProductStock: (state, action: PayloadAction<{ productId: number; inStock: boolean }>) => {
//       const { productId, inStock } = action.payload;
      
//       // Update in all product arrays
//       const updateProduct = (product: PurchaseProduct) => {
//         if (product.id === productId) {
//           product.inStock = inStock;
//         }
//       };
      
//       state.products.forEach(updateProduct);
//       state.carouselProducts.forEach(updateProduct);
//       state.gridProducts.forEach(updateProduct);
      
//       if (state.selectedProduct?.id === productId) {
//         state.selectedProduct.inStock = inStock;
//       }
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//     addProduct: (state, action: PayloadAction<PurchaseProduct>) => {
//       state.products.push(action.payload);
//       // Also add to appropriate category arrays based on product category
//       if (action.payload.category === "Fertilizers") {
//         state.gridProducts.push(action.payload);
//       }
//     },
//     updateProduct: (state, action: PayloadAction<PurchaseProduct>) => {
//       const updatedProduct = action.payload;
      
//       // Update in all arrays
//       const updateInArray = (array: PurchaseProduct[]) => {
//         const index = array.findIndex(p => p.id === updatedProduct.id);
//         if (index !== -1) {
//           array[index] = updatedProduct;
//         }
//       };
      
//       updateInArray(state.products);
//       updateInArray(state.carouselProducts);
//       updateInArray(state.gridProducts);
      
//       if (state.selectedProduct?.id === updatedProduct.id) {
//         state.selectedProduct = updatedProduct;
//       }
//     },
//     removeProduct: (state, action: PayloadAction<number>) => {
//       const productId = action.payload;
      
//       state.products = state.products.filter(p => p.id !== productId);
//       state.carouselProducts = state.carouselProducts.filter(p => p.id !== productId);
//       state.gridProducts = state.gridProducts.filter(p => p.id !== productId);
      
//       if (state.selectedProduct?.id === productId) {
//         state.selectedProduct = null;
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch all products
//       .addCase(fetchPurchaseProducts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchPurchaseProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.products = action.payload;
        
//         // Separate products into carousel and grid based on your logic
//         // You can modify this logic based on your requirements
//         state.carouselProducts = action.payload.slice(0, 5); // First 5 for carousel
//         state.gridProducts = action.payload; // All for grid
//       })
//       .addCase(fetchPurchaseProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
      
//       // Fetch product by ID
//       .addCase(fetchProductById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchProductById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.selectedProduct = action.payload;
//       })
//       .addCase(fetchProductById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
      
//       // Search products
//       .addCase(searchProducts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(searchProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.gridProducts = action.payload;
//       })
//       .addCase(searchProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const {
//   setActiveCategory,
//   setSelectedProduct,
//   updateProductStock,
//   clearError,
//   addProduct,
//   updateProduct,
//   removeProduct,
// } = purchaseProductSlice.actions;

// export default purchaseProductSlice.reducer;

// // Selectors
// export const selectAllPurchaseProducts = (state: { purchaseProducts: PurchasedProductState }) => 
//   state.purchaseProducts.products;

// export const selectCarouselProducts = (state: { purchaseProducts: PurchasedProductState }) => 
//   state.purchaseProducts.carouselProducts;

// export const selectGridProducts = (state: { purchaseProducts: PurchasedProductState }) => 
//   state.purchaseProducts.gridProducts;

// export const selectFilteredGridProducts = (state: { purchaseProducts: PurchasedProductState }) => {
//   const { gridProducts, activeCategory } = state.purchaseProducts;
//   if (activeCategory === "All") {
//     return gridProducts;
//   }
//   return gridProducts.filter(product => product.category === activeCategory);
// };

// export const selectSelectedProduct = (state: { purchaseProducts: PurchasedProductState }) => 
//   state.purchaseProducts.selectedProduct;

// export const selectActiveCategory = (state: { purchaseProducts: PurchasedProductState }) => 
//   state.purchaseProducts.activeCategory;

// export const selectPurchaseProductsLoading = (state: { purchaseProducts: PurchasedProductState }) => 
//   state.purchaseProducts.loading;

// export const selectPurchaseProductsError = (state: { purchaseProducts: PurchasedProductState }) => 
//   state.purchaseProducts.error;

// export const selectProductById = (state: { purchaseProducts: PurchasedProductState }, productId: number) =>
//   state.purchaseProducts.products.find(product => product.id === productId);