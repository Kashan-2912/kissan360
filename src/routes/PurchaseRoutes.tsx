import { Route } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import PurchaseProducts from "../pages/purchase/PurchaseProducts";
import SinglePurchaseProduct from "../pages/purchase/SinglePurchaseProduct";

export const PurchaseRoutes = (
  <Route path="/purchase" element={<DashboardLayout />}>
    <Route index element={<PurchaseProducts />} />
    <Route path="/purchase/product" element={<SinglePurchaseProduct />} />
  </Route>
);
