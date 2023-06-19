import { useSelector } from "react-redux";
import "./abmList.css";
import { RootState } from "../../context/store";
import { UnidadMedida } from "../../interface/UnidadMedida";
import { FiEye, FiEdit, FiPlus } from "react-icons/Fi";
import { useState } from "react";
import Modal from "../modal/Modal";
import ItemUnidadMedidaElement from "./ItemUnidadMedidaElement";

const UnidadMedidaList = () => {
  const unidadMedidaArray = useSelector(
    (state: RootState) => state.unidadMedida
  );
  const [mostrarVerModal, setMostrarVerModal] = useState<boolean>(false);
  const [mostrarEditarModal, setMostrarEditarModal] = useState<boolean>(false);
  const [mostrarAñadirModal, setMostrarAñadirModal] = useState<boolean>(false);
  const [rowId, setRowId] = useState<number>(0);

  return (
    <div className="listMainContainer">
      <div className="listContainer">
        <button
          className="listAddButton"
          onClick={() => {
            setMostrarAñadirModal(true);
          }}
        >
          <FiPlus />
        </button>
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
        <ItemUnidadMedidaElement
          idMedida={rowId}
          isEditing={false}
          isAdding={false}
          closeModal={() => setMostrarVerModal(false)}
        />
      </Modal>
      <Modal
        isOpen={mostrarEditarModal}
        closeModal={() => setMostrarEditarModal(false)}
      >
        <ItemUnidadMedidaElement
          idMedida={rowId}
          isEditing={true}
          isAdding={false}
          closeModal={() => setMostrarEditarModal(false)}
        />
      </Modal>
      <Modal
        isOpen={mostrarAñadirModal}
        closeModal={() => setMostrarAñadirModal(false)}
      >
        <ItemUnidadMedidaElement
          idMedida={rowId}
          isEditing={false}
          isAdding={true}
          closeModal={() => setMostrarAñadirModal(false)}
        />
      </Modal>
    </div>
  );
};

export default UnidadMedidaList;
