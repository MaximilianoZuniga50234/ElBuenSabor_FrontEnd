import { useState } from "react";
import { FaGear } from "react-icons/fa6";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";
import { UserAuth0Get } from "../../interfaces/UserAuth0";
import ModalCustomersAbm from "./ModalCustomersAbm";

type Props = {
  datos: UserAuth0Get[];
};

const Table = ({ datos }: Props) => {
  const [customer, setCustomer] = useState<UserAuth0Get>({
    created_at: new Date(),
    email: "email@example.com",
    email_verified: false,
    family_name: "",
    given_name: "",
    identities: [],
    locale: "",
    name: "",
    nickname: "",
    picture: "",
    updated_at: new Date(),
    user_id: "",
    user_metadata: {
      phone_number: 0,
      address: {
        department: "Ciudad",
        number: 0,
        street: "",
      },
      roleToAdd: "",
      state: "De alta",
    },
    last_login: new Date(),
    last_ip: "",
    logins_count: 0,
    role: "",
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

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

  const handleModify = (customerParam: UserAuth0Get) => {
    setCustomer(customerParam);
    handleOpen();
  };

  return (
    <>
      <table className="customers_list_table">
        <thead>
          <tr>
            <td>NOMBRE Y APELLIDO</td>
            <td>CORREO ELECTRÓNICO</td>
            <td>TELÉFONO</td>
            <td>ESTADO</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {elementosPaginaActual.map((e) => (
            <tr key={e.user_id}>
              <td>{`${e.name}`}</td>
              <td>{`${e.email}`}</td>
              <td>{`${e.user_metadata?.phone_number}`}</td>
              <td>{`${e.user_metadata?.state}`}</td>
              <td className="celda_acciones">
                <button onClick={() => handleModify(e)}>
                  <FaGear />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
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
      <ModalCustomersAbm
        customer={customer}
        open={open}
        setOpen={setOpen}
      ></ModalCustomersAbm>
    </>
  );
};

export default Table;
