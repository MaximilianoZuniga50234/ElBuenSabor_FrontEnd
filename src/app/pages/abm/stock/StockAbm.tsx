import { useState, useEffect, Suspense, lazy } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { Stock } from "../../../interfaces/Stock";
import { getAllStock } from "../../../functions/StockAPI";
import { useStore as useUser } from "../../../store/CurrentUserStore";
import Loader from "../../../components/loader/Loader";
import "./stockAbm.css";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";

const NoPermissions = lazy(
  () => import("../../../components/noPermissions/NoPermissions")
);
const ModalStock = lazy(
  () => import("../../../components/modalStock/ModalStock")
);
const ModalStockPurchase = lazy(
  () => import("../../../components/modalStock/ModalStockPurchase")
);

export default function StockAbm() {
  const { user } = useUser();
  const [openModalStock, setOpenModalStock] = useState(false);
  const handleOpenModalStock = () => setOpenModalStock(true);
  const handleCloseModalStock = () => setOpenModalStock(false);
  const [isNew, setIsNew] = useState(true);
  const [openModalStockPurchase, setOpenModalStockPurchase] = useState(false);
  const handleOpenModalStockPurchase = () => setOpenModalStockPurchase(true);
  const handleCloseModalStockPurchase = () => setOpenModalStockPurchase(false);

  const stockInitialState: Stock = {
    id: 0,
    denomination: "",
    purchasePrice: 0,
    salePrice: 0,
    currentStock: 0,
    minimumStock: 0,
    isStock: true,
    active: true,
    measurementUnit: {
      id: 0,
      name: "",
      active: true,
      abbreviation: "",
    },
    itemStock: { id: 0, name: "", active: true, father: undefined },
  };

  const [stocks, setStocks] = useState<Stock[]>([stockInitialState]);

  const [stock, setStock] = useState<Stock>(stockInitialState);

  const [paginaActual, setPaginaActual] = useState<number>(1);
  const indiceInicio = (paginaActual - 1) * 10;
  const indiceFin =
    stocks.length < paginaActual * 10
      ? stocks.length
      : paginaActual * 10;

  const elementosPaginaActual = stocks.slice(indiceInicio, indiceFin);

  const handleChangePage = (n: number) => {
    n === 0
      ? setPaginaActual(1)
      : n === 2
      ? setPaginaActual(Math.ceil(stocks.length / 10))
      : setPaginaActual(paginaActual + n);
  };

  const getStocks = async () => {
    const response = await getAllStock();
    setStocks(response);
  };

  useEffect(() => {
    getStocks();
  }, []);

  const handleAdd = () => {
    setStock(stockInitialState);
    handleOpenModalStock();
    setIsNew(true);
  };

  const handleModify = (stockParam: Stock) => {
    setStock(stockParam);
    handleOpenModalStock();
    setIsNew(false);
  };

  const handleRegisterPurchase = () => {
    setStock(stockInitialState);
    handleOpenModalStockPurchase();
  };

  return (
    user?.role &&
    (user?.role === "Administrador" || user?.role === "Cocinero" ? (
      <Suspense fallback={<Loader />}>
        <div className="stockAbm__container">
          <div className="stockAbm__table">
            <div className="stockAbm__header">
              <div className="stockAbm__title">
                <h1 className="stockAbm__h1">Ingredientes</h1>
              </div>

              <div className="stockAbm__buttons__container">
                <button
                  className="stockAbm__button stockAbm__button--header"
                  onClick={handleRegisterPurchase}
                >
                  Registrar compra
                </button>

                <button
                  className="stockAbm__button stockAbm__button--header"
                  onClick={handleAdd}
                >
                  Añadir nuevo ingrediente
                </button>
              </div>
            </div>

            <div className="stockAbm__labels">
              <h3 className="stockAbm__h3">Nombre</h3>
              <h3 className="stockAbm__h3">Rubro</h3>
              <h3 className="stockAbm__h3">Costo</h3>
              <h3 className="stockAbm__h3">Stock mínimo</h3>
              <h3 className="stockAbm__h3">Stock actual</h3>
              <h3 className="stockAbm__h3">Unidad de medida</h3>
              <h3 className="stockAbm__h3">Estado</h3>
              <h3 className="stockAbm__h3">Modificar</h3>
            </div>

            <div className="stockAbm__rows__container">
              {elementosPaginaActual.map((stock: Stock) => (
                <div className="stockAbm__row" key={stock.id}>
                  <h4 className="stockAbm__h4">{stock.denomination}</h4>
                  <h4 className="stockAbm__h4">{stock.itemStock?.name}</h4>
                  <h4 className="stockAbm__h4">{stock.purchasePrice}</h4>
                  <h4 className="stockAbm__h4">{stock.minimumStock}</h4>
                  <h4 className="stockAbm__h4">
                    {stock.currentStock.toPrecision(4)}
                  </h4>
                  <h4 className="stockAbm__h4">{stock.measurementUnit.name}</h4>
                  <h4 className="stockAbm__h4">
                    {stock.active === true ? "De alta" : "De baja"}
                  </h4>
                  <div className="stockAbm__icon">
                    <button
                      className="stockAbm__button stockAbm__button--icon"
                      onClick={() => {
                        handleModify(stock);
                      }}
                    >
                      <FaPencilAlt />
                    </button>
                  </div>
                  <div className="stockAbm__icon"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="stocksABM__footer">
            <div className="stocksABM__footer__pagination__info">
              {indiceInicio} - {indiceFin} de {stocks.length}
            </div>
            <div className="stocksABM__footer__pagination__actions">
              {stocks.length > 10 && paginaActual > 1 && (
                <HiOutlineChevronDoubleLeft
                  className="stocksABM__footer__pagination__arrow"
                  onClick={() => handleChangePage(0)}
                />
              )}
              {stocks.length > 10 && paginaActual > 1 && (
                <HiOutlineChevronLeft
                  className="stocksABM__footer__pagination__arrow"
                  onClick={() => handleChangePage(-1)}
                />
              )}
              {stocks.length > 10 &&
                paginaActual !== Math.ceil(stocks.length / 10) && (
                  <HiOutlineChevronRight
                    className="stocksABM__footer__pagination__arrow"
                    onClick={() => handleChangePage(1)}
                  />
                )}
              {stocks.length > 10 &&
                paginaActual !== Math.ceil(stocks.length / 10) && (
                  <HiOutlineChevronDoubleRight
                    className="stocksABM__footer__pagination__arrow"
                    onClick={() => handleChangePage(2)}
                  />
                )}
            </div>
          </div>
          <ModalStock
            stock={stock}
            setStock={setStock}
            isOpen={openModalStock}
            handleClose={handleCloseModalStock}
            isNew={isNew}
          ></ModalStock>

          <ModalStockPurchase
            stock={stock}
            setStock={setStock}
            isOpen={openModalStockPurchase}
            handleClose={handleCloseModalStockPurchase}
          ></ModalStockPurchase>
        </div>
      </Suspense>
    ) : (
      <>
        <NoPermissions />
      </>
    ))
  );
}
