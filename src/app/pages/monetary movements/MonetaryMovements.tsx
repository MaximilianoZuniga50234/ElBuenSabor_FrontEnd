import { Suspense, lazy, useEffect, useState } from "react";
import "./monetaryMovements.css";
import Loader from "../../components/loader/Loader";
import { PurchaseOrder } from "../../interfaces/PurchaseOrder";
import { toast } from "sonner";
import { useStore } from "../../store/CurrentUserStore";
import { FaSearch } from "react-icons/fa";
import { getAllPurchaseOrder } from "../../functions/PurchaseOrderAPI";
import { PurchaseOrderDetail } from "../../interfaces/PurchaseOrderDetail";

const MonetaryMovementsTable = lazy(
  () => import("../../components/monetary movements/MonetaryMovementsTable")
);

export default function MonetaryMovements() {
  const [filteredOrders, setFilteredOrders] = useState<PurchaseOrder[]>();
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>();
  const [totalAmounts, setTotalAmounts] = useState({
    income: 0,
    cost: 0,
    profit: 0,
  });

  const { user } = useStore();

  const [isLoading, setIsLoading] = useState(true);
  const [datesToFilter, setDatesToFilter] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const getPurchaseOrders = async () => {
    try {
      const response = await getAllPurchaseOrder();
      response && setPurchaseOrders(response);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPurchaseOrders();
  }, []);

  useEffect(() => {
    if (purchaseOrders) {
      setFilteredOrders(purchaseOrders);
    }
  }, [purchaseOrders]);

  useEffect(() => {
    if (user && filteredOrders) {
      setIsLoading(false);
      if (filteredOrders?.length > 0) {
        setTotalAmounts({ income: 0, cost: 0, profit: 0 });

        let income = 0;
        let cost = 0;
        let profit = 0;
        filteredOrders.forEach((order: PurchaseOrder) => {
          order.details?.forEach((detail: PurchaseOrderDetail) => {
            detail.product?.details.forEach((productDetail) => {
              cost =
                cost + productDetail.stock.purchasePrice * productDetail.amount;
            });
          });

          income += order.total;
        });

        profit = income - cost;

        setTotalAmounts({ income: income, cost: cost, profit: profit });
      } else {
        setTotalAmounts({ income: 0, cost: 0, profit: 0 });
      }
    }
  }, [user, filteredOrders]);

  const handleChangeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = new Date(e.target.value);
    newStartDate.setDate(newStartDate.getDate() + 1);
    newStartDate.setHours(0);
    setDatesToFilter({
      ...datesToFilter,
      startDate: newStartDate,
    });
  };

  const handleChangeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = new Date(e.target.value);
    newEndDate.setDate(newEndDate.getDate() + 1);
    newEndDate.setHours(23);
    newEndDate.setMinutes(59);
    newEndDate.setSeconds(59);
    setDatesToFilter({
      ...datesToFilter,
      endDate: new Date(newEndDate),
    });
  };

  const handleClick = () => {
    if (
      isNaN(datesToFilter.startDate.getTime()) &&
      isNaN(datesToFilter.endDate.getTime())
    ) {
      setFilteredOrders(purchaseOrders);
    } else if (datesToFilter.startDate.getHours() != 0) {
      toast.error("Debe especificar una fecha de inicio para filtrar.");
    } else if (
      datesToFilter.endDate.getHours() != 23 ||
      datesToFilter.endDate.getMinutes() != 59 ||
      datesToFilter.endDate.getSeconds() != 59
    ) {
      toast.error("Debe especificar una fecha de fin para filtrar.");
    } else if (
      datesToFilter.startDate.getTime() > datesToFilter.endDate.getTime()
    ) {
      toast.error("La fecha de inicio debe ser menor que la de fin.");
    } else {
      const orders = purchaseOrders?.filter((order: PurchaseOrder) => {
        const orderDate = new Date(order.fecha);
        return (
          orderDate >= datesToFilter.startDate &&
          orderDate <= datesToFilter.endDate
        );
      });
      setFilteredOrders(orders);
    }
  };

  return (
    <Suspense fallback={<Loader />}>
      <div className="monetaryMovements__container">
        <div className="monetaryMovements__header">
          <h3 className="monetaryMovements__title">Movimientos monetarios</h3>
          <div className="monetaryMovements__filter">
            <input type="date" onChange={handleChangeStartDate} />
            <label>-</label>
            <input type="date" onChange={handleChangeEndDate} />
            <button onClick={handleClick}>
              <FaSearch />
            </button>
          </div>
        </div>

        {!isLoading && (
          <MonetaryMovementsTable
            datesToFilter={datesToFilter}
            data={totalAmounts}
          />
        )}
      </div>
    </Suspense>
  );
}
