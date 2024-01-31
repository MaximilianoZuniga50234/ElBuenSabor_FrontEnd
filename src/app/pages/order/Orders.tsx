import { MouseEvent, useState, useEffect, lazy, Suspense } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";
import { PurchaseOrder } from "../../interfaces/PurchaseOrder";
import { getAllPurchaseOrder } from "../../functions/PurchaseOrderAPI";
import { useStore as useUser } from "../../store/CurrentUserStore";
import Loader from "../../components/loader/Loader";
import "./orders.css";

const NoPermissions = lazy(
  () => import("../../components/noPermissions/NoPermissions")
);
const Table = lazy(() => import("../../components/orders/OrdersTable"));

const Orders = () => {
  const [active, setActive] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [changeOrderStatus, setChangeOrderStatus] = useState<boolean>(false);
  const { user } = useUser();
  const { isAuthenticated } = useAuth0();
  const [filterOrders, setFilterOrders] = useState<PurchaseOrder[]>([]);
  const [idFilter, setIdFilter] = useState<number>(0);

  const handleDrop = () => {
    setActive(!active);
  };

  const handleFilter = (e: MouseEvent<HTMLLIElement>) => {
    setFilter(e.currentTarget.innerText);
    setActive(false);
  };

  const handleSearch = () => {
    setFilterOrders(
      idFilter != 0 ? orders.filter((o) => o.id === idFilter) : orders
    );
  };

  const getAllItems = async () => {
    try {
      const response = await getAllPurchaseOrder();
      setOrders(response);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    getAllItems();
  }, []);

  useEffect(() => {
    if (changeOrderStatus === true) {
      getAllItems();
      setChangeOrderStatus(false);
    }
  }, [changeOrderStatus]);

  useEffect(() => {
    if (user?.role === "Cajero") {
      if (filter === "" || filter === "Sin filtro") {
        setFilterOrders(orders);
      } else {
        setFilterOrders(orders.filter((o) => o?.status?.status === filter));
      }
    } else if (user?.role === "Cocinero") {
      setFilterOrders(orders.filter((o) => o?.status?.status === "A cocina"));
    } else if (user?.role === "Delivery") {
      setFilterOrders(
        orders.filter((o) => o?.status?.status === "En delivery")
      );
    }
  }, [filter, orders, user]);

  return (
    isAuthenticated && (
      <Suspense fallback={<Loader />}>
        {user?.role != "Cliente" ? (
          <main className="main_employees_list">
            <div className="order_title_container">
              <h2>PEDIDOS</h2>
              <div
                className={`filters_${
                  user?.role === "Cajero" ? "visible" : "hidden"
                } `}
              >
                <div>
                  <span className={`${active && "active"}`}>
                    {filter === "" ? `Filtrar por estado...` : filter}
                  </span>
                  <button
                    className={`${active && "active"}`}
                    onClick={handleDrop}
                  >
                    {active ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>
                <div className={`filter_order_list ${active && "active"}`}>
                  <ul>
                    <li
                      className={`${filter === "Sin filtro" ? "active" : ""}`}
                      onClick={handleFilter}
                    >
                      Sin filtro
                    </li>
                    <li
                      className={`${filter === "A confirmar" ? "active" : ""}`}
                      onClick={handleFilter}
                    >
                      A confirmar
                    </li>
                    <li
                      className={`${filter === "Facturado" ? "active" : ""}`}
                      onClick={handleFilter}
                    >
                      Facturado
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
                      className={`${filter === "En delivery" ? "active" : ""}`}
                      onClick={handleFilter}
                    >
                      En delivery
                    </li>
                    <li
                      className={`${filter === "Entregado" ? "active" : ""}`}
                      onClick={handleFilter}
                    >
                      Entregado
                    </li>
                  </ul>
                </div>
              </div>
              <div className="idSearcher__container">
                <input
                  type="number"
                  placeholder="Buscar por ID de cliente"
                  onChange={(e) => {
                    setIdFilter(Number(e.target.value));
                  }}
                />
                <button onClick={handleSearch}>
                  <FaSearch />
                </button>
              </div>
            </div>
            <Table
              datos={filterOrders}
              setChangeOrderStatus={setChangeOrderStatus}
            />
          </main>
        ) : (
          <>
            <NoPermissions />
          </>
        )}
      </Suspense>
    )
  );
};

export default Orders;
