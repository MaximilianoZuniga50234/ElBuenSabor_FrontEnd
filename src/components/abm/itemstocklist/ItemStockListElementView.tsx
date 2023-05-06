import { Stock } from "../../../interface/Stock";
import "./itemStockListElement.css";

interface Props {
  stockId?: number;
  stockArray: Stock[];
}

const ItemStockListElementView = ({ stockId, stockArray }: Props) => {
  const stockElement = stockArray.find((s: Stock) => s.id === stockId);

  return (
    <div className="itemStockElementBody">
      <div className="itemStockElementBodyDetails">
        <p>{stockElement?.id}</p>
        <p>{stockElement?.denominacion}</p>
        {stockElement?.deAlta === true ? <p>Alta</p> : <p>Baja</p>}
        {stockElement?.idPadre ? <p>{stockElement?.idPadre}</p> : <p>0</p>}
      </div>
    </div>
  );
};

export default ItemStockListElementView;
