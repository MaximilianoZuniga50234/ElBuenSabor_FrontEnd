import { Route, Routes } from "react-router-dom";
import { AuthenticationGuard } from "../components/auth0/AuthenticationGuard";
import Home from "../pages/home/Home";
import About from "../pages/About";
import Profile from "../pages/profile/Profile";
import AllProducts from "../pages/all products/AllProducts";
import Cart from "../pages/cart/Cart";
import OrdersHistory from "../pages/profile/OrdersHistory";
import UserOrders from "../pages/profile/UserOrders";

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
    </Routes>
  );
};

export default PublicRoutes;
