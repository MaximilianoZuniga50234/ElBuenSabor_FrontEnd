import { useDispatch, useSelector } from "react-redux";
import "./abmList.css";
import { RootState } from "../../context/store";
import { Stock } from "../../interface/Stock";
import Modal from "../modal/Modal";
import { useState } from "react";
import { changeDeAlta } from "../../context/stockSlice";
import ItemStockListElement from "./ItemStockListElement";

const ItemStockList = () => {
  const stockArray = useSelector((state: RootState) => state.stock);
  const [mostrarVerModal, setMostrarVerModal] = useState<boolean>(false);
  const [mostrarEditarModal, setMostrarEditarModal] = useState<boolean>(false);
  const [rowId, setRowId] = useState<number>(0);
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
          <div className="listRow" key={stock.id}>
            <p>{stock.denominacion}</p>
            <div className="listRowButtons">
              <button
                className="listRowViewButton"
                onClick={() => {
                  setMostrarVerModal(true);
                  setRowId(stock.id);
                }}
              >
                Ver
              </button>
              <button
                className="listRowEditButton"
                onClick={() => {
                  setMostrarEditarModal(true);
                  setRowId(stock.id);
                }}
              >
                Editar
              </button>
              {stock.deAlta ? (
                <button
                  className="listRowButtonAlta"
                  onClick={() => {
                    dispatch(changeDeAlta(stock));
                  }}
                >
                  Dar de baja
                </button>
              ) : (
                <button
                  className="listRowButtonBaja"
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
      >
        <ItemStockListElement stockId={rowId} isEditing={false} />
      </Modal>
      <Modal
        isOpen={mostrarEditarModal}
        closeModal={() => setMostrarEditarModal(false)}
      >
        <ItemStockListElement stockId={rowId} isEditing={true} />
      </Modal>
    </div>
  );
};

export default ItemStockList;
