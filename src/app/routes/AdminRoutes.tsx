import { Route, Routes } from "react-router-dom";
import { AuthenticationGuard } from "../components/auth0/AuthenticationGuard";
import Employees from "../pages/employees/Employees";
import Customers from "../pages/customers/Customers";
import ProductsRanking from "../pages/products ranking/ProductsRanking";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/employees"
        element={<AuthenticationGuard component={Employees} />}
      />
      <Route
        path="/customers"
        element={<AuthenticationGuard component={Customers} />}
      />
      <Route
        path="/productsRanking"
        element={<AuthenticationGuard component={ProductsRanking} />}
      />
    </Routes>
  );
};

export default AdminRoutes;
