import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import NotFound from "../pages/NotFound";
import PublicRoutes from "./PublicRoutes";
import EmployeeRoutes from "./EmployeeRoutes";
import AdminRoutes from "./AdminRoutes";
import Error from "../pages/Error";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/u/*" element={<PublicRoutes />} />
      <Route path="/e/*" element={<EmployeeRoutes />} />
      <Route path="/a/*" element={<AdminRoutes />} />
      <Route path="/error" element={<Error />} />
    </Routes>
  );
};

export default Router;
