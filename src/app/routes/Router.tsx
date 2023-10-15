import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Error from "../pages/Error";
import About from "../pages/About";
import Employees from "../pages/employees/Employees";
import Customers from "../pages/customers/Customers";
import Profile from "../pages/profile/Profile";
import CallbackPage from "../components/auth0/CallbackPage";
import { AuthenticationGuard } from "../components/auth0/AuthenticationGuard";
import NotFound from "../pages/NotFound";
import AllProducts from "../pages/all products/AllProducts";
// import ItemStockABM from "../pages/abm/itemStock/ItemStockABM";
import ItemProductABM from "../pages/abm/itemProduct/ItemProductABM";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/home" element={<Home />} />
      <Route
        path="/about"
        element={<AuthenticationGuard component={About} />}
      />
      <Route path="/employees" element={<Employees />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/products" element={<AllProducts />} />
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="/error" element={<Error />} />
      <Route path="/itemProductABM" element={<AuthenticationGuard component={ItemProductABM} />} />
    </Routes>
  );
};

export default Router;
