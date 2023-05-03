import { useSelector } from "react-redux";
import { RootState } from "../../context/store";
import { Stock } from "../../interface/Stock";

interface Props {
  stockId: number;
  isEditing: boolean;
}

const ItemStockListElement = ({ stockId, isEditing }: Props) => {
  const stockElement = useSelector((state: RootState) =>
    state.stock.find((s: Stock) => s.id === stockId)
  );

  return (
    <div>
      <div>
        <h6>ID</h6>
        <h6>Denominacion</h6>
        <h6>Estado</h6>
        <h6>IDPadre</h6>
      </div>
      <div>
        {isEditing ? (
          <div>
            <p>{stockElement?.id}</p>
            <input
              type="text"
              value={stockElement?.denominacion}
              placeholder="denominacion"
            />
            {stockElement?.deAlta === true ? <p>Alta</p> : <p>Baja</p>}
            <input
              type="text"
              value={stockElement?.idPadre ? stockElement.idPadre : "No"}
              placeholder="denominacion"
            />
          </div>
        ) : (
          <div>
            <p>{stockElement?.id}</p>
            <p>{stockElement?.denominacion}</p>
            {stockElement?.deAlta === true ? <p>Alta</p> : <p>Baja</p>}
            {stockElement?.idPadre ? <p>{stockElement?.idPadre}</p> : <p>No</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemStockListElement;
