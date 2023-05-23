import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addEmpleado, modifyEmpleado } from "../../../context/empleadosSlice";
import { RootState } from "../../../context/store";
import { useNavigate, useParams } from "react-router-dom";
import { Empleado } from "../../../interface/Empleado";
import "./RegistroEmpleadoElementForm.css"

const INITIAL_STATE = {
  id : 0,
  usuario : "Juan",
  clave : "12345",
  email : "juan@gmail.com",
  telefono : "45632465"
};

const RegistroEmpleadoElementAdd = () => {
  const empleadoArray = useSelector((state: RootState) => state.empleado);
  const [newEmpleado, setNewEmpleado] = useState<Empleado>(INITIAL_STATE);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();



  {/* se utiliza para confirmar el cambio */}
  const handleConfirm = (e: any) => {
    e.preventDefault();
    if (params.id) {
      dispatch(modifyEmpleado(newEmpleado));
    } else {
      dispatch(addEmpleado({ ...newEmpleado, id: empleadoArray.length + 1 }));
    }
    navigate("/empleado");
  };




  const handleChange = (e: any) => {
    setNewEmpleado({
      ...newEmpleado,
      [e.target.name]: e.target.value,
    });
  };




  {/* regresa al regitro de empleado */}
  const handleExit = (e: any) => {
    navigate("/empleado");
  };





  {/* se ejecuta una vez */}
  useEffect(() => {
    const param: any = params.id; {/* se obtiene el valor del parámetro "id" de los parámetros de la URL*/}
    if (param) { {/*  Verifica si el parámetro "id" existe. */}

      {/* Utilizando el método find() del array "empleadoArray", se busca el primer empleado que cumpla la condición de la función de comparación */}
      {
        /* (s: Empleado) => s.id === parseInt(param): 
        Esto es una función de comparación que se utiliza para encontrar un empleado en el array "empleadoArray". 
        Compara el ID de cada empleado con el valor convertido a entero del parámetro "id". 
        */
      }
      const empleadoElement = empleadoArray.find( 
        (s: Empleado) => s.id === parseInt(param)
      );
      if (empleadoElement) setNewEmpleado(empleadoElement); {/* Si se encuentra un empleado que cumpla la condición, se actualiza el estado de "newEmpleado" con ese empleado encontrado. */}
    }
  }, []);



  return (
    <div className="itemEmpleadoListFormBody">
      <div className="itemEmpleadoListFormBodyModal">
        <div className="itemEmpleadoElementTitle">
          <h6 className="nombresText">Usuario</h6>
          {/* <h6>Estado</h6> */}
        </div>
        <div className="itemEmpleadoListFormBodyDetails">
          <input
            type="text"
            name="usuario"
            placeholder="usuario"
            className="itemEmpleadoListFormDenIn"
            value={newEmpleado.usuario}
            onChange={handleChange}
        />
        </div>


        <div className="itemEmpleadoElementTitle">
          <h6 className="nombresText">Clave</h6>
          {/* <h6>Estado</h6> */}
        </div>
        <div className="itemEmpleadoListFormBodyDetails">
          <input
            type="text"
            name="clave"
            placeholder="clave"
            className="itemEmpleadoListFormDenIn"
            value={newEmpleado.clave}
            onChange={handleChange}
        />
        </div>


        <div className="itemEmpleadoElementTitle">
          <h6 className="nombresText">Email</h6>
          {/* <h6>Estado</h6> */}
        </div>
        <div className="itemEmpleadoListFormBodyDetails">
          <input
            type="text"
            name="Email"
            placeholder="Email"
            className="itemEmpleadoListFormDenIn"
            value={newEmpleado.email}
            onChange={handleChange}
        />
        </div>


        <div className="itemEmpleadoElementTitle">
          <h6 className="nombresText">Telefono</h6>
          {/* <h6>Estado</h6> */}
        </div>
        <div className="itemEmpleadoListFormBodyDetails">
          <input
            type="text"
            name="telefono"
            placeholder="telefono"
            className="itemEmpleadoListFormDenIn"
            value={newEmpleado.telefono}
            onChange={handleChange}
        />
        </div>

        <div className="itemEmpleadoListFormBodyButtons">
          <button onClick={handleConfirm}>Confirmar</button>
          <button onClick={handleExit}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default RegistroEmpleadoElementAdd;