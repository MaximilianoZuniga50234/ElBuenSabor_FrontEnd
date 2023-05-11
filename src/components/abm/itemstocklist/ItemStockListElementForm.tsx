import { useDispatch, useSelector } from "react-redux";
import { Stock } from "../../../interface/Stock";
import { useState, useEffect } from "react";
import { addStock, modifyStock } from "../../../context/stockSlice";
import { RootState } from "../../../context/store";
import { useNavigate, useParams } from "react-router-dom";
import "./itemStockListform.css";

const INITIAL_STATE = {
  id: 0,
  denominacion: "",
  deAlta: true,
  idPadre: 0,
};

const ItemStockListElementAdd = () => {
  const stockArray = useSelector((state: RootState) => state.stock);
  const [newStock, setNewStock] = useState<Stock>(INITIAL_STATE);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const handleConfirm = (e: any) => {
    e.preventDefault();
    if (params.id) {
      dispatch(modifyStock(newStock));
    } else {
      dispatch(addStock({ ...newStock, id: stockArray.length + 1 }));
    }
    navigate("/itemStockList");
  };

  const handleChange = (e: any) => {
    setNewStock({
      ...newStock,
      [e.target.name]: e.target.value,
    });
  };

  const handleExit = (e: any) => {
    navigate("/itemStockList");
  };

  useEffect(() => {
    const param: any = params.id;
    if (param) {
      const stockElement = stockArray.find(
        (s: Stock) => s.id === parseInt(param)
      );
      if (stockElement) setNewStock(stockElement);
    }
  }, []);

  return (
    <div className="itemStockListFormBody">
      <div className="itemStockListFormBodyModal">
        <div className="itemStockElementTitle">
          <h6>ID</h6>
          <h6>Denominacion</h6>
          <h6>Estado</h6>
          <h6>IDPadre</h6>
        </div>
        <div className="itemStockListFormBodyDetails">
          <p>{params.id ? newStock.id : stockArray.length + 1}</p>
          <input
            type="text"
            name="denominacion"
            placeholder="denominacion"
            className="itemStockListFormDenIn"
            value={newStock.denominacion}
            onChange={handleChange}
          />
          {newStock.deAlta ? <p>Alta</p> : <p>Baja</p>}
          <input
            type="number"
            name="idPadre"
            placeholder="idPadre"
            className="itemStockListFormPadreIn"
            value={newStock.idPadre}
            onChange={handleChange}
          />
        </div>
        <div className="itemStockListFormBodyButtons">
          <button onClick={handleConfirm}>Confirmar</button>
          <button onClick={handleExit}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ItemStockListElementAdd;
