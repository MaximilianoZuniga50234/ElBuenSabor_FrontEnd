import { Route, Routes } from "react-router-dom";
import Employees from "../pages/employees/Employees";
import Customers from "../pages/customers/Customers";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/employees" element={<Employees />} />
      <Route path="/customers" element={<Customers />} />
    </Routes>
  );
};

export default AdminRoutes;
