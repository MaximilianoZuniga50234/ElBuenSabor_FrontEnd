import { useState, useEffect, Suspense, lazy } from "react";
import { FaPlus } from "react-icons/fa6";
import { getAllStock } from "../../../functions/StockAPI";
import { Stock } from "../../../interfaces/Stock";
import { useStore as useUser } from "../../../store/CurrentUserStore";
import Loader from "../../../components/loader/Loader";
import "./lowStock.css";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";

const NoPermissions = lazy(
  () => import("../../../components/noPermissions/NoPermissions")
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

export default function LowStock() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [stocksUpdated, setStocksUpdated] = useState(false);
  const [stocks, setStocks] = useState<Stock[]>([STOCK_INITIAL_STATE]);
  const [stock, setStock] = useState<Stock>(STOCK_INITIAL_STATE);

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
      const stocksResponse = await getAllStock();
      const filterStocks = stocksResponse.filter(
        (stock: Stock) =>
          stock.minimumStock >= stock.currentStock ||
          stock.currentStock < stock.minimumStock + stock.minimumStock * 0.2
      );
      setStocks(filterStocks);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (stocksUpdated) {
      getStocks();
      setStocksUpdated(false);
    }
  }, [stocksUpdated]);

  useEffect(() => {
    getStocks();
  }, []);

  const handleRegisterPurchase = (stock: Stock) => {
    setStock(stock);
    handleOpenModalStockPurchase();
  };

  return (
    user?.role &&
    (user?.role === "Administrador" || user?.role === "Cocinero" ? (
      <Suspense fallback={<Loader />}>
        <div className="lowStockPage__container">
          {stocks &&
            !isLoading &&
            (stocks.length > 0 && stocks[0].id != 0 ? (
              <>
                <div className="lowStockPage__table">
                  <div className="lowStockPage__header">
                      <h2 className="lowStockPage__title">
                        Ingredientes con bajo stock
                      </h2>
                  </div>

                  <div className="lowStockPage__labels">
                    <h4>NOMBRE</h4>
                    <h4>UNIDAD DE MEDIDA</h4>
                    <h4>STOCK MÍNIMO</h4>
                    <h4>STOCK ACTUAL</h4>
                    <h4>DIFERENCIA DE STOCK</h4>
                    <h4>REGISTRAR COMPRA</h4>
                  </div>

                  <div className="lowStockPage__rows__container">
                    {elementosPaginaActual.map((stock: Stock) => (
                      <div className="lowStockPage__row" key={stock.id}>
                        <h4 className="lowStockPage__h4">
                          {stock.denomination}
                        </h4>
                        <h4 className="lowStockPage__h4">
                          {stock.measurementUnit.name}
                        </h4>
                        <h4 className="lowStockPage__h4">
                          {stock.minimumStock}
                        </h4>
                        <h4 className="lowStockPage__h4">
                          {Number.isInteger(stock.currentStock)
                            ? stock.currentStock
                            : stock.currentStock.toPrecision(4)}
                        </h4>
                        <h4 className="lowStockPage__h4">
                          {Number.isInteger(
                            Math.abs(stock.currentStock - stock.minimumStock)
                          )
                            ? Math.abs(stock.currentStock - stock.minimumStock)
                            : Math.abs(
                                stock.currentStock - stock.minimumStock
                              ).toPrecision(4)}
                        </h4>
                        <div className="lowStockPage__icon">
                          <button
                            className="lowStockPage__button lowStockPage__button--icon"
                            onClick={() => {
                              handleRegisterPurchase(stock);
                            }}
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lowStockPage__footer">
                  <div className="lowStockPage__footer__pagination__info">
                    {indiceInicio} - {indiceFin} de {stocks.length}
                  </div>
                  <div className="lowStockPage__footer__pagination__actions">
                    {stocks.length > 10 && paginaActual > 1 && (
                      <HiOutlineChevronDoubleLeft
                        className="lowStockPage__footer__pagination__arrow"
                        onClick={() => handleChangePage(0)}
                      />
                    )}
                    {stocks.length > 10 && paginaActual > 1 && (
                      <HiOutlineChevronLeft
                        className="lowStockPage__footer__pagination__arrow"
                        onClick={() => handleChangePage(-1)}
                      />
                    )}
                    {stocks.length > 10 &&
                      paginaActual !== Math.ceil(stocks.length / 10) && (
                        <HiOutlineChevronRight
                          className="lowStockPage__footer__pagination__arrow"
                          onClick={() => handleChangePage(1)}
                        />
                      )}
                    {stocks.length > 10 &&
                      paginaActual !== Math.ceil(stocks.length / 10) && (
                        <HiOutlineChevronDoubleRight
                          className="lowStockPage__footer__pagination__arrow"
                          onClick={() => handleChangePage(2)}
                        />
                      )}
                  </div>
                </div>
                <ModalStockPurchase
                  stock={stock}
                  isOpen={openModalStockPurchase}
                  handleClose={handleCloseModalStockPurchase}
                  setStocksUpdated={setStocksUpdated}
                ></ModalStockPurchase>
              </>
            ) : (
              <h1 className="lowStockPage__h1__noResults">
                No hay ingredientes con bajo stock
              </h1>
            ))}
        </div>
      </Suspense>
    ) : (
      <>
        <NoPermissions />
      </>
    ))
  );
}
