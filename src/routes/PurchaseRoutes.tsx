import { Route } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import PurchaseProducts from "../pages/purchase/PurchaseProducts";
import SinglePurchaseProduct from "../pages/purchase/SinglePurchaseProduct";
import CheckoutPage from "../pages/purchase/CheckoutPage";
import OrderHistory from "../pages/purchase/OrderHistory";
import ViewOrderDetails from "../pages/purchase/ViewOrderDetails";

export const PurchaseRoutes = (
  <Route path="/purchase" element={<DashboardLayout />}>
    <Route index element={<PurchaseProducts />} />
    <Route path="/purchase/product/:productId" element={<SinglePurchaseProduct />} />
    <Route path="/purchase/checkout" element={<CheckoutPage />} />
    <Route path="/purchase/history" element={<OrderHistory />} />
    <Route path="/purchase/order/1" element={<ViewOrderDetails />} />
  </Route>
);
