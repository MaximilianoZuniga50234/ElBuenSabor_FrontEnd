import { Route, Routes } from "react-router-dom";
import { AuthenticationGuard } from "../components/auth0/AuthenticationGuard";
import Employees from "../pages/employees/Employees";
import Customers from "../pages/customers/Customers";
import ProductsRanking from "../pages/ranking/products/ProductsRanking";
import CustomersRanking from "../pages/ranking/customers/CustomersRanking";
import MonetaryMovements from "../pages/monetary movements/MonetaryMovements";

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
      <Route
        path="/customersRanking"
        element={<AuthenticationGuard component={CustomersRanking} />}
      />
      <Route
        path="/monetaryMovements"
        element={<AuthenticationGuard component={MonetaryMovements} />}
      />
    </Routes>
  );
};

export default AdminRoutes;
