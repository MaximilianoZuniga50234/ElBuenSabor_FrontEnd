import "./itemStockListElement.css";
import ItemStockListElementView from "./ItemStockListElementView";
import { useSelector } from "react-redux";
import { RootState } from "../../context/store";

interface Props {
  stockId: number;
  closeModal: () => void;
}

const ItemStockListElement = ({ stockId, closeModal }: Props) => {
  const stockArray = useSelector((state: RootState) => state.stock);

  return (
    <div className="itemStockElementMain">
      <div className="itemStockElementTitle">
        <h6>ID</h6>
        <h6>Denominacion</h6>
        <h6>Estado</h6>
        <h6>IDPadre</h6>
      </div>
      <ItemStockListElementView stockId={stockId} stockArray={stockArray} />
    </div>
  );
};

export default ItemStockListElement;
