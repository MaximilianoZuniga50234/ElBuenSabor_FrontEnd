import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import About from "../pages/About";
import Profile from "../pages/profile/Profile";
import AllProducts from "../pages/all products/AllProducts";
import Carrousel from "../components/home/carrousel/Carrousel";
import Cart from "../pages/cart/Cart";
import UserOrders from "../pages/profile/userOrders";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/products" element={<AllProducts />} />
      <Route path="/products/search/:search" element={<AllProducts />} />
      <Route path="/products/search/cat/:category" element={<AllProducts />} />
      <Route path="/carrousel" element={<Carrousel />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/orders" element={<UserOrders />} />
    </Routes>
  );
};

export default PublicRoutes;
