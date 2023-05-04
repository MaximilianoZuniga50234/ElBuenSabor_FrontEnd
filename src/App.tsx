import { Route, Routes } from "react-router-dom";
import AllProducts from "./components/allproducts/AllProducts";
import Landing from "./components/landing/Landing";
import NavBarPreLogin from "./components/navbar/prelogin/NavBarPreLogin";
import NavBarPostLoginUsuarios from "./components/navbar/postloginusuarios/NavBarPostLoginUsuarios";
import NavBarPostLoginEmpleados from "./components/navbar/postloginempleados/NavBarPostLoginEmpleados";
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
import Home from "./components/home/Home";
import { setUnidadMedida } from "./context/UnidadMedidaSlice";
import UnidadMedidaList from "./components/abm/UnidadMedidaList";
import { Rutas } from "./Rutas";

function App() {
  const { isAuthenticated } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("./data.json")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setStock(data.categorias));
        dispatch(setArticuloManufacturado(data.articulosManufacturados));
        dispatch(setUnidadMedida(data.unidadMedida));
      });
  }, []);

  return (
    <div className="App">
      {isAuthenticated ? <NavBarPostLoginUsuarios /> : <NavBarPreLogin />}
      <Rutas />
    </div>
  );
}

export default App;
