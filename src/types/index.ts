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

export interface AppState {
  user: User;
  products: Product[];
}
