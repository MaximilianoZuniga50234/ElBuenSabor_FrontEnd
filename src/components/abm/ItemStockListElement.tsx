import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../context/store";
import { Stock } from "../../interface/Stock";
import "./itemStockListElement.css";
import { useState } from "react";
import { addStock } from "../../context/stockSlice";

interface Props {
  stockId?: number;
  isEditing?: boolean;
  isAdding?: boolean;
  closeModal: () => void;
}

const ItemStockListElement = ({
  stockId,
  isEditing = false,
  isAdding = false,
  closeModal,
}: Props) => {
  const stockArray = useSelector((state: RootState) => state.stock);
  const stockElement = stockArray.find((s: Stock) => s.id === stockId);
  const [newStock, setNewStock] = useState<Stock>({
    id: 0,
    denominacion: "",
    deAlta: true,
    idPadre: 0,
  });

  const dispatch = useDispatch();

  const handleConfirm = (e: any) => {
    e.preventDefault();
    setNewStock({ ...newStock, id: stockArray.length + 1, deAlta: true });
    console.log(newStock);
    dispatch(addStock(newStock));
  };

  const handleChange = (e: any) => {
    setNewStock({
      ...newStock,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name);
  };

  const exitModal = () => {
    closeModal;
  };

  return (
    <div className="itemStockElementMain">
      <div className="itemStockElementTitle">
        <h6>ID</h6>
        <h6>Denominacion</h6>
        <h6>Estado</h6>
        <h6>IDPadre</h6>
      </div>
      {isAdding ? (
        <div className="itemStockElementBody">
          <div className="itemStockElementBodyDetails">
            <p>{stockArray.length + 1}</p>
            <input
              type="text"
              name="denominacion"
              placeholder="denominacion"
              className="itemStockElementDenInput"
              onChange={handleChange}
            />
            <p>Alta</p>
            <input
              type="number"
              name="idPadre"
              placeholder="idPadre"
              className="itemStockElementPadreInput"
              onChange={handleChange}
            />
          </div>
          <div className="itemStockElementBodyButtons">
            <button onClick={handleConfirm}>Confirmar</button>
            <button onClick={closeModal}>Cancelar</button>
          </div>
        </div>
      ) : isEditing ? (
        <div className="itemStockElementBody">
          <p>{stockElement?.id}</p>
          <input
            type="text"
            value={stockElement?.denominacion}
            placeholder="denominacion"
          />
          {stockElement?.deAlta === true ? <p>Alta</p> : <p>Baja</p>}
          <input
            type="number"
            value={stockElement?.idPadre ? stockElement.idPadre : undefined}
            placeholder="idPadre"
          />
        </div>
      ) : (
        <div className="itemStockElementBody">
          <p>{stockElement?.id}</p>
          <p>{stockElement?.denominacion}</p>
          {stockElement?.deAlta === true ? <p>Alta</p> : <p>Baja</p>}
          {stockElement?.idPadre ? <p>{stockElement?.idPadre}</p> : <p>0</p>}
        </div>
      )}
    </div>
  );
};

export default ItemStockListElement;
