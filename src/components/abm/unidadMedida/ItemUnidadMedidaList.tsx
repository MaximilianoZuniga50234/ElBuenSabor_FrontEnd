import { useDispatch, useSelector } from "react-redux";
import "../abmList.css";
import { RootState } from "../../../context/store";
import { UnidadMedida } from "../../../interface/UnidadMedida";
import { FiEye, FiEdit, FiPlus } from "react-icons/Fi";
import { useState } from "react";
import Modal from "../../modal/Modal";
import ItemUnidadMedidaElement from "./ItemUnidadMedidaElement";
import { useNavigate } from "react-router-dom";

const ItemUnidadMedidaList = () => {
  const unidadMedidaArray = useSelector(
    (state: RootState) => state.unidadMedida
  );
  const [mostrarVerModal, setMostrarVerModal] = useState<boolean>(false);
  const [rowId, setRowId] = useState<number>(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="listMainContainer">
      <div className="listContainer">
        <button
          className="listAddButton"
          onClick={() => {
            navigate("/itemUnidadMedida-add");
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
                  navigate(
                    `/itemUnidadMedidaList-edit/${unidadMedida.idMedida}`
                  );
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
          closeModal={() => setMostrarVerModal(false)}
        />
      </Modal>
    </div>
  );
};

export default ItemUnidadMedidaList;
