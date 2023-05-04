import { useSelector } from "react-redux";
import { RootState } from "../../context/store";
import { Stock } from "../../interface/Stock";
import { UnidadMedida } from "../../interface/UnidadMedida";

interface Props {
  idMedida: number;
  isEditing: boolean;
}

const ItemUnidadMedidaElement = ({ idMedida, isEditing }: Props) => {
  const unidadMedidaElement = useSelector((state: RootState) =>
    state.unidadMedida.find((u: UnidadMedida) => u.idMedida === idMedida)
  );

  return (
    <div>
      <div>
        <h6>ID</h6>
        <h6>Denominacion</h6>
      </div>
      <div>
        {isEditing ? (
          <div>
            <p>{unidadMedidaElement?.idMedida}</p>
            <input
              type="text"
              value={unidadMedidaElement?.denominacion}
              placeholder="denominacion"
            />
          </div>
        ) : (
          <div>
            <p>{unidadMedidaElement?.idMedida}</p>
            <p>{unidadMedidaElement?.denominacion}</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default ItemUnidadMedidaElement;
