import { Route } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import AddNewProduct from "../pages/sell/AddNewProduct";
import SellDashboard from "../pages/sell/SellDashboard";
import ProductPage from "../pages/sell/ProductPage";
import UpdatePage from "../pages/sell/UpdatePage";

export const SellRoutes = (
  <Route path="/sell" element={<DashboardLayout />}>
    <Route index element={<SellDashboard />} />
    <Route path="/sell/add-new" element={<AddNewProduct />} />
    <Route path="/sell/product/:id" element={<ProductPage />} />
    <Route path="/sell/update-product/:id" element={<UpdatePage />} />
  </Route>
);
