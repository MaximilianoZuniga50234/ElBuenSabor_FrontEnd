import { Route, Routes } from "react-router-dom";
import { AuthenticationGuard } from "../components/auth0/AuthenticationGuard";
import Employees from "../pages/employees/Employees";
import Customers from "../pages/customers/Customers";

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
    </Routes>
  );
};

export default AdminRoutes;
