import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import About from "../pages/About";
import Profile from "../pages/profile/Profile";
import AllProducts from "../pages/all products/AllProducts";
import Carrousel from "../components/home/carrousel/Carrousel";
import Cart from "../pages/cart/Cart";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/products" element={<AllProducts />} />
      <Route path="/carrousel" element={<Carrousel />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default PublicRoutes;
