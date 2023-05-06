import { Stock } from "../../../interface/Stock";
import { UnidadMedida } from "../../../interface/UnidadMedida";

interface Props {
  idMedida?: number;
  unidadMedidaArray: UnidadMedida[];
}

const ItemUnidadMedidaElementView = ({
  idMedida,
  unidadMedidaArray,
}: Props) => {
  const unidadMedidaElement = unidadMedidaArray.find(
    (u: UnidadMedida) => u.idMedida === idMedida
  );

  return (
    <div className="itemStockElementBody">
      <div className="itemStockElementBodyDetails">
        <p>{unidadMedidaElement?.idMedida}</p>
        <p>{unidadMedidaElement?.denominacion}</p>
      </div>
    </div>
  );
};

export default ItemUnidadMedidaElementView;
