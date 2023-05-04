import { useSelector } from "react-redux";
import { RootState } from "../../context/store";
import { Stock } from "../../interface/Stock";
import "./itemStockListElement.css";

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
              id="inputDeno"
              type="text"
              placeholder="denominacion"
              className="itemStockElementDenInput"
            />
            <p>Alta</p>
            <input
              id="inputPadre"
              type="number"
              placeholder="idPadre"
              className="itemStockElementPadreInput"
            />
          </div>
          <div className="itemStockElementBodyButtons">
            <button>Confirmar</button>
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
