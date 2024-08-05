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
import { FaCashRegister, FaPlus } from "react-icons/fa6";

const NoPermissions = lazy(
  () => import("../../../components/noPermissions/NoPermissions")
);
const ModalStock = lazy(
  () => import("../../../components/modalStock/ModalStock")
);
const ModalStockPurchase = lazy(
  () => import("../../../components/modalStock/ModalStockPurchase")
);

const STOCK_INITIAL_STATE = {
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
  imgId: "",
  imgUrl: "",
  type: "stock",
};

export default function StockAbm() {
  const { user } = useUser();

  const [isNew, setIsNew] = useState(true);
  const [stocksUpdated, setStocksUpdated] = useState(false);
  const [stocks, setStocks] = useState<Stock[]>([STOCK_INITIAL_STATE]);
  const [stock, setStock] = useState<Stock>(STOCK_INITIAL_STATE);

  const [openModalStock, setOpenModalStock] = useState(false);
  const handleOpenModalStock = () => setOpenModalStock(true);
  const handleCloseModalStock = () => setOpenModalStock(false);

  const [openModalStockPurchase, setOpenModalStockPurchase] = useState(false);
  const handleOpenModalStockPurchase = () => setOpenModalStockPurchase(true);
  const handleCloseModalStockPurchase = () => setOpenModalStockPurchase(false);

  const [paginaActual, setPaginaActual] = useState<number>(1);
  const indiceInicio = (paginaActual - 1) * 10;
  const indiceFin =
    stocks.length < paginaActual * 10 ? stocks.length : paginaActual * 10;

  const elementosPaginaActual = stocks.slice(indiceInicio, indiceFin);

  const handleChangePage = (n: number) => {
    n === 0
      ? setPaginaActual(1)
      : n === 2
      ? setPaginaActual(Math.ceil(stocks.length / 10))
      : setPaginaActual(paginaActual + n);
  };

  const getStocks = async () => {
    try {
      const response = await getAllStock();
      setStocks(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getStocks();
  }, []);

  useEffect(() => {
    if (stocksUpdated) {
      getStocks();
      setStocksUpdated(false);
    }
  }, [stocksUpdated]);

  const handleAdd = () => {
    setStock(STOCK_INITIAL_STATE);
    setIsNew(true);
    handleOpenModalStock();
  };

  const handleModify = (stockParam: Stock) => {
    setStock(stockParam);
    setIsNew(false);
    handleOpenModalStock();
  };

  const handleRegisterPurchase = () => {
    setStock(STOCK_INITIAL_STATE);
    handleOpenModalStockPurchase();
  };

  return (
    user?.role &&
    (user?.role === "Administrador" || user?.role === "Cocinero" ? (
      <Suspense fallback={<Loader />}>
        <div className="stockAbm__container">
          <div className="stockAbm__table">
            <div className="stockAbm__header">
              <h2 className="stockAbm__title">Ingredientes</h2>

              <div className="stockAbm__buttons__container">
                <button
                  className="stockAbm__button stockAbm__button--header"
                  onClick={handleRegisterPurchase}
                >
                  <FaCashRegister />
                  REGISTRAR COMPRA
                </button>

                <button
                  className="stockAbm__button stockAbm__button--header"
                  onClick={handleAdd}
                >
                  <FaPlus />
                  AÑADIR
                </button>
              </div>
            </div>

            <div className="stockAbm__labels">
              <h4>NOMBRE</h4>
              <h4>RUBRO</h4>
              <h4>COSTO</h4>
              <h4>STOCK MÍNIMO</h4>
              <h4>STOCK ACTUAL</h4>
              <h4>UNIDAD DE MEDIDA</h4>
              <h4>ESTADO</h4>
              <h4>MODIFICAR</h4>
            </div>

            <div className="stockAbm__rows__container">
              {elementosPaginaActual.map((stock: Stock) => (
                <div className="stockAbm__row" key={stock.id}>
                  <h4 className="stockAbm__h4">{stock.denomination}</h4>
                  <h4 className="stockAbm__h4">{stock.itemStock?.name}</h4>
                  <h4 className="stockAbm__h4">{stock.purchasePrice}</h4>
                  <h4 className="stockAbm__h4">{stock.minimumStock}</h4>
                  <h4 className="stockAbm__h4">
                    {Number.isInteger(stock.currentStock)
                      ? stock.currentStock
                      : stock.currentStock.toPrecision(4)}
                  </h4>
                  <h4 className="stockAbm__h4">
                    {stock.measurementUnit?.name}
                  </h4>
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
            isOpen={openModalStock}
            handleClose={handleCloseModalStock}
            isNew={isNew}
            setStocksUpdated={setStocksUpdated}
          ></ModalStock>

          <ModalStockPurchase
            stock={STOCK_INITIAL_STATE}
            isOpen={openModalStockPurchase}
            handleClose={handleCloseModalStockPurchase}
            setStocksUpdated={setStocksUpdated}
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
