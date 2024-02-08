import { Route, Routes } from "react-router-dom";
import { AuthenticationGuard } from "../components/auth0/AuthenticationGuard";
import Home from "../pages/home/Home";
import About from "../pages/About";
import Profile from "../pages/profile/Profile";
import AllProducts from "../pages/all products/AllProducts";
import Cart from "../pages/cart/Cart";
import OrdersHistory from "../pages/profile/OrdersHistory";
import UserOrders from "../pages/profile/UserOrders";
import InvoiceView from "../../InvoiceView";
import Pruebamp from "../pages/mercado pago/Pruebamp";
import SuccesPage from "../pages/mercado pago/SuccessPage";
import PendingPage from "../pages/mercado pago/PendingPage";
import FailurePage from "../pages/mercado pago/FailurePage";
import NotFound from "../pages/notFound/NotFound";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<AllProducts />} />
      <Route path="/cart" element={<Cart />} />
      <Route
        path="/profile"
        element={<AuthenticationGuard component={Profile} />}
      />
      <Route
        path="/orders"
        element={<AuthenticationGuard component={UserOrders} />}
      />
      <Route
        path="/orders/history"
        element={<AuthenticationGuard component={OrdersHistory} />}
      />
      <Route path="/invoice" element={<InvoiceView />} />
      <Route path="/mp" element={<Pruebamp />} />
      <Route
        path="/success"
        element={<AuthenticationGuard component={SuccesPage} />}
      />
      <Route
        path="/pending"
        element={<AuthenticationGuard component={PendingPage} />}
      />
      <Route
        path="/failure"
        element={<AuthenticationGuard component={FailurePage} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PublicRoutes;
