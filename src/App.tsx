import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./components/home/Home";
import Landing from "./components/landing/Landing";
import { NavBarPreLogin } from "./components/navbar/PreLogin/NavBarPreLogin";
import { NavBarPostLoginUsuarios } from "./components/navbar/PostLoginUsuarios/NavBarPostLoginUsuarios";
import { NavBarPostLoginEmpleados } from "./components/navbar/PostLoginEmpleados/NavBarPostLoginEmpleados";
import { useAuth0 } from "@auth0/auth0-react";
import CustomerList from "./components/abm/customerlist/CustomerList";
import ItemProductList from "./components/abm/itemproductlist/ItemProductList";
import ItemStockList from "./components/abm/itemstocklist/ItemStockList";
import ProductList from "./components/abm/productlist/ProductList";
import StockList from "./components/abm/stocklist/StockList";
import WorkerList from "./components/abm/workerlist/WorkerList";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="App">
      {isAuthenticated ? <NavBarPostLoginUsuarios /> : <NavBarPreLogin />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/customerList" element={<CustomerList />} />
        <Route path="/itemProductList" element={<ItemProductList />} />
        <Route path="/itemStockList" element={<ItemStockList />} />
        <Route path="/productList" element={<ProductList />} />
        <Route path="/stockList" element={<StockList />} />
        <Route path="/workerList" element={<WorkerList />} />
      </Routes>
    </div>
  );
}

export default App;
