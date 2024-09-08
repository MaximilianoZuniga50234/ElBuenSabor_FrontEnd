import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import NotFound from "../pages/notFound/NotFound";
import PublicRoutes from "./PublicRoutes";
import EmployeeRoutes from "./EmployeeRoutes";
import AdminRoutes from "./AdminRoutes";
import Error from "../pages/error/Error";
import CallbackPage from "../components/auth0/CallbackPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/u/*" element={<PublicRoutes />} />
      <Route path="/e/*" element={<EmployeeRoutes />} />
      <Route path="/a/*" element={<AdminRoutes />} />
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="/error" element={<Error />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
