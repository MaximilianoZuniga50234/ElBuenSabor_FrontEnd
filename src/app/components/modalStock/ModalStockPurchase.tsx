import { Stock } from "../../interfaces/Stock";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import "./modalStockPurchase.css";
import { Toaster } from "sonner";
import { Box, Fade, Modal } from "@mui/material";
import { getAllStock, updateStock } from "../../functions/StockAPI";
import ModalStock from "./ModalStock";
import { useAuth0 } from "@auth0/auth0-react";

interface ModalStockPurchaseProps {
  isOpen: boolean;
  handleClose: () => void;
  stock: Stock;
  setStock?: Dispatch<SetStateAction<Stock>>;
}

export default function ModalStockPurchase({
  stock,
  setStock,
  isOpen,
  handleClose,
}: ModalStockPurchaseProps) {
  const stockInitialState: Stock = {
    id: 0,
    denomination: "",
    purchasePrice: 0,
    salePrice: 0,
    currentStock: 0,
    minimumStock: 0,
    isStock: true,
    active: true,
    measurementUnit: { id: 0, name: "", active: true },
    itemStock: { id: 0, name: "", active: true, father: undefined },
  };

  const [stocks, setStocks] = useState<Stock[]>([]);
  const [openModalStock, setOpenModalStock] = useState(false);
  const handleOpenModalStock = () => {
    if (setStock) {
      setStock(stockInitialState);
    }
    setOpenModalStock(true);
  };
  const handleCloseModalStock = () => setOpenModalStock(false);
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [tokenState, setTokenState] = useState("");

  const [stockModified, setStockModified] = useState({
    price: 0,
    quantityPurchased: 0,
  });

  const [stockPurchased, setStockPurchased] = useState<Stock>(stock);

  const getToken = async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });
      setTokenState(token);
    } catch (error) {
      console.error(error);
    }
  };

  const getStocks = async () => {
    const response = await getAllStock();
    setStocks(response);
  };

  useEffect(() => {
    if (isAuthenticated) getToken();
    getStocks();
  }, []);

  useEffect(() => {
    if (stock.denomination === "") {
      if (stocks.length > 0) {
        setStockPurchased(stocks[0]);
      }
    } else {
      setStockPurchased(stock);
    }
  }, [stock]);

  useEffect(() => {
    if (stockPurchased) {
      setStockModified({
        ...stockModified,
        price: stockPurchased.purchasePrice,
      });
    }

    if (
      stockPurchased.purchasePrice != 0 &&
      stockPurchased.purchasePrice === stockModified.price
    ) {
      updateStock(stockPurchased, tokenState);
    }
  }, [stockPurchased]);

  const handleChangeStock = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const stockFind = stocks.find(
      (stock) => stock.denomination === event.target.value
    );
    if (stockFind) {
      setStockPurchased(stockFind);
      setStockModified({ ...stockModified, price: stockFind.purchasePrice });
    }
  };

  const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (stockPurchased) {
      setStockModified({ ...stockModified, price: Number(event.target.value) });
    }
  };

  const handleChangeCurrentStock = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (stockPurchased) {
      setStockModified({
        ...stockModified,
        quantityPurchased: Number(event.target.value),
      });
    }
  };

  const handleConfirm = async () => {
    setStockPurchased({
      ...stockPurchased,
      purchasePrice: stockModified.price,
      currentStock:
        stockPurchased.currentStock + stockModified.quantityPurchased,
    });

    handleClose();
    window.location.reload();
  };

  const handleCloseModal = () => {
    handleClose();
    setStockModified({
      price: stockPurchased.purchasePrice,
      quantityPurchased: 0,
    });
  };

  return (
    <>
      <Toaster position="top-center" richColors visibleToasts={1} />
      <Modal
        open={isOpen}
        onClose={handleCloseModal}
        slotProps={{
          backdrop: {
            timeout: 300,
          },
        }}
        disableScrollLock={true}
      >
        <Fade in={isOpen}>
          <Box className="modalStockPurchase__box">
            <h3 className="modalStockPurchase__h3">
              Registrar compra de ingrediente
            </h3>

            <div className="modalStockPurchase__itemStock">
              <label htmlFor="modalStockPurchase__select">
                Seleccionar ingrediente
              </label>
              <select
                className="modalStockPurchase__select"
                value={stockPurchased.denomination}
                onChange={handleChangeStock}
              >
                {stocks.map((stock: Stock) => (
                  <option
                    className="modalStockPurchase__option"
                    key={stock.id}
                    disabled={stock.active === true ? false : true}
                  >
                    {stock.denomination}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="modalStockPurchase__button modalStockPurchase__button--addStock"
              onClick={handleOpenModalStock}
            >
              Dar de alta un ingrediente
            </button>

            <div className="modalStockPurchase__price">
              <label htmlFor="modalStockPurchase__input">Precio de costo</label>
              <input
                type="number"
                className="modalStockPurchase__input"
                value={stockModified.price}
                min={0}
                onChange={handleChangePrice}
              />
            </div>

            <div className="modalStockPurchase__quantityPurchased">
              <label htmlFor="modalStockPurchase__input">
                Cantidad comprada
              </label>
              <input
                type="number"
                className="modalStockPurchase__input"
                defaultValue="0"
                min={0}
                onChange={handleChangeCurrentStock}
              />
            </div>

            <div className="modalStockPurchase__measurementUnit">
              <h4>Unidad de medida: {stockPurchased.measurementUnit.name}</h4>
            </div>

            <div className="modalStockPurchase__buttons">
              <button
                className="modalStockPurchase__button"
                onClick={handleCloseModal}
              >
                Cancelar
              </button>
              <button
                className="modalStockPurchase__button"
                onClick={handleConfirm}
              >
                Confirmar
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
      <ModalStock
        stock={stock}
        setStock={setStock}
        isOpen={openModalStock}
        handleClose={handleCloseModalStock}
        isNew={true}
      ></ModalStock>
    </>
  );
}
