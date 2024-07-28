import { toast } from "sonner";
import "./modalStock.css";
import { Box, Fade, Modal } from "@mui/material";
import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from "react";
import { ItemStock } from "../../interfaces/ItemStock";
import { MeasurementUnit } from "../../interfaces/MeasurementUnit";
import { getAllItemStock } from "../../functions/ItemStockAPI";
import { getAllMeasurementUnit } from "../../functions/MeasurementUnitAPI";
import { Stock } from "../../interfaces/Stock";
import { addStockWithImage, updateStockWithImage } from "../../functions/StockAPI";
import { useStore } from "../../store/UserTokenStore";
import { FaPenToSquare, FaPlus } from "react-icons/fa6";

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

  const NO_IMAGE_PRODUCT =
    "https://res.cloudinary.com/dfdb0nwad/image/upload/v1712072796/image-2935360_1920_ig8cze_fqw8ji.png";

  const [inputKey, setInputKey] = useState<number>(0);
  const [image, setImage] = useState<string | null>(null);
  const [isConfirmButtonPressed, setIsConfirmButtonPressed] =
  useState<boolean>(false);
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
    if (itemStock?.name != "Bebida" && itemStock?.name != "Alcohol") {
      setImage(null);
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setInputKey((prevKey) => prevKey + 1);
        toast.error("Por favor selecciona una imagen.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = async () => {
    if (stockToPost?.denomination === "") {
      toast.error("El nombre no puede estar vacío.");
    } else {
      setIsConfirmButtonPressed(true);
      if (!isNew) {
        if (stockToPost) {
          try {
            await updateStockWithImage(stockToPost, image, token);
            toast.success("Ingediente actualizado correctamente.");
          } catch (error) {
            toast.error("Error al actualizar el ingrediente.");
          }
        }
      } else {
        if (stockToPost) {
          try {
            await addStockWithImage(stockToPost, image, token);
            toast.success("Ingediente creado correctamente.");
          } catch (error) {
            toast.error("Error al actualizar el ingrediente.");
          }
        }
      }
      setStockToPost(null);
      setIsConfirmButtonPressed(false);
      setImage(null);
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

              <div className="modalStock__item">
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

              <div className="modalStock__item">
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

              <div className="modalStock__item">
                <label htmlFor="modalStock__input">Stock mínimo</label>
                <input
                  type="number"
                  className="modalStock__input"
                  defaultValue={stockToPost?.minimumStock}
                  min={0}
                  onChange={handleChangeMinimumStock}
                />
              </div>

              <div className="modalStock__item">
                <label htmlFor="modalStock__input">Stock actual</label>
                <input
                  type="number"
                  className="modalStock__input"
                  defaultValue={stockToPost?.currentStock}
                  min={0}
                  onChange={handleChangeCurrentStock}
                />
              </div>

              <div className="modalStock__item">
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

              <div className="modalStock__item">
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

              {!stockToPost.isStock && (
                <div className="modalStock__content">
                  <div className="modalStock__item modalStock__item--image">
                    <label htmlFor="input_imagen">Seleccionar imagen</label>
                    <input
                      type="file"
                      id="input_imagen"
                      style={{ display: "none" }}
                      accept="image/*"
                      key={inputKey}
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="input_imagen"
                      className="modalStock__image__label"
                    >
                      {stock.imgUrl === "" && image === null ? (
                        <FaPlus />
                      ) : (
                        <FaPenToSquare />
                      )}
                    </label>
                    <img
                      src={
                        image
                          ? image
                          : stock.imgUrl && stock.imgUrl !== ""
                          ? stock.imgUrl
                          : NO_IMAGE_PRODUCT
                      }
                    />
                  </div>
                </div>
              )}

              <div className="modalStock__buttons">
                <button
                  className="modalStock__button"
                  onClick={localHandleClose}
                >
                  Cancelar
                </button>
                <button className="modalStock__button" onClick={handleConfirm} disabled={isConfirmButtonPressed}>
                {isConfirmButtonPressed ? "Cargando..." : "Confirmar"}
                </button>
              </div>
            </Box>
          </Fade>
        </Modal>
      </>
    )
  );
}
