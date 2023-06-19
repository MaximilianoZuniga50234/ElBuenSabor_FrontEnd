import { useDispatch, useSelector } from "react-redux";
import "../abmList.css";
import { RootState } from "../../../context/store";
import { MeasurementUnit } from "../../../interface/MeasurementUnit";
import Modal from "../../modal/Modal";
import { useState } from "react";
import MeasurementUnitElement from "./MeasurementUnitElement";
import { FiEye, FiEdit, FiPlus } from "react-icons/Fi";
import { useNavigate } from "react-router-dom";

const MeasurementUnitList = () => {
  const measurementUnitArray = useSelector(
    (state: RootState) => state.measurementUnit
  );
  const [mostrarVerModal, setMostrarVerModal] = useState<boolean>(false);
  const [rowId, setRowId] = useState<number>(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(measurementUnitArray);
  return (
    <div className="listMainContainer">
      <div className="listContainer">
        <button
          className="listAddButton"
          onClick={() => {
            navigate("/measurementUnit-add");
          }}
        >
          <FiPlus />
        </button>
        <div className="listRowTitle">
          <p>Denominacion</p>
          <p>Acciones</p>
        </div>
        {measurementUnitArray.map((measurementUnit: MeasurementUnit) => (
          <div className="listRow" key={measurementUnit.id}>
            <p>{measurementUnit.denominacion}</p>
            <div className="listRowButtons">
              <button
                className="listRowViewButton"
                onClick={() => {
                  setMostrarVerModal(true);
                  setRowId(measurementUnit.id);
                }}
              >
                <FiEye />
              </button>
              <button
                className="listRowEditButton"
                onClick={() => {
                  navigate(`/measurementUnit-edit/${measurementUnit.id}`);
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
        <MeasurementUnitElement
          measurementUnitId={rowId}
          closeModal={() => setMostrarVerModal(false)}
        />
      </Modal>
    </div>
  );
};

export default MeasurementUnitList;
