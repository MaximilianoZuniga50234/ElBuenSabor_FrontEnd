import { Route, Routes } from "react-router-dom";
import Test from "../components/test/Test";
import Landing from "../components/landing/Landing";
import Home from "../components/home/Home";
import AllProducts from "../components/allproducts/AllProducts";
import CustomerList from "../components/abm/CustomerList";
import ItemProductList from "../components/abm/ItemProductList";
import ItemStockList from "../components/abm/itemstocklist/ItemStockList";
import ProductList from "../components/abm/ProductList";
import StockList from "../components/abm/StockList";
import WorkerList from "../components/abm/WorkerList";
import UnidadMedidaList from "../components/abm/unidadMedida/UnidadMedidaList";
import ItemStockListElementAdd from "../components/abm/itemstocklist/ItemStockListElementForm";
import ItemUnidadMedidaListElementAdd from "../components/abm/unidadMedida/ItemUnidadMedidaElementForm";

export const Rutas = () => {
  return (
    <>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/allProducts" element={<AllProducts />} />
        <Route path="*" element={<h1>Ups...</h1>} />
        <Route path="/customerList" element={<CustomerList />} />
        <Route path="/itemProductList" element={<ItemProductList />} />
        <Route path="/itemStockList" element={<ItemStockList />} />
        <Route
          path="/itemStockList-add"
          element={<ItemStockListElementAdd />}
        />
        <Route
          path="/itemStockList-edit/:id"
          element={<ItemStockListElementAdd />}
        />
        <Route path="/productList" element={<ProductList />} />
        <Route path="/stockList" element={<StockList />} />
        <Route path="/workerList" element={<WorkerList />} />
        <Route path="/itemUnidadMedidaList" element={<UnidadMedidaList />} />
        <Route
          path="/itemUnidadMedida-add"
          element={<ItemUnidadMedidaListElementAdd />}
        />
        <Route
          path="/itemUnidadMedidaList-edit/:id"
          element={<ItemUnidadMedidaListElementAdd />}
        />
      </Routes>
    </>
  );
};
