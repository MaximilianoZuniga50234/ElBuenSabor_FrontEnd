import { useDispatch, useSelector } from "react-redux";
import "../abmList.css";
import "./RegistroEmpleado.css"
import { RootState } from "../../../context/store";
import { Empleado } from "../../../interface/Empleado";
import Modal from "../../modal/Modal";
import { useState } from "react";
import { FiEye, FiPlus, FiEdit } from "react-icons/Fi";
import { useNavigate } from "react-router-dom";

const RegistroEmpleado = () => {
  const empleadoArray = useSelector((state: RootState) => state.empleado);
  const [mostrarVerModal, setMostrarVerModal] = useState<boolean>(false);
  const [rowId, setRowId] = useState<number>(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="listMainContainer hola">
      <div className="listContainer">


        {/* Cabeceros de la Lista */}
        <div className="listRowTitle">
          <p>Denominacion</p>
          <p>Acciones</p>


          {/* Boton para añadir Empleados */}
          <button
            className="listAddButton"
            onClick={() => navigate("/RegistroEmpleado-add")}
          >
            <FiPlus />
          </button>
        </div>



        {empleadoArray.map((empleado: Empleado) => (
          <div className="listRow" key={empleado.id}>

            {/* Valores del empleado*/}
            <p>{empleado.usuario}</p>
            <p>{empleado.email}</p>
            <p>{empleado.clave}</p>
            <p>{empleado.telefono}</p>
            <div className="listRowButtons">


              {/* Boton para mirar */}
              <button
                className="listRowViewButton"
                onClick={() => {
                  setMostrarVerModal(true);
                  setRowId(empleado.id);
                }}>
                <FiEye />
              </button>


              {/* Boton para editar */}
              <button
                className="listRowEditButton"
                onClick={() => {
                  navigate(`/RegistroEmpleado-edit/${empleado.id}`);
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
      </Modal>
    </div>
  );
};

export default RegistroEmpleado;