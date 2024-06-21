import { toast } from "sonner";
import "./modalStock.css";
import { Box, Fade, Modal } from "@mui/material";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { ItemStock } from "../../interfaces/ItemStock";
import { MeasurementUnit } from "../../interfaces/MeasurementUnit";
import { getAllItemStock } from "../../functions/ItemStockAPI";
import { getAllMeasurementUnit } from "../../functions/MeasurementUnitAPI";
import { Stock } from "../../interfaces/Stock";
import { addStock, updateStock } from "../../functions/StockAPI";
import { useStore } from "../../store/UserTokenStore";

interface ModalStockProps {
  stock: Stock;
  isOpen: boolean;
  handleClose: () => void;
  isNew: boolean;
  setStocksUpdated?: Dispatch<SetStateAction<boolean>>;
  setStockAdded?: Dispatch<SetStateAction<boolean>>;
}

export default function ModalStock({
  stock,
  isOpen,
  handleClose,
  isNew,
  setStocksUpdated,
  setStockAdded,
}: ModalStockProps) {
  const { token } = useStore();

  const [itemStocks, setItemStocks] = useState<ItemStock[]>([]);
  const [measurementUnits, setMeasurementUnits] = useState<MeasurementUnit[]>(
    []
  );
  const [stockToPost, setStockToPost] = useState<Stock | null>();
  const localHandleClose = () => {
    setStockToPost(null);
    handleClose();
  };

  const getItemStocks = async () => {
    try {
      const response = await getAllItemStock();
      setItemStocks(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getMeasurementUnits = async () => {
    try {
      const response = await getAllMeasurementUnit();
      setMeasurementUnits(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getItemStocks();
    getMeasurementUnits();
  }, []);

  useEffect(() => {
    if (isNew && measurementUnits && itemStocks) {
      if (
        stockToPost &&
        stockToPost.measurementUnit?.id === 0 &&
        stockToPost.itemStock?.id === 0
      ) {
        setStockToPost({
          ...stockToPost,
          measurementUnit: measurementUnits[0],
          itemStock: itemStocks[0],
        });
      }
    }
  }, [isNew, measurementUnits, itemStocks, stockToPost]);

  useEffect(() => {
    if (stock && isOpen) {
      setStockToPost(stock);
    }
  }, [stock, isOpen]);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (stockToPost) {
      setStockToPost({ ...stockToPost, denomination: event.target.value });
    }
  };

  const handleChangeItemStock = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const itemStock = itemStocks.find(
      (itemStock) => itemStock.name === event.target.value
    );
    if (stockToPost) {
      setStockToPost({
        ...stockToPost,
        itemStock: itemStock,
        isStock:
          itemStock?.name === "Bebida" || itemStock?.name === "Alcohol"
            ? false
            : true,
      });
    }
  };

  const handleChangeMinimumStock = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (stockToPost) {
      setStockToPost({
        ...stockToPost,
        minimumStock: Number(event.target.value),
      });
    }
  };

  const handleChangeCurrentStock = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (stockToPost) {
      setStockToPost({
        ...stockToPost,
        currentStock: Number(event.target.value),
      });
    }
  };

  const handleChangeMeasurementUnit = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const measurementUnit = measurementUnits.find(
      (measurementUnit) => measurementUnit.name === event.target.value
    );
    if (stockToPost && measurementUnit) {
      setStockToPost({ ...stockToPost, measurementUnit: measurementUnit });
    }
  };

  const handleChangeActive = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const isActive = event.target.value === "De alta";
    if (stockToPost) {
      setStockToPost({ ...stockToPost, active: isActive });
    }
  };

  const handleConfirm = async () => {
    if (stockToPost?.denomination === "") {
      toast.error("El nombre no puede estar vacío.");
    } else {
      if (!isNew) {
        if (stockToPost) {
          try {
            await updateStock(stockToPost, token);
            toast.success("Ingediente actualizado correctamente.");
          } catch (error) {
            toast.error("Error al actualizar el ingrediente.");
          }
        }
      } else {
        if (stockToPost) {
          try {
            await addStock(stockToPost, token);
            toast.success("Ingediente creado correctamente.");
          } catch (error) {
            toast.error("Error al actualizar el ingrediente.");
          }
        }
      }
      setStockToPost(null);
      setStockAdded && setStockAdded(true);
      setStocksUpdated && setStocksUpdated(true);
      handleClose();
    }
  };

  return (
    isOpen &&
    stockToPost && (
      <>
        <Modal
          open={isOpen}
          onClose={localHandleClose}
          slotProps={{
            backdrop: {
              timeout: 300,
            },
          }}
          disableScrollLock={true}
        >
          <Fade in={isOpen}>
            <Box className="modalStock__box">
              <h3 className="modalStock__h3">
                {isNew === true
                  ? "Añadir ingrediente"
                  : "Modificar Ingrediente"}
              </h3>

              <div className="modalStock__name">
                <label htmlFor="modalStock__input">
                  Nombre del ingrediente
                </label>
                <input
                  type="text"
                  className="modalStock__input"
                  defaultValue={stockToPost?.denomination}
                  onChange={handleChangeName}
                  placeholder="Ingese el nombre del ingrediente"
                />
              </div>

              <div className="modalStock__itemStock">
                <label htmlFor="modalStock__select">Seleccionar rubro</label>
                <select
                  className="modalStock__select"
                  defaultValue={stockToPost?.itemStock?.name}
                  onChange={handleChangeItemStock}
                >
                  {itemStocks.map((itemStock: ItemStock) => (
                    <option className="modalStock__option" key={itemStock.id}>
                      {itemStock.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="modalStock__minimumStock">
                <label htmlFor="modalStock__input">Stock mínimo</label>
                <input
                  type="number"
                  className="modalStock__input"
                  defaultValue={stockToPost?.minimumStock}
                  min={0}
                  onChange={handleChangeMinimumStock}
                />
              </div>

              <div className="modalStock__currentStock">
                <label htmlFor="modalStock__input">Stock actual</label>
                <input
                  type="number"
                  className="modalStock__input"
                  defaultValue={stockToPost?.currentStock}
                  min={0}
                  onChange={handleChangeCurrentStock}
                />
              </div>

              <div className="modalStock__measurementUnit">
                <label htmlFor="modalStock__select">
                  Seleccionar unidad de medida
                </label>
                <select
                  className="modalStock__select"
                  defaultValue={stockToPost?.measurementUnit?.name}
                  onChange={handleChangeMeasurementUnit}
                >
                  {measurementUnits.map((measurementUnit: MeasurementUnit) => (
                    <option
                      className="modalStock__option"
                      key={measurementUnit.id}
                    >
                      {measurementUnit.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="modalStock__state">
                <label htmlFor="modalStock__select">Seleccionar estado</label>
                <select
                  className="modalStock__select"
                  defaultValue={
                    stockToPost?.active === true ? "De alta" : "De baja"
                  }
                  onChange={handleChangeActive}
                >
                  <option className="modalStock__option">De alta</option>
                  <option className="modalStock__option">De baja</option>
                </select>
              </div>

              <div className="modalStock__buttons">
                <button
                  className="modalStock__button"
                  onClick={localHandleClose}
                >
                  Cancelar
                </button>
                <button className="modalStock__button" onClick={handleConfirm}>
                  Confirmar
                </button>
              </div>
            </Box>
          </Fade>
        </Modal>
      </>
    )
  );
}
