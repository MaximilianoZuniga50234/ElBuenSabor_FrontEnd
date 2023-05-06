import { useDispatch, useSelector } from "react-redux";
import { UnidadMedida } from "../../../interface/UnidadMedida";
import { useState, useEffect } from "react";
import {
  addUnidadMedida,
  modifyUnidadMedida,
} from "../../../context/UnidadMedidaSlice";
import { RootState } from "../../../context/store";
import { useNavigate, useParams } from "react-router-dom";

const INITIAL_STATE = {
  idMedida: 0,
  denominacion: "",
};

const ItemUnidadMedidaListElementAdd = () => {
  const UnidadMedidaArray = useSelector(
    (state: RootState) => state.unidadMedida
  );

  const [newUnidadMedida, setNewUnidadMedida] =
    useState<UnidadMedida>(INITIAL_STATE);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const handleConfirm = (e: any) => {
    e.preventDefault();
    if (params.id) {
      dispatch(modifyUnidadMedida(newUnidadMedida));
    } else {
      dispatch(
        addUnidadMedida({
          ...newUnidadMedida,
          idMedida: UnidadMedidaArray.length + 1,
        })
      );
    }
    navigate("/itemUnidadMedidaList");
  };

  const handleChange = (e: any) => {
    console.log(e.target.value);
    setNewUnidadMedida({
      ...newUnidadMedida,
      [e.target.name]: e.target.value,
    });
  };

  const handleExit = (e: any) => {
    navigate("/itemUnidadMedidaList");
  };

  useEffect(() => {
    const param: any = params.id;
    if (param) {
      const UnidadMedidaElement = UnidadMedidaArray.find(
        (u: UnidadMedida) => u.idMedida === parseInt(param)
      );
      if (UnidadMedidaElement) setNewUnidadMedida(UnidadMedidaElement);
    }
  }, []);

  return (
    <div>
      <div>
        <div>
          <h6>ID</h6>
          <h6>Denominacion</h6>
        </div>
        <div>
          <p>
            {params.id
              ? newUnidadMedida.idMedida
              : UnidadMedidaArray.length + 1}
          </p>
          <input
            type="text"
            name="denominacion"
            placeholder="denominacion"
            value={newUnidadMedida.denominacion}
            onChange={handleChange}
          />
        </div>
        <div>
          <button onClick={handleConfirm}>Confirmar</button>
          <button onClick={handleExit}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ItemUnidadMedidaListElementAdd;
