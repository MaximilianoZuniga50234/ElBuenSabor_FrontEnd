import { useSelector } from "react-redux";
import "./abmList.css";
import { RootState } from "../../context/store";
import { UnidadMedida } from "../../interface/UnidadMedida";
import { FiEye, FiEdit } from "react-icons/Fi";
import { useState } from "react";
import Modal from "../modal/Modal";
import ItemUnidadMedidaElement from "./ItemUnidadMedidaElement";

const UnidadMedidaList = () => {
  const unidadMedidaArray = useSelector(
    (state: RootState) => state.unidadMedida
  );
  const [mostrarVerModal, setMostrarVerModal] = useState<boolean>(false);
  const [mostrarEditarModal, setMostrarEditarModal] = useState<boolean>(false);
  const [rowId, setRowId] = useState<number>(0);

  return (
    <div className="listMainContainer">
      <div className="listContainer">
        <button className="listAddButton">+</button>
        <div className="listRowTitle">
          <p>Denominacion</p>
          <p>Acciones</p>
        </div>
        {unidadMedidaArray.map((unidadMedida: UnidadMedida) => (
          <div className="listRow" key={unidadMedida.idMedida}>
            <p>{unidadMedida.denominacion}</p>
            <div className="listRowButtons">
              <button
                className="listRowViewButton"
                onClick={() => {
                  setMostrarVerModal(true);
                  setRowId(unidadMedida.idMedida);
                }}
              >
                <FiEye />
              </button>
              <button
                className="listRowEditButton"
                onClick={() => {
                  setMostrarEditarModal(true);
                  setRowId(unidadMedida.idMedida);
                }}
              >
                <FiEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={mostrarVerModal}
        closeModal={() => setMostrarVerModal(false)}
      >
        <ItemUnidadMedidaElement idMedida={rowId} isEditing={false} />
      </Modal>
      <Modal
        isOpen={mostrarEditarModal}
        closeModal={() => setMostrarEditarModal(false)}
      >
        <ItemUnidadMedidaElement idMedida={rowId} isEditing={true} />
      </Modal>
    </div>
  );
};

export default UnidadMedidaList;
