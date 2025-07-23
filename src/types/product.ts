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
