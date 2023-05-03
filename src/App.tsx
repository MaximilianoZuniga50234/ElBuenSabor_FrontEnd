import { Route, Routes } from "react-router-dom";
import { AllProducts } from "./components/AllProducts/AllProducts";
import Landing from "./components/Landing/Landing";
import { NavBarPreLogin } from "./components/NavBar/PreLogin/NavBarPreLogin";
import { NavBarPostLoginUsuarios } from "./components/NavBar/PostLoginUsuarios/NavBarPostLoginUsuarios";
import { NavBarPostLoginEmpleados } from "./components/NavBar/PostLoginEmpleados/NavBarPostLoginEmpleados";
import { useAuth0 } from "@auth0/auth0-react";
import CustomerList from "./components/abm/CustomerList";
import ItemProductList from "./components/abm/ItemProductList";
import ItemStockList from "./components/abm/ItemStockList";
import ProductList from "./components/abm/ProductList";
import StockList from "./components/abm/StockList";
import WorkerList from "./components/abm/WorkerList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setStock } from "./context/stockSlice";
import { setArticuloManufacturado } from "./context/articuloManufacturadoSlice";

import Test from "./components/test/Test";

function App() {
  const { isAuthenticated } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("./data.json")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setStock(data.categorias));
        dispatch(setArticuloManufacturado(data.articulosManufacturados));
      });
  }, []);

  return (
    <div className="App">
      {isAuthenticated ? <NavBarPostLoginUsuarios /> : <NavBarPreLogin />}
      <Routes>
        <Route path="/test" element={<Test />} />

        <Route path="/" element={<Landing />} />
        <Route path="/allProducts" element={<AllProducts />} />
        <Route path="*" element={<h1>Ups...</h1>} />
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
