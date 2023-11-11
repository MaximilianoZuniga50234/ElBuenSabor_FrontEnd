import { Route, Routes } from "react-router-dom";
import Employees from "../pages/employees/Employees";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/employees" element={<Employees />} />
    </Routes>
  );
};

export default AdminRoutes;
