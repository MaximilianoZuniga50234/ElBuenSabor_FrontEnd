import "./rankingTable.css";
import { Product } from "../../interfaces/Product";
import { useEffect, useState } from "react";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";
import { IoArrowRedoSharp } from "react-icons/io5";
import * as XLSX from "xlsx";

export interface Drinks {
  id: number;
  denomination: string;
  quantitySold: number;
}

interface RankingTableProps {
  products: Product[] | Drinks[];
  showProducts: boolean;
  datesToFilter: { startDate: Date; endDate: Date };
}

export default function RankingTable({
  products,
  showProducts,
  datesToFilter,
}: RankingTableProps) {
  const [paginaActual, setPaginaActual] = useState<number>(1);

  const indiceInicio = (paginaActual - 1) * 10;
  const indiceFin =
    products.length < paginaActual * 10 ? products.length : paginaActual * 10;

  useEffect(() => {
    setPaginaActual(1);
  }, [showProducts]);

  const elementosPaginaActual = products.slice(indiceInicio, indiceFin);

  const handleChangePage = (n: number) => {
    n === 0
      ? setPaginaActual(1)
      : n === 2
      ? setPaginaActual(Math.ceil(products.length / 10))
      : setPaginaActual(paginaActual + n);
  };

  const exportToExcel = () => {
    const titulo = [
      {
        A:
          datesToFilter.startDate.getTime() === datesToFilter.endDate.getTime()
            ? `${
                showProducts ? "Productos vendidos" : "Bebidas vendidas"
              } hasta el día de la fecha.`
            : `${showProducts ? "Productos vendidos" : "Bebidas vendidas"} ${
                datesToFilter.startDate.getDay() !=
                datesToFilter.endDate.getDay()
                  ? `entre el ${datesToFilter.startDate.toLocaleDateString()} y el ${datesToFilter.endDate.toLocaleDateString()}. `
                  : `el ${datesToFilter.startDate.toLocaleDateString()}`
              }`,
      },
      {},
    ];
    const longitudesColumnas = [10, 35, 20];

    const tabla = [
      {
        A: "Id",
        B: "Producto",
        C: "Cantidad Vendida",
      },
    ];

    products.forEach((p: Product | Drinks) => {
      tabla.push({
        A: p.id.toString(),
        B: p.denomination,
        C: p.quantitySold?.toString() ?? "0",
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
    XLSX.utils.book_append_sheet(
      libro,
      hoja,
      `${showProducts ? "Productos" : "Bebidas"}`
    );
    XLSX.writeFile(
      libro,
      `${
        showProducts ? "Ranking de productos.xlsx" : "Ranking de bebidas.xlsx"
      }`
    );
  };

  return products.length > 0 ? (
    <main className="productsRanking__table">
      <div className="productsRanking__table__container">
        <div className="productsRanking__table__header">
          <h5 className="productsRanking__table__header__text">
            <b>Producto</b>
          </h5>
          <h5 className="productsRanking__table__header__text">
            <b>Cantidad vendida</b>
          </h5>
        </div>

        <div className="productsRanking__table__content">
          {elementosPaginaActual?.map((product) => (
            <div
              key={product.id}
              className="productsRanking__table__content__product"
            >
              <h5 className="productsRanking__table__content__product__text">
                {product.denomination}
              </h5>
              <h5 className="productsRanking__table__content__product__text">
                {product.quantitySold}
              </h5>
            </div>
          ))}
        </div>
      </div>
      <div className="productsRanking__footer">
        <div className="productsRanking__footer__excel">
          <button onClick={exportToExcel}>
            <IoArrowRedoSharp />
            EXPORTAR A EXCEL
          </button>
        </div>
        <div className="productsRanking__footer__pagination">
          <div className="productsRanking__footer__pagination__info">
            {indiceInicio} - {indiceFin} de {products.length}
          </div>
          <div className="productsRanking__footer__pagination__actions">
            {products.length > 10 && paginaActual > 1 && (
              <HiOutlineChevronDoubleLeft
                className="productsRanking__footer__pagination__arrow"
                onClick={() => handleChangePage(0)}
              />
            )}
            {products.length > 10 && paginaActual > 1 && (
              <HiOutlineChevronLeft
                className="productsRanking__footer__pagination__arrow"
                onClick={() => handleChangePage(-1)}
              />
            )}
            {products.length > 10 &&
              paginaActual !== Math.ceil(products.length / 10) && (
                <HiOutlineChevronRight
                  className="productsRanking__footer__pagination__arrow"
                  onClick={() => handleChangePage(1)}
                />
              )}
            {products.length > 10 &&
              paginaActual !== Math.ceil(products.length / 10) && (
                <HiOutlineChevronDoubleRight
                  className="productsRanking__footer__pagination__arrow"
                  onClick={() => handleChangePage(2)}
                />
              )}
          </div>
        </div>
      </div>
    </main>
  ) : (
    <>
      <h4 className="productsRanking__noResults">
        No se vendió ningún producto dentro de las fechas especificadas.
      </h4>
    </>
  );
}
