import { useSelector } from "react-redux";
import "./abmList.css";
import { RootState } from "../../context/store";
import { Stock } from "../../interface/Stock";

const ItemStockList = () => {
  const stockArray = useSelector((state: RootState) => state.stock);

  return (
    <div className="listMainContainer">
      <div className="listContainer">
        <button className="listAddButton">+</button>
        <div className="listRowTitle">
          <p>Denominacion</p>
          <p>Acciones</p>
        </div>
        {stockArray.map((stock: Stock) => (
          <div
            className={stock.deAlta ? "listRowAlta" : "listRowBaja"}
            key={stock.id}
          >
            <p>{stock.denominacion}</p>
            <div className="listRowButtons">
              <button>Ver</button>
              <button>Editar</button>
              {stock.deAlta ? (
                <button>Dar de baja</button>
              ) : (
                <button>Dar de alta</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemStockList;
