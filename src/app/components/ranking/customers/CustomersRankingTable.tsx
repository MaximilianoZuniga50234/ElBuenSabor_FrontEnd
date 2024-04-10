import { useState } from "react";
import "./customersRankingTable.css";
import { Person } from "../../../interfaces/Person";
import { IoArrowRedoSharp } from "react-icons/io5";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";
import { FaEye } from "react-icons/fa6";
import * as XLSX from "xlsx";
import { PurchaseOrder } from "../../../interfaces/PurchaseOrder";
import ModalUserOrders from "./ModalUserOrders";

interface CustomersTableProps {
  customers: Person[];
  datesToFilter: { startDate: Date; endDate: Date };
  orders: PurchaseOrder[];
}

export default function CustomersRankingTable({
  customers,
  datesToFilter,
  orders,
}: CustomersTableProps) {
  const [paginaActual, setPaginaActual] = useState<number>(1);
  const [userOrders, setUserOrders] = useState<PurchaseOrder[]>([]);
  const indiceInicio = (paginaActual - 1) * 10;
  const indiceFin =
    customers.length < paginaActual * 10 ? customers.length : paginaActual * 10;

  const elementosPaginaActual = customers.slice(indiceInicio, indiceFin);

  const [customer, setCustomer] = useState<Person>();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleChangePage = (n: number) => {
    n === 0
      ? setPaginaActual(1)
      : n === 2
      ? setPaginaActual(Math.ceil(customers.length / 10))
      : setPaginaActual(paginaActual + n);
  };

  const handleClick = (id: string | undefined) => {
    const filteredUserOrders = orders.filter(
      (o: PurchaseOrder) => o.person?.id === id
    );

    setUserOrders(filteredUserOrders);

    setCustomer(customers.find((c: Person) => c?.id === id));
    handleOpen();
  };

  const exportToExcel = () => {
    const titulo = [
      {
        A:
          datesToFilter.startDate.getTime() === datesToFilter.endDate.getTime()
            ? `Clientes que realizaron pedidos hasta el día de la fecha.`
            : `Clientes que realizaron pedidos ${
                datesToFilter.startDate.getDay() !=
                datesToFilter.endDate.getDay()
                  ? `entre el ${datesToFilter.startDate.toLocaleDateString()} y el ${datesToFilter.endDate.toLocaleDateString()}. `
                  : `el ${datesToFilter.startDate.toLocaleDateString()}`
              }`,
      },
      {},
    ];
    const longitudesColumnas = [10, 35, 20, 20];

    const tabla = [
      {
        A: "Id",
        B: "Cliente",
        C: "Monto total",
        D: "Cantidad de pedidos",
      },
    ];

    customers.forEach((c: Person) => {
      tabla.push({
        A: c.id?.toString() ?? "",
        B: `${c.name} ${c.lastName}`,
        C: `$${c.totalOrdersAmount?.toString()}` ?? "0",
        D: c.ordersQuantity?.toString() ?? "0",
      });
    });

    const finalData = [...titulo, ...tabla];

    const libro = XLSX.utils.book_new();
    const hoja = XLSX.utils.json_to_sheet(finalData, { skipHeader: true });

    const propiedades: XLSX.ColInfo[] | { width: number }[] | undefined = [];

    longitudesColumnas.forEach((col) => {
      propiedades.push({
        width: col,
      });
    });

    hoja["!cols"] = propiedades;
    XLSX.utils.book_append_sheet(libro, hoja, "Clientes");
    XLSX.writeFile(libro, "Ranking de clientes.xlsx");
  };

  return customers.length > 0 ? (
    <main className="customersRanking__table">
      <div className="customersRanking__table__container">
        <div className="customersRanking__table__header">
          <h5 className="customersRanking__table__header__text">
            <b>Cliente</b>
          </h5>
          <h5 className="customersRanking__table__header__text">
            <b>Pedidos</b>
          </h5>
          <h5 className="customersRanking__table__header__text">
            <b>Monto total</b>
          </h5>
        </div>

        <div className="customersRanking__table__content">
          {elementosPaginaActual?.map((customer) => (
            <div
              key={customer.id}
              className="customersRanking__table__content__customer"
            >
              <h5 className="customersRanking__table__content__customer__text">
                {customer.name + " " + customer.lastName}
              </h5>
              <h5 className="customersRanking__table__content__customer__text">
                {customer.ordersQuantity}
              </h5>
              <h5 className="customersRanking__table__content__customer__text">
                ${customer.totalOrdersAmount}
              </h5>
              <button
                className="customersRanking__table__content__customer__button"
                onClick={() => {
                  handleClick(customer.id);
                }}
              >
                <FaEye />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="customersRanking__footer">
        <div className="customersRanking__footer__excel">
          <button onClick={exportToExcel}>
            <IoArrowRedoSharp />
            EXPORTAR A EXCEL
          </button>
        </div>
        <div className="customersRanking__footer__pagination">
          <div className="customersRanking__footer__pagination__info">
            {indiceInicio} - {indiceFin} de {customers.length}
          </div>
          <div className="customersRanking__footer__pagination__actions">
            {customers.length > 10 && paginaActual > 1 && (
              <HiOutlineChevronDoubleLeft
                className="customersRanking__footer__pagination__arrow"
                onClick={() => handleChangePage(0)}
              />
            )}
            {customers.length > 10 && paginaActual > 1 && (
              <HiOutlineChevronLeft
                className="customersRanking__footer__pagination__arrow"
                onClick={() => handleChangePage(-1)}
              />
            )}
            {customers.length > 10 &&
              paginaActual !== Math.ceil(customers.length / 10) && (
                <HiOutlineChevronRight
                  className="customersRanking__footer__pagination__arrow"
                  onClick={() => handleChangePage(1)}
                />
              )}
            {customers.length > 10 &&
              paginaActual !== Math.ceil(customers.length / 10) && (
                <HiOutlineChevronDoubleRight
                  className="customersRanking__footer__pagination__arrow"
                  onClick={() => handleChangePage(2)}
                />
              )}
          </div>
        </div>
      </div>
      <ModalUserOrders
        open={open}
        setOpen={setOpen}
        orders={userOrders ?? []}
        customer={customer}
      />
    </main>
  ) : (
    <>
      <h4 className="customersRanking__noResults">
        No se realizaron compras dentro de las fechas especificadas.
      </h4>
    </>
  );
}
