import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../context/store";
import { Stock } from "../../interface/Stock";
import "./itemStockListElement.css";
import { useState } from "react";
import { addStock, modifyStock } from "../../context/stockSlice";

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
  const [stockElement, setStockElement] = useState(
    stockArray.find((s: Stock) => s.id === stockId)
  );
  const [newStock, setNewStock] = useState<Stock>({
    id: 0,
    denominacion: "",
    deAlta: true,
    idPadre: 0,
  });

  const dispatch = useDispatch();

  const handleConfirmEdit = (e: any) => {
    e.preventDefault();
    dispatch(modifyStock({ stockElement }));
  };

  const handleChangeEdit = (e: any) => {
    if (stockElement)
      setStockElement({ ...stockElement, [e.target.name]: e.target.value });
  };

  const handleConfirmAdd = (e: any) => {
    e.preventDefault();
    dispatch(addStock({ ...newStock, id: stockArray.length + 1 }));
  };

  const handleChange = (e: any) => {
    setNewStock({
      ...newStock,
      [e.target.name]: e.target.value,
    });
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
            <button onClick={handleConfirmAdd}>Confirmar</button>
            <button onClick={closeModal}>Cancelar</button>
          </div>
        </div>
      ) : isEditing ? (
        <div className="itemStockElementBody">
          <p>{stockElement?.id}</p>
          <input
            type="text"
            name="denominacion"
            placeholder="denominacion"
            onChange={handleChangeEdit}
            value={stockElement ? stockElement.denominacion : ""}
          />
          {stockElement?.deAlta === true ? <p>Alta</p> : <p>Baja</p>}
          <input
            type="number"
            name="idPadre"
            placeholder="idPadre"
            onChange={handleChangeEdit}
            value={
              stockElement
                ? stockElement.idPadre
                  ? stockElement.idPadre
                  : 0
                : 0
            }
          />
          <div className="itemStockElementBodyButtons">
            <button onClick={handleConfirmEdit}>Confirmar</button>
            <button onClick={closeModal}>Cancelar</button>
          </div>
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
