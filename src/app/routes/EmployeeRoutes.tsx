import { Route, Routes } from "react-router-dom";
import { AuthenticationGuard } from "../components/auth0/AuthenticationGuard";
import ItemProductABM from "../pages/abm/itemProduct/ItemProductABM";
import ItemStockABM from "../pages/abm/itemStock/ItemStockABM";
import MeasurementUnitABM from "../pages/abm/measurementUnit/MeasurementUnitABM";
import Orders from "../pages/order/Orders";
import LowStock from "../pages/abm/stock/LowStock";
import StockAbm from "../pages/abm/stock/StockAbm";

const EmployeeRoutes = () => {
  return (
    <Routes>
      <Route
        path="/orders"
        element={<AuthenticationGuard component={Orders} />}
      />
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
      <Route
        path="/stockAbm"
        element={<AuthenticationGuard component={StockAbm} />}
      />
      <Route
        path="/lowStock"
        element={<AuthenticationGuard component={LowStock} />}
      />
    </Routes>
  );
};

export default EmployeeRoutes;
