import { useState, useEffect, Suspense, lazy } from "react";
import { FaPlus } from "react-icons/fa6";
import { getAllStock } from "../../../functions/StockAPI";
import { Stock } from "../../../interfaces/Stock";
import { useStore as useUser } from "../../../store/CurrentUserStore";
import Loader from "../../../components/loader/Loader";
import "./lowStock.css";

const NoPermissions = lazy(
  () => import("../../../components/noPermissions/NoPermissions")
);
const ModalStockPurchase = lazy(
  () => import("../../../components/modalStock/ModalStockPurchase")
);

export default function LowStock() {
  const [openModalStockPurchase, setOpenModalStockPurchase] = useState(false);
  const handleOpenModalStockPurchase = () => setOpenModalStockPurchase(true);
  const handleCloseModalStockPurchase = () => setOpenModalStockPurchase(false);
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);

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

  const getStocks = async () => {
    const stocksResponse = await getAllStock();
    const filterStocks = stocksResponse.filter(
      (stock: Stock) =>
        stock.minimumStock > stock.currentStock ||
        stock.currentStock < stock.minimumStock + stock.minimumStock * 0.2
    );
    setStocks(filterStocks);
    setIsLoading(false);
  };

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
                    <div className="lowStockPage__title">
                      <h1 className="lowStockPage__h1">
                        Ingredientes con bajo stock
                      </h1>
                    </div>
                  </div>

                  <div className="lowStockPage__labels">
                    <h3 className="lowStockPage__h3">Nombre del ingrediente</h3>
                    <h3 className="lowStockPage__h3">Unidad de medida</h3>
                    <h3 className="lowStockPage__h3">Stock mínimo</h3>
                    <h3 className="lowStockPage__h3">Stock actual</h3>
                    <h3 className="lowStockPage__h3">Diferencia de stock</h3>
                    <h3 className="lowStockPage__h3">Registrar compra</h3>
                  </div>

                  <div className="lowStockPage__rows__container">
                    {stocks.map((stock: Stock) => (
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
                          {stock.currentStock.toPrecision(4)}
                        </h4>
                        <h4 className="lowStockPage__h4">
                          {Math.abs(
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
                <ModalStockPurchase
                  stock={stock}
                  setStock={setStock}
                  isOpen={openModalStockPurchase}
                  handleClose={handleCloseModalStockPurchase}
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
