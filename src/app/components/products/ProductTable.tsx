import { Dispatch, SetStateAction, useState } from "react";
import { FaGear, FaX } from "react-icons/fa6";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";
import { Product } from "../../interfaces/Product";

type Props = {
  datos: Product[];
  newHandler: Dispatch<SetStateAction<boolean>>;
  setProduct: Dispatch<SetStateAction<Product>>;
  handler: () => void;
  handlerDelete: () => void;
};

const ProductTable = ({
  datos,
  newHandler,
  setProduct,
  handler,
  handlerDelete,
}: Props) => {
  const [paginaActual, setPaginaActual] = useState<number>(1);

  const indiceInicio = (paginaActual - 1) * 10;
  const indiceFin =
    datos.length < paginaActual * 10 ? datos.length : paginaActual * 10;

  const elementosPaginaActual = datos.slice(indiceInicio, indiceFin);

  const handleChangePage = (n: number) => {
    n === 0
      ? setPaginaActual(1)
      : n === 2
      ? setPaginaActual(Math.ceil(datos.length / 10))
      : setPaginaActual(paginaActual + n);
  };

  const handleModify = (p: Product) => {
    newHandler(false);
    setProduct(p);
    handler();
  };

  const handleDeleteAction = (p: Product) => {
    setProduct(p);
    handlerDelete();
  };

  return (
    <table className="produts_list_table">
      <thead>
        <tr>
          <td>NOMBRE</td>
          <td>RUBRO</td>
          <td>TIEMPO DE COCINA</td>
          <td>PRECIO</td>
          <td>ESTADO</td>
          <td>DAR DE BAJA</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {elementosPaginaActual.map((e) => (
          <tr key={e.id}>
            <td>{`${e.denomination}`}</td>
            <td>{`${e.itemProduct?.denomination}`}</td>
            <td>{`${e.estimatedTimeKitchen} min`}</td>
            <td>{`$${e.salePrice}`}</td>
            <td>{`${e.active ? "Alta" : "Baja"}`}</td>
            <td className="celda_acciones">
              <FaX
                className="product_table_leave_button"
                onClick={() => handleDeleteAction(e)}
              />
            </td>
            <td className="celda_acciones">
              <FaGear onClick={() => handleModify(e)} />
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td>
            {indiceInicio} - {indiceFin} de {datos.length}
          </td>
          <td>
            {datos.length > 10 && paginaActual > 1 && (
              <HiOutlineChevronDoubleLeft
                className="paginacion_flechas"
                onClick={() => handleChangePage(0)}
              />
            )}
            {datos.length > 10 && paginaActual > 1 && (
              <HiOutlineChevronLeft
                className="paginacion_flechas"
                onClick={() => handleChangePage(-1)}
              />
            )}
            {datos.length > 10 &&
              paginaActual !== Math.ceil(datos.length / 10) && (
                <HiOutlineChevronRight
                  className="paginacion_flechas"
                  onClick={() => handleChangePage(1)}
                />
              )}
            {datos.length > 10 &&
              paginaActual !== Math.ceil(datos.length / 10) && (
                <HiOutlineChevronDoubleRight
                  className="paginacion_flechas"
                  onClick={() => handleChangePage(2)}
                />
              )}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default ProductTable;
