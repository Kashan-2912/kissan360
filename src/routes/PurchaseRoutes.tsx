import { Route } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import PurchaseProducts from "../pages/purchase/PurchaseProducts";
import SinglePurchaseProduct from "../pages/purchase/SinglePurchaseProduct";
import CheckoutPage from "../pages/purchase/CheckoutPage";
import OrderHistory from "../pages/purchase/OrderHistory";

export const PurchaseRoutes = (
  <Route path="/purchase" element={<DashboardLayout />}>
    <Route index element={<PurchaseProducts />} />
    <Route path="/purchase/product" element={<SinglePurchaseProduct />} />
    <Route path="/purchase/product/checkout" element={<CheckoutPage />} />
    <Route path="/purchase/history" element={<OrderHistory />} />
  </Route>
);
