import { Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import Home from "../pages/Home";
import Error from "../pages/Error";
import About from "../pages/About";
import Employees from "../pages/employees/Employees";
import Customers from "../pages/customers/Customers";
import Profile from "../pages/profile/Profile";
import Categories from "../pages/categories/Categories";
import CallbackPage from "../components/auth0/CallbackPage";
import { AuthenticationGuard } from "../components/auth0/AuthenticationGuard";
import AllProducts from "../pages/all products/AllProducts";
import ItemStockABM from "../pages/abm/itemStock/ItemStockABM";
import ItemProductABM from "../pages/abm/itemProduct/ItemProductABM";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="*" element={<Error />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<AuthenticationGuard component={About} />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/products" element={<AllProducts />} />
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="/itemProductABM" element={<AuthenticationGuard component={ItemProductABM} />} />
    </Routes>
  );
};

export default Router;
