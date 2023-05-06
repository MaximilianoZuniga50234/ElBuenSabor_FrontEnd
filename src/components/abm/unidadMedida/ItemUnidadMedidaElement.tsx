import { useSelector } from "react-redux";
import { RootState } from "../../../context/store";
import ItemUnidadMedidaElementView from "./ItemUnidadMedidaElementView";

interface Props {
  idMedida: number;
  closeModal: () => void;
}

const ItemUnidadMedidaElement = ({ idMedida, closeModal }: Props) => {
  const unidadMedidaArray = useSelector(
    (state: RootState) => state.unidadMedida
  );

  return (
    <div>
      <div>
        <h5>ID</h5>
        <h6>Denominacion</h6>
      </div>
      <ItemUnidadMedidaElementView
        idMedida={idMedida}
        unidadMedidaArray={unidadMedidaArray}
      />
    </div>
  );
};

export default ItemUnidadMedidaElement;
