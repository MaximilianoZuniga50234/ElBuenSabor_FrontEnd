import { useDispatch } from "react-redux";
import "./itemStockListElement.css";
import { modifyStock } from "../../context/stockSlice";
import { useEffect, useState } from "react";
import { Stock } from "../../interface/Stock";

interface Props {
  stockId?: number;
  closeModal: () => void;
  stockArray: Stock[];
}

const INITIAL_STATE = {
  id: 0,
  denominacion: "",
  deAlta: true,
  idPadre: 0,
};

const ItemStockListElementEdit = ({
  stockId,
  closeModal,
  stockArray,
}: Props) => {
  //const stockElement = stockArray.find((s: Stock) => s.id === stockId);
  const [modifiedStockElement, setModifyStockElement] =
    useState<Stock>(INITIAL_STATE);
  const dispatch = useDispatch();

  const handleConfirmEdit = (e: any) => {
    e.preventDefault();
    dispatch(modifyStock({ modifiedStockElement }));
  };

  const handleChangeEdit = (e: any) => {
    setModifyStockElement({
      ...modifiedStockElement,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (stockId) {
      const s = stockArray[stockId - 1];
      setModifyStockElement({
        ...modifiedStockElement,
        id: s.id,
        denominacion: s.denominacion,
        deAlta: s.deAlta,
        idPadre: s.idPadre,
      });
    }
  }, []);

  return (
    <div className="itemStockElementBody">
      <div className="itemStockElementBodyDetails">
        <p>{modifiedStockElement.id}</p>
        <input
          type="text"
          name="denominacion"
          placeholder="denominacion"
          className="itemStockElementDenInput"
          onChange={handleChangeEdit}
          value={modifiedStockElement.denominacion}
        />
        {modifiedStockElement.deAlta === true ? <p>Alta</p> : <p>Baja</p>}
        <input
          type="number"
          name="idPadre"
          placeholder="idPadre"
          className="itemStockElementPadreInput"
          onChange={handleChangeEdit}
          value={
            modifiedStockElement.idPadre ? modifiedStockElement.idPadre : 0
          }
        />
      </div>
      <div className="itemStockElementBodyButtons">
        <button onClick={handleConfirmEdit}>Confirmar</button>
        <button onClick={closeModal}>Cancelar</button>
      </div>
    </div>
  );
};

export default ItemStockListElementEdit;
