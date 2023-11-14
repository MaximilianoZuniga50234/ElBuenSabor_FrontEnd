import { FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";
import { useStore } from "../../store/PurchaseOrderStore";
import "./orders.css";
import Table from "../../components/orders/OrdersTable";
import { FormEvent, MouseEvent, useState } from "react";

const Orders = () => {
  const [active, setActive] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  // const [search, setSearch] = useState<string>("");
  const orders = useStore().purchaseOrders;
  const filterOrders =
    filter === "" ? orders : orders.filter((o) => o.status.status === filter);

  const handleDrop = () => {
    setActive(!active);
  };

  const handleFilter = (e: MouseEvent<HTMLLIElement>) => {
    setFilter(e.currentTarget.innerText);
    setActive(false);
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <main className="main_employees_list">
      <div className="order_title_container">
        <h2>PEDIDOS</h2>
        <div>
          <div>
            <span className={`${active && "active"}`}>
              {filter === "" ? `Filtrar por estado...` : filter}
            </span>
            <button className={`${active && "active"}`} onClick={handleDrop}>
              {active ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
          <div className={`filter_order_list ${active && "active"}`}>
            <ul>
              <li
                className={`${filter === "Por aceptar" ? "active" : ""}`}
                onClick={handleFilter}
              >
                Por aceptar
              </li>
              <li
                className={`${filter === "A cocina" ? "active" : ""}`}
                onClick={handleFilter}
              >
                A cocina
              </li>
              <li
                className={`${filter === "Listo" ? "active" : ""}`}
                onClick={handleFilter}
              >
                Listo
              </li>
              <li
                className={`${filter === "En camino" ? "active" : ""}`}
                onClick={handleFilter}
              >
                En camino
              </li>
              <li
                className={`${filter === "Facturado" ? "active" : ""}`}
                onClick={handleFilter}
              >
                Facturado
              </li>
            </ul>
          </div>
        </div>
        <form onSubmit={handleSearch}>
          <input type="text" placeholder="Buscar por cliente" />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
      </div>
      <Table datos={filterOrders} />
    </main>
  );
};

export default Orders;
