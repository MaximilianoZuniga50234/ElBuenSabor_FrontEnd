import { useDispatch, useSelector } from "react-redux";
import "./abmList.css";
import { RootState } from "../../context/store";
import { Stock } from "../../interface/Stock";
import Modal from "../modal/Modal";
import { useState } from "react";
import { changeDeAlta } from "../../context/stockSlice";

const ItemStockList = () => {
  const stockArray = useSelector((state: RootState) => state.stock);
  const [mostrarVerModal, setMostrarVerModal] = useState<boolean>(false);
  const [mostrarEditarModal, setMostrarEditarModal] = useState<boolean>(false);
  const dispatch = useDispatch();

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
              <button onClick={() => setMostrarVerModal(true)}>Ver</button>
              <button>Editar</button>
              {stock.deAlta ? (
                <button
                  onClick={() => {
                    dispatch(changeDeAlta(stock));
                  }}
                >
                  Dar de baja
                </button>
              ) : (
                <button
                  onClick={() => {
                    dispatch(changeDeAlta(stock));
                  }}
                >
                  Dar de alta
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={mostrarVerModal}
        closeModal={() => setMostrarVerModal(false)}
      />
    </div>
  );
};

export default ItemStockList;
