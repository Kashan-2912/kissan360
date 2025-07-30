export interface Product {
  id: string;
  productName: string;
  category: string;
  availableQuantity: number | null;
  unit: string | null;
  unitPrice: number | null;
  productLocation: string;
  image: FileList | File[] | null;
  description: string;
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
}

export interface PurchaseProduct {
  id: number;
  name: string;
  price: string;
  image: string;
  category: "All" | "Fertilizers" | "Pesticides" | "Weed";
  description: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  addToCart?: boolean;
}

export interface CartItem {
  // id: number;
  product: PurchaseProduct;
  quantity: number;
  totalPrice: number;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  isOpen: boolean;
}

export interface PurchasedProductState {
  products: PurchaseProduct[];
  loading: boolean;
  error: string | null;
}

export interface ProductTableItem {
  id: string
  name: string
  category: string
  availableQuantity: number
  unit: string
  status: "Submitted" | "Rejected" | "Live for sale"
  image: string
}

export interface ProductFilters {
  searchByName: string
  searchByStatus: string
  searchByCategory: string
}

export interface RootState {
  cart: CartState;
  products: Product[];
  purchasedProducts: PurchasedProductState;
}

export interface AppState {
  user: User;
  products: Product[];
  purchasedProducts: PurchaseProduct[];
  cart: CartItem[];
  cartState: CartState;
}
