import { useDispatch } from "react-redux";
import { Stock } from "../../interface/Stock";
import { useState } from "react";
import { addStock } from "../../context/stockSlice";
import "./itemStockListElement.css";

interface Props {
  closeModal: () => void;
  stockArray: Stock[];
}

const INITIAL_STATE = {
  id: 0,
  denominacion: "",
  deAlta: true,
  idPadre: 0,
};

const ItemStockListElementAdd = ({ closeModal, stockArray }: Props) => {
  const [newStock, setNewStock] = useState<Stock>(INITIAL_STATE);

  const dispatch = useDispatch();

  const handleConfirm = (e: any) => {
    e.preventDefault();
    dispatch(addStock({ ...newStock, id: stockArray.length + 1 }));
  };

  const handleChange = (e: any) => {
    setNewStock({
      ...newStock,
      [e.target.name]: e.target.value,
    });
  };

  return (
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
  );
};

export default ItemStockListElementAdd;
