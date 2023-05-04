import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../context/store";
import { UnidadMedida } from "../../interface/UnidadMedida";
import { FiPlus } from "react-icons/Fi";
import {
  addUnidadMedida,
  modifyUnidadMedida,
} from "../../context/UnidadMedidaSlice";
import { useState } from "react";

interface Props {
  idMedida: number;
  isEditing?: boolean;
  isAdding?: boolean;
  closeModal: () => void;
}

const ItemUnidadMedidaElement = ({
  idMedida,
  isEditing = false,
  isAdding = false,
  closeModal,
}: Props) => {
  const unidadMedidaArray = useSelector(
    (state: RootState) => state.unidadMedida
  );

  const [unidadMedidaElement, setunidadMedidaElement] = useState(
    unidadMedidaArray.find((u: UnidadMedida) => u.idMedida === idMedida)
  );

  const [newUnidadMedida, setnewUnidadMedida] = useState<UnidadMedida>({
    idMedida: 0,
    denominacion: "",
  });

  const dispatch = useDispatch();

  const handleConfirmEdit = (e: any) => {
    e.preventDefault();
    dispatch(modifyUnidadMedida({ unidadMedidaElement }));
  };

  const handleChangeEdit = (e: any) => {
    if (unidadMedidaElement) {
      setunidadMedidaElement({
        ...unidadMedidaElement,
        denominacion: e.target.value,
      });
    }
  };

  const handleConfirmAdd = (e: any) => {
    e.preventDefault();
    dispatch(
      addUnidadMedida({
        ...newUnidadMedida,
        idMedida: unidadMedidaArray.length + 1,
      })
    );
  };

  const handleChange = (e: any) => {
    setnewUnidadMedida({
      ...newUnidadMedida,
      denominacion: e.target.value,
    });
  };

  const exitModal = () => {
    closeModal;
  };

  return (
    <div>
      <div>
        {isAdding ? (
          <div>
            <h4>Añadir elemento</h4>
            <h6>Denominacion</h6>
            <input
              type="text"
              value={unidadMedidaElement?.denominacion}
              placeholder="denominacion"
              id="inputDenominacion"
              onChange={handleChange}
            />
            <button className="listAddButton" onClick={handleConfirmAdd}>
              <FiPlus />
            </button>
          </div>
        ) : (
          <div>
            {isEditing ? (
              <div>
                <h4>Editar elemento</h4>
                <h6>ID</h6>

                <p>{unidadMedidaElement?.idMedida}</p>

                <h6>Denominacion</h6>

                <input
                  type="text"
                  value={unidadMedidaElement?.denominacion}
                  placeholder="denominacion"
                  onChange={handleChangeEdit}
                />
                <div className="itemStockElementBodyButtons">
                  <button onClick={handleConfirmEdit}>Confirmar</button>
                  <button onClick={closeModal}>Cancelar</button>
                </div>
              </div>
            ) : (
              <div>
                <h4>Ver elemento</h4>
                <h6>ID</h6>

                <p>{unidadMedidaElement?.idMedida}</p>
                <h6>Denominacion</h6>

                <p>{unidadMedidaElement?.denominacion}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default ItemUnidadMedidaElement;
