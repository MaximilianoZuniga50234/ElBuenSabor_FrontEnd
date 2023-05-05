import "./itemStockListElement.css";
import ItemStockListElementEdit from "./ItemStockListElementEdit";
import ItemStockListElementAdd from "./ItemStockListElementAdd";
import ItemStockListElementView from "./ItemStockListElementView";
import { useSelector } from "react-redux";
import { RootState } from "../../context/store";

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

  return (
    <div className="itemStockElementMain">
      <div className="itemStockElementTitle">
        <h6>ID</h6>
        <h6>Denominacion</h6>
        <h6>Estado</h6>
        <h6>IDPadre</h6>
      </div>
      {isAdding ? (
        <ItemStockListElementAdd
          closeModal={closeModal}
          stockArray={stockArray}
        />
      ) : isEditing ? (
        <ItemStockListElementEdit
          stockId={stockId}
          closeModal={closeModal}
          stockArray={stockArray}
        />
      ) : (
        <ItemStockListElementView stockId={stockId} stockArray={stockArray} />
      )}
    </div>
  );
};

export default ItemStockListElement;
