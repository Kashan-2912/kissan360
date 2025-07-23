import { Route } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import AddNewProduct from "../pages/sell/AddNewProduct";
import SellDashboard from "../pages/sell/SellDashboard";
import ProductPage from "../pages/sell/ProductPage";
import UpdatePage from "../pages/sell/UpdatePage";

export const SellRoutes = (
  <Route path="/" element={<DashboardLayout />}>
    <Route index element={<SellDashboard />} handle={{ title: "My Products" }} />
    <Route path="add-new" element={<AddNewProduct />} handle={{ title: "New Product" }} />
    <Route path="product/:id" element={<ProductPage />} handle={{ title: "My Product" }} />
    <Route path="update-product/:id" element={<UpdatePage />} handle={{ title: "Update Product" }} />
  </Route>
);
