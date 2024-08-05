import "./monetaryMovementsTable.css";
import { IoArrowRedoSharp } from "react-icons/io5";

import * as XLSX from "xlsx";

interface MonetaryMovementsTableProps {
  data: { income: number; cost: number; profit: number };
  datesToFilter: { startDate: Date; endDate: Date };
}

export default function MonetaryMovementsTable({
  data,
  datesToFilter,
}: MonetaryMovementsTableProps) {
  const exportToExcel = () => {
    const titulo = [
      {
        A:
          datesToFilter.startDate.getTime() ===
            datesToFilter.endDate.getTime() ||
          (isNaN(datesToFilter.startDate.getTime()) &&
            isNaN(datesToFilter.endDate.getTime()))
            ? `Movimientos monetarios hasta el día de la fecha.`
            : `Movimientos monetarios ${
                datesToFilter.startDate.getDay() !=
                datesToFilter.endDate.getDay()
                  ? `entre el ${datesToFilter.startDate.toLocaleDateString()} y el ${datesToFilter.endDate.toLocaleDateString()}. `
                  : `el ${datesToFilter.startDate.toLocaleDateString()}`
              }`,
      },
      {},
    ];
    const longitudesColumnas = [20, 20, 20];

    const tabla = [
      {
        A: "Ingresos",
        B: "Costos",
        C: "Ganancias",
      },
      {
        A: `$${data.income.toString()}`,
        B: `$${data.cost.toString()}`,
        C: `$${data.profit.toString()}`,
      },
    ];

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
    XLSX.utils.book_append_sheet(libro, hoja, "Movimientos monetarios");
    XLSX.writeFile(libro, "Movimientos monetarios.xlsx");
  };

  return data.income > 0 ? (
    <main className="monetaryMovements__table">
      <div className="monetaryMovements__table__container">
        <div className="monetaryMovements__table__header">
          <h5>
            <b>INGRESOS</b>
          </h5>
          <h5>
            <b>COSTOS</b>
          </h5>
          <h5>
            <b>GANANCIAS</b>
          </h5>
        </div>

        <div className="monetaryMovements__table__content">
          <h5>${data.income}</h5>
          <h5>${data.cost}</h5>
          <h5>${data.profit}</h5>
        </div>
      </div>
      <div className="monetaryMovements__footer">
        <div className="monetaryMovements__footer__excel">
          <button onClick={exportToExcel}>
            <IoArrowRedoSharp />
            EXPORTAR A EXCEL
          </button>
        </div>
      </div>
    </main>
  ) : (
    <>
      <h4 className="monetaryMovements__noResults">
        No se realizaron compras dentro de las fechas especificadas.
      </h4>
    </>
  );
}
