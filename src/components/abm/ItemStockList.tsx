import { useDispatch, useSelector } from "react-redux";
import "./abmList.css";
import { RootState } from "../../context/store";
import { Stock } from "../../interface/Stock";
import Modal from "../modal/Modal";
import { useState } from "react";
import { changeDeAlta } from "../../context/stockSlice";
import ItemStockListElement from "./ItemStockListElement";
import { FiEye, FiPlus, FiEdit } from "react-icons/Fi";

const ItemStockList = () => {
  const stockArray = useSelector((state: RootState) => state.stock);
  const [mostrarVerModal, setMostrarVerModal] = useState<boolean>(false);
  const [mostrarEditarModal, setMostrarEditarModal] = useState<boolean>(false);
  const [mostrarAñadirModal, setMostrarAñadirModal] = useState<boolean>(false);
  const [rowId, setRowId] = useState<number>(0);
  const dispatch = useDispatch();

  return (
    <div className="listMainContainer">
      <div className="listContainer">
        <button
          className="listAddButton"
          onClick={() => setMostrarAñadirModal(true)}
        >
          <FiPlus />
        </button>
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
                <FiEye />
              </button>
              <button
                className="listRowEditButton"
                onClick={() => {
                  setMostrarEditarModal(true);
                  setRowId(stock.id);
                }}
              >
                <FiEdit />
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
        <ItemStockListElement
          stockId={rowId}
          closeModal={() => setMostrarVerModal(false)}
        />
      </Modal>
      <Modal
        isOpen={mostrarEditarModal}
        closeModal={() => setMostrarEditarModal(false)}
      >
        <ItemStockListElement
          stockId={rowId}
          isEditing={true}
          closeModal={() => setMostrarEditarModal(false)}
        />
      </Modal>
      <Modal
        isOpen={mostrarAñadirModal}
        closeModal={() => setMostrarAñadirModal(false)}
      >
        <ItemStockListElement
          isAdding={true}
          closeModal={() => setMostrarAñadirModal(false)}
        />
      </Modal>
    </div>
  );
};

export default ItemStockList;
