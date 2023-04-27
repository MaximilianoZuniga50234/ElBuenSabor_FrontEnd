import { Stock } from "../../interface/Stock";

interface Props {
  stockItem: Stock;
}

const StockItem = ({ stockItem }: Props) => {
  const estadoStock = document.getElementById(
    `statusStock${stockItem.idArticuloInsumo}`
  );

  return (
    <div
      className="d-inline-flex flex-row justify-content-around mb-1 p-2 gap-5 text-bg-dark border border-black"
      key={stockItem.idArticuloInsumo}
    >
      <p>{stockItem.denominacion}</p>
      <p id={`statusStock${stockItem.idArticuloInsumo}`}>
        {stockItem.deAlta.toString()}
      </p>
      <div className="d-flex flex-row gap-3">
        <button
          className="btn btn-danger"
          id="stockStatusbutton"
          onClick={() => {
            if (estadoStock) estadoStock.innerHTML = "false";
            stockItem.deAlta = false;
          }}
        >
          Dar de baja
        </button>
        <button
          className="btn btn-success"
          id="stockStatusbutton"
          onClick={() => {
            if (estadoStock) estadoStock.innerHTML = "true";
            stockItem.deAlta = true;
          }}
        >
          Dar de alta
        </button>
      </div>
    </div>
  );
};

export default StockItem;
