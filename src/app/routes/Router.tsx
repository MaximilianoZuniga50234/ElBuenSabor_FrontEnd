import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Error from "../pages/Error";
import About from "../pages/About";
import Employees from "../pages/employees/Employees";
import Customers from "../pages/customers/Customers";
import Profile from "../pages/profile/Profile";
import Categories from "../pages/categories/Categories";
import CallbackPage from "../components/auth0/CallbackPage";
import { AuthenticationGuard } from "../components/auth0/AuthenticationGuard";
import NotFound from "../pages/NotFound";

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
      <Route path="/categories" element={<Categories />} />
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="/error" element={<Error />} />
    </Routes>
  );
};

export default Router;
