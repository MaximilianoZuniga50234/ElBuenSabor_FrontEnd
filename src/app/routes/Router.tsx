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
      <Route path="/callback" element={<CallbackPage />} />
    </Routes>
  );
};

export default Router;
