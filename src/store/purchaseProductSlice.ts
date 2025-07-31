import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { PurchaseProduct, PurchasedProductState } from "../types/index";
import f1 from "../assets/f1.png";
import f2 from "../assets/f2.png";
import f3 from "../assets/f3.png";
import f4 from "../assets/f4.png";
import f5 from "../assets/f5.png";

const initialState: PurchasedProductState = {
  products: [],
  loading: false,
  error: null,
};

// Async thunks for API calls
export const fetchPurchaseProducts = createAsyncThunk(
  "purchaseProducts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/purchase-products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      return data as PurchaseProduct[];
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "purchaseProducts/fetchById",
  async (productId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/purchase-products/${productId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      const data = await response.json();
      return data as PurchaseProduct;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const searchProducts = createAsyncThunk(
  "purchaseProducts/search",
  async (searchTerm: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/purchase-products/search?q=${encodeURIComponent(searchTerm)}`
      );
      if (!response.ok) {
        throw new Error("Failed to search products");
      }
      const data = await response.json();
      return data as PurchaseProduct[];
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

const purchaseProductSlice = createSlice({
  name: "purchaseProducts",
  initialState,
  reducers: {
    // no server to try out fetching, so using dummy fn:
    addDummyProducts: (state) => {
      const dummyProducts: PurchaseProduct[] = [
        {
          id: 1,
          name: "Urea Fertilizer",
          category: "Fertilizers",
          inStock: true,
          addToCart: false,
          rating: 4.5,
          reviews: 12,
          price: "1200",
          image: f1,
          description: "Product with ID 1Product with ID 1Product with ID 1Product with ID 1Product with ID 1Product with ID 1Product with ID 1Product with ID 1Product with ID 1Product with ID 1Product with ID 1Product with ID 1Product with ID 1Product with ID 1Product with ID 1Product with ID 1Product with ID 1Product with ID 1Product with ID 1Product with ID 1Product with ID 1Product with ID 1Product with ID 1Product with ID 1Product with ID 1Product with ID 1",
        },
        {
          id: 2,
          name: "Weed Killer Max",
          category: "Weed",
          inStock: true,
          addToCart: false,
          rating: 4.0,
          reviews: 8,
          price: "700",
          image: f2,
          description: "Product with ID 2Product with ID 2Product with ID 2Product with ID 2Product with ID 2Product with ID 2Product with ID 2Product with ID 2Product with ID 2vvProduct with ID 2Product with ID 2Product with ID 2Product with ID 2Product with ID 2Product with ID 2Product with ID 2Product with ID 2Product with ID 2Product with ID 2Product with ID 2Product with ID 2Product with ID 2Product with ID 2Product with ID 2Product with ID 2Product with ID 2Product with ID 2Product with ID 2Product with ID 2Product with ID 2Product with ID 2",
        },
        {
          id: 3,
          name: "Nitrophos",
          category: "Fertilizers",
          inStock: false,
          addToCart: false,
          rating: 2.5,
          reviews: 4,
          price: "5969",
          image: f3,
          description: "Product with ID 3Product with ID 3Product with ID 3Product with ID 3Product with ID 3Product with ID 3Product with ID 3Product with ID 3Product with ID 3vvProduct with ID 3Product with ID 3Product with ID 3Product with ID 3Product with ID 3Product with ID 3Product with ID 3Product with ID 3Product with ID 3Product with ID 3Product with ID 3Product with ID 3Product with ID 3Product with ID 3Product with ID 3Product with ID 3Product with ID 3Product with ID 3Product with ID 3Product with ID 3Product with ID 3Product with ID 3",
        },
        {
          id: 4,
          name: "Weed Killer",
          category: "Pesticides",
          inStock: false,
          addToCart: false,
          rating: 1.0,
          reviews: 8,
          price: "699",
          image: f4,
          description: "Product with ID 4Product with ID 4Product with ID 4Product with ID 4Product with ID 4Product with ID 4Product with ID 4Product with ID 4Product with ID 4vvProduct with ID 4Product with ID 4Product with ID 4Product with ID 4Product with ID 4Product with ID 4Product with ID 4Product with ID 4Product with ID 4Product with ID 4Product with ID 4Product with ID 4Product with ID 4Product with ID 4Product with ID 4Product with ID 4Product with ID 4Product with ID 4Product with ID 4Product with ID 4Product with ID 4Product with ID 4",
        },
        {
          id: 5,
          name: "Weed Killer Max",
          category: "Weed",
          inStock: true,
          addToCart: false,
          rating: 5.0,
          reviews: 8,
          price: "1499",
          image: f5,
          description: "Product with ID 5Product with ID 5Product with ID 5Product with ID 5Product with ID 5Product with ID 5Product with ID 5Product with ID 5Product with ID 5vvProduct with ID 5Product with ID 5Product with ID 5Product with ID 5Product with ID 5Product with ID 5Product with ID 5Product with ID 5Product with ID 5Product with ID 5Product with ID 5Product with ID 5Product with ID 5Product with ID 5Product with ID 5Product with ID 5Product with ID 5Product with ID 5Product with ID 5Product with ID 5Product with ID 5Product with ID 5",
        },
        {
          id: 6,
          name: "Weed Killer Max",
          category: "Weed",
          inStock: true,
          addToCart: false,
          rating: 4.5,
          reviews: 8,
          price: "989",
          image: f3,
          description: "Product with ID 6Product with ID 6Product with ID 6Product with ID 6Product with ID 6Product with ID 6Product with ID 6Product with ID 6Product with ID 6vvProduct with ID 6Product with ID 6Product with ID 6Product with ID 6Product with ID 6Product with ID 6Product with ID 6Product with ID 6Product with ID 6Product with ID 6Product with ID 6Product with ID 6Product with ID 6Product with ID 6Product with ID 6Product with ID 6Product with ID 6Product with ID 6Product with ID 6Product with ID 6Product with ID 6Product with ID 6",
        },
        {
          id: 7,
          name: "Famous Weed",
          category: "Weed",
          inStock: true,
          addToCart: false,
          rating: 4.0,
          reviews: 19,
          price: "399",
          image: f2,
          description: "Product with ID 7Product with ID 7Product with ID 7Product with ID 7Product with ID 7Product with ID 7Product with ID 7Product with ID 7Product with ID 7vvProduct with ID 7Product with ID 7Product with ID 7Product with ID 7Product with ID 7Product with ID 7Product with ID 7Product with ID 7Product with ID 7Product with ID 7Product with ID 7Product with ID 7Product with ID 7Product with ID 7Product with ID 7Product with ID 7Product with ID 7Product with ID 7Product with ID 7Product with ID 7Product with ID 7Product with ID 7",
        },
        {
          id: 8,
          name: "New Gen Pesticides",
          category: "Pesticides",
          inStock: true,
          addToCart: false,
          rating: 3.0,
          reviews: 0,
          price: "199",
          image: f4,
          description: "Product with ID 8Product with ID 8Product with ID 8Product with ID 8Product with ID 8Product with ID 8Product with ID 8Product with ID 8Product with ID 8vvProduct with ID 8Product with ID 8Product with ID 8Product with ID 8Product with ID 8Product with ID 8Product with ID 8Product with ID 8Product with ID 8Product with ID 8Product with ID 8Product with ID 8Product with ID 8Product with ID 8Product with ID 8Product with ID 8Product with ID 8Product with ID 8Product with ID 8Product with ID 8Product with ID 8Product with ID 8",
        },
      ];

      state.products = dummyProducts;
    },

    updateProductStock: (
      state,
      action: PayloadAction<{ productId: number; inStock: boolean }>
    ) => {
      const { productId, inStock } = action.payload;

      // Update in products array
      const product = state.products.find((p) => p.id === productId);
      if (product) {
        product.inStock = inStock;
      }
    },
    updateProductCartStatus: (
      state,
      action: PayloadAction<{ productId: number; addToCart: boolean }>
    ) => {
      const { productId, addToCart } = action.payload;

      // Update in products array
      const product = state.products.find((p) => p.id === productId);
      if (product) {
        product.addToCart = addToCart;
      }
    },
    updateProductRating: (
      state,
      action: PayloadAction<{
        productId: number;
        rating: number;
        reviews?: number;
      }>
    ) => {
      const { productId, rating, reviews } = action.payload;

      // Update in products array
      const product = state.products.find((p) => p.id === productId);
      if (product) {
        product.rating = rating;
        if (reviews !== undefined) {
          product.reviews = reviews;
        }
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    addProduct: (state, action: PayloadAction<PurchaseProduct>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<PurchaseProduct>) => {
      const updatedProduct = action.payload;
      const index = state.products.findIndex((p) => p.id === updatedProduct.id);

      if (index !== -1) {
        state.products[index] = updatedProduct;
      }
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.products = state.products.filter((p) => p.id !== productId);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchPurchaseProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPurchaseProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchPurchaseProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        // Update or add the product to the products array
        const existingIndex = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        if (existingIndex !== -1) {
          state.products[existingIndex] = action.payload;
        } else {
          state.products.push(action.payload);
        }
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Search products
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  addDummyProducts,
  updateProductStock,
  updateProductCartStatus,
  updateProductRating,
  clearError,
  addProduct,
  updateProduct,
  removeProduct,
} = purchaseProductSlice.actions;

export default purchaseProductSlice.reducer;

// Selectors
export const selectAllPurchaseProducts = (state: {
  purchaseProducts: PurchasedProductState;
}) => state.purchaseProducts.products;

export const selectCarouselProducts = (state: {
  purchaseProducts: PurchasedProductState;
}) => {
  // Return first 5 products or newest products for carousel
  return state.purchaseProducts.products;
};

export const selectPurchaseProductsLoading = (state: {
  purchaseProducts: PurchasedProductState;
}) => state.purchaseProducts.loading;

export const selectPurchaseProductsError = (state: {
  purchaseProducts: PurchasedProductState;
}) => state.purchaseProducts.error;

export const selectProductById = (
  state: { purchaseProducts: PurchasedProductState },
  productId: number
) =>
  state.purchaseProducts.products.find((product) => product.id === productId);

// Additional selector for products by category
export const selectProductsByCategory = (
  state: { purchaseProducts: PurchasedProductState },
  category: "Fertilizers" | "Pesticides" | "Weed"
) => {
  return state.purchaseProducts.products.filter(
    (product) => product.category === category
  );
};

// Selector for products by category including "All"
export const selectProductsByCategoryWithAll = (
  state: { purchaseProducts: PurchasedProductState },
  category: "All" | "Fertilizers" | "Pesticides" | "Weed"
) => {
  if (category === "All") {
    return state.purchaseProducts.products;
  }
  return state.purchaseProducts.products.filter(
    (product) => product.category === category
  );
};

// Selector for in-stock products only
export const selectInStockProducts = (state: {
  purchaseProducts: PurchasedProductState;
}) =>
  state.purchaseProducts.products.filter(
    (product) => product.inStock !== false
  );

// Selector for products that can be added to cart
export const selectCartableProducts = (state: {
  purchaseProducts: PurchasedProductState;
}) =>
  state.purchaseProducts.products.filter(
    (product) => product.inStock !== false && product.addToCart !== false
  );

// Selector for products with ratings
export const selectRatedProducts = (state: {
  purchaseProducts: PurchasedProductState;
}) =>
  state.purchaseProducts.products.filter(
    (product) => product.rating !== undefined && product.rating > 0
  );

// Selector for products by price range
export const selectProductsByPriceRange = (
  state: { purchaseProducts: PurchasedProductState },
  minPrice: number,
  maxPrice: number
) => {
  return state.purchaseProducts.products.filter((product) => {
    const price = parseFloat(product.price);
    return price >= minPrice && price <= maxPrice;
  });
};
