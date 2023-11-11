import { Route, Routes } from "react-router-dom";
import { AuthenticationGuard } from "../components/auth0/AuthenticationGuard";
import Customers from "../pages/customers/Customers";
import ItemProductABM from "../pages/abm/itemProduct/ItemProductABM";
import ItemStockABM from "../pages/abm/itemStock/ItemStockABM";
import MeasurementUnitABM from "../pages/abm/measurementUnit/MeasurementUnitABM";

const EmployeeRoutes = () => {
  return (
    <Routes>
      <Route path="/customers" element={<Customers />} />
      <Route
        path="/itemProductABM"
        element={<AuthenticationGuard component={ItemProductABM} />}
      />
      <Route
        path="/itemStockABM"
        element={<AuthenticationGuard component={ItemStockABM} />}
      />
      <Route
        path="/measurementUnitABM"
        element={<AuthenticationGuard component={MeasurementUnitABM} />}
      />
    </Routes>
  );
};

export default EmployeeRoutes;
