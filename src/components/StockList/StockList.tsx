import { useState, useEffect } from "react";
import { Stock } from "../../interface/Stock";
import StockItem from "./StockItem";

const StockList = () => {
  const [stockArray, setStockArray] = useState<Stock[]>([]);

  useEffect(() => {
    fetch("./ArticuloInsumo.json")
      .then((res) => res.json())
      .then((data) => {
        setStockArray(data);
      });
  }, []);
  return (
    <div className="d-inline-flex flex-column gap-2 position-absolute top-50 start-50 translate-middle w-75">
      <button className="w-25 btn btn-primary">Añadir</button>
      <div className="d-inline-flex flex-row justify-content-around mb-1 p-2 gap-5 text-bg-dark border border-black">
        <p>Denominacion</p>
        <p>DeAlta?</p>
        <div className="d-flex flex-row gap-5 px-4">
          <p>Boton baja</p>
          <p>Boton Alta</p>
        </div>
      </div>
      {stockArray.map((stock) => {
        return <StockItem key={stock.idArticuloInsumo} stockItem={stock} />;
      })}
    </div>
  );
};

export default StockList;
