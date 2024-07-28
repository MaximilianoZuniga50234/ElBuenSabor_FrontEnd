import { Stock } from "../../interfaces/Stock";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import "./modalStockPurchase.css";
import { toast } from "sonner";
import { Box, Fade, Modal } from "@mui/material";
import { getAllStock, updateStock } from "../../functions/StockAPI";
import ModalStock from "./ModalStock";
import { useStore } from "../../store/UserTokenStore";

interface ModalStockPurchaseProps {
  isOpen: boolean;
  handleClose: () => void;
  stock: Stock;
  setStocksUpdated?: Dispatch<SetStateAction<boolean>>;
}

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

export default function ModalStockPurchase({
  stock,
  isOpen,
  handleClose,
  setStocksUpdated,
}: ModalStockPurchaseProps) {
  const { token } = useStore();

  const [stocks, setStocks] = useState<Stock[]>([]);
  const [stockAdded, setStockAdded] = useState(false);
  const [stockPurchased, setStockPurchased] = useState<Stock>(stock);
  const [stockModified, setStockModified] = useState({
    purchasePrice: 0,
    salePrice: 0,
    quantityPurchased: 0,
  });
  const [priceInput, setPriceInput] = useState<string>("");
  const [salePriceInput, setSalePriceInput] = useState<string>("");

  const [openModalStock, setOpenModalStock] = useState(false);
  const handleOpenModalStock = () => setOpenModalStock(true);
  const handleCloseModalStock = () => setOpenModalStock(false);

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
  }, [isOpen]);

  useEffect(() => {
    if (stock?.id != 0) {
      setStockPurchased(stock);
    } else {
      setStockPurchased(stocks[0]);
    }
  }, [stock, stocks]);

  useEffect(() => {
    if (stockAdded) {
      getStocks();
      setStocksUpdated && setStocksUpdated(true);
      setStockAdded(false);
    }
  }, [stockAdded]);

  useEffect(() => {
    if (stockPurchased) {
      setStockModified({
        ...stockModified,
        purchasePrice: stockPurchased.purchasePrice,
        salePrice: stockPurchased.salePrice,
      });
      setPriceInput(stockPurchased.purchasePrice.toString());
      setSalePriceInput(stockPurchased.salePrice.toString());
    }
  }, [stockPurchased]);

  const handleCloseModal = () => {
    handleClose();
    setStockModified({
      purchasePrice: stockPurchased.purchasePrice,
      salePrice: stockPurchased.salePrice,
      quantityPurchased: 0,
    });
    setStockPurchased(stock);
  };

  const handleChangeStock = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const stockFind = stocks.find(
      (stock) => stock.denomination === event.target.value
    );
    if (stockFind) {
      setStockPurchased(stockFind);
      setStockModified({
        ...stockModified,
        purchasePrice: stockFind.purchasePrice,
        salePrice: stockFind.salePrice,
      });
    }
  };

  const handleChangePurchasePrice = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setPriceInput(value);
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      setStockModified({ ...stockModified, purchasePrice: numericValue });
    } else {
      setStockModified({ ...stockModified, purchasePrice: 0 });
    }
  };

  const handleChangeSalePrice = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSalePriceInput(value);
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      setStockModified({ ...stockModified, salePrice: numericValue });
    } else {
      setStockModified({ ...stockModified, salePrice: 0 });
    }
  };

  const handleChangeCurrentStock = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStockModified({
      ...stockModified,
      quantityPurchased: Number(event.target.value),
    });
  };

  const handleConfirm = async () => {
    if (stockModified.purchasePrice === 0) {
      toast.error("Debe agregar un precio de compra.");
    } else if (stockModified.salePrice <= stockModified.purchasePrice) {
      toast.error("El precio de venta debe ser mayor que el de compra.");
    } else if (stockModified.quantityPurchased === 0) {
      toast.error("Debe agregar una cantidad.");
    } else {
      try {
        await updateStock(
          {
            ...stockPurchased,
            purchasePrice: stockModified.purchasePrice,
            salePrice: stockModified.salePrice,
            currentStock:
              stockPurchased.currentStock + stockModified.quantityPurchased,
          },
          token
        );
        toast.success("Compra registrada correctamente.");
        setStocksUpdated && setStocksUpdated(true);
        handleCloseModal();
      } catch (error) {
        toast.error("Error al registrar la compra.");
      }
    }
  };

  return (
    <>
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
                value={stockPurchased?.denomination}
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
                value={priceInput}
                min={0}
                onChange={handleChangePurchasePrice}
              />
            </div>

            <div className="modalStockPurchase__price">
              <label htmlFor="modalStockPurchase__input">Precio de venta</label>
              <input
                type="number"
                className="modalStockPurchase__input"
                value={salePriceInput}
                min={0}
                onChange={handleChangeSalePrice}
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
              <h4>Unidad de medida: {stockPurchased?.measurementUnit.name}</h4>
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
        stock={STOCK_INITIAL_STATE}
        isOpen={openModalStock}
        handleClose={handleCloseModalStock}
        isNew={true}
        setStockAdded={setStockAdded}
      ></ModalStock>
    </>
  );
}
