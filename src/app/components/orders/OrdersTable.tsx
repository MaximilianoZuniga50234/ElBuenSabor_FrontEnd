import { useState } from "react";
import { FaGear } from "react-icons/fa6";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";
import { IoArrowRedoSharp } from "react-icons/io5";
import { PurchaseOrder } from "../../interfaces/PurchaseOrder";

type Props = {
  datos: PurchaseOrder[];
};

const Table = ({ datos }: Props) => {
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

  return (
    <table className="orders_list_table">
      <thead>
        <tr>
          <td>N° ORDEN</td>
          <td>CLIENTE</td>
          <td>TIEMPO</td>
          <td>ENVÍO</td>
          <td>ESTADO</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {elementosPaginaActual.map((e) => (
          <tr key={e.id}>
            <td>{`${e.id}`}</td>
            <td>{`${e.user.user}`}</td>
            <td>{`${e.estimatedEndTime} Minutos`}</td>
            <td>{`${e.shippingType}`}</td>
            <td>{`${e.status.status}`}</td>
            <td className="celda_acciones">
              <FaGear />
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>
            <a href="?">
              <IoArrowRedoSharp />
              EXPORTAR A EXCEL
            </a>
          </td>
          <td></td>
          <td></td>
          <td>
            {indiceInicio} - {indiceFin} de {datos.length}
          </td>
          <td className="celda_acciones">
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

export default Table;
