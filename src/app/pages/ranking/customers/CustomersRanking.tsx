import React, { Suspense, lazy, useEffect, useState } from "react";
import "./customersRanking.css";
import { PurchaseOrder } from "../../../interfaces/PurchaseOrder";
import { toast } from "sonner";
import { FaSearch } from "react-icons/fa";
import { getAllPurchaseOrder } from "../../../functions/PurchaseOrderAPI";
import Loader from "../../../components/loader/Loader";
import { getAllPerson } from "../../../functions/PersonAPI";
import { Person } from "../../../interfaces/Person";
import { useStore } from "../../../store/CurrentUserStore";
import NoPermissions from "../../../components/noPermissions/NoPermissions";

const CustomersRankingTable = lazy(
  () => import("../../../components/ranking/customers/CustomersRankingTable")
);

export default function CustomersRanking() {
  const [filteredOrders, setFilteredOrders] = useState<PurchaseOrder[]>();
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>();
  const { user } = useStore();

  const [filteredPersons, setFilteredPersons] = useState<Person[]>([]);
  const [persons, setPersons] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterForAmount, setFilterForAmount] = useState(true);

  const [datesToFilter, setDatesToFilter] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const getPurchaseOrders = async () => {
    try {
      const response = await getAllPurchaseOrder();
      response && setPurchaseOrders(response.filter((order: PurchaseOrder) => order.active && order.status?.status != "Anulado"));
    } catch (err) {
      console.error(err);
    }
  };

  const getPersons = async () => {
    try {
      const response = await getAllPerson();
      response && setPersons(response);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPurchaseOrders();
    getPersons();
  }, []);

  useEffect(() => {
    if (purchaseOrders) {
      setFilteredOrders(purchaseOrders);
    }
  }, [purchaseOrders]);

  useEffect(() => {
    if (user && filteredOrders) {
      setIsLoading(false);
      if (persons.length > 1 && filteredOrders?.length > 0) {
        persons.forEach((p) => {
          if (p.ordersQuantity) {
            p.ordersQuantity = 0;
            p.totalOrdersAmount = 0;
          }
        });

        filteredOrders.forEach((order: PurchaseOrder) => {
          const personIndex = persons?.findIndex(
            (person: Person) => person.id === order.person?.id
          );

          if (personIndex !== -1) {
            const totalAmount = persons[personIndex].totalOrdersAmount ?? 0;
            const quantity = persons[personIndex].ordersQuantity ?? 0;
            persons[personIndex] = {
              ...persons[personIndex],
              ordersQuantity: quantity ? quantity + 1 : 1,
              totalOrdersAmount: totalAmount
                ? totalAmount + order.total
                : order.total,
            };
          }
        });
      }
    }
  }, [persons, user, filteredOrders]);

  useEffect(() => {
    if (filteredOrders?.length != 0) {
      if (persons) {
        if (filterForAmount) {
          setFilteredPersons(
            persons
              .filter((p: Person) => p.totalOrdersAmount)
              .sort((a, b) => {
                return a.totalOrdersAmount && b.totalOrdersAmount
                  ? b.totalOrdersAmount - a.totalOrdersAmount
                  : 1;
              })
          );
        } else {
          setFilteredPersons(
            persons
              .filter((p: Person) => p.ordersQuantity)
              .sort((a, b) => {
                if (a.ordersQuantity && b.ordersQuantity) {
                  const comparison = b.ordersQuantity - a.ordersQuantity;

                  if (
                    a.totalOrdersAmount &&
                    b.totalOrdersAmount &&
                    comparison === 0
                  ) {
                    return b.totalOrdersAmount - a.totalOrdersAmount;
                  }
                  return comparison;
                }
                return 1;
              })
          );
        }
      }
    } else {
      setFilteredPersons([]);
    }
  }, [persons, filteredOrders, filterForAmount]);

  useEffect(() => {
    const newFilteredPersons = [...filteredPersons];

    if (filterForAmount) {
      newFilteredPersons.sort((a, b) => {
        return a.totalOrdersAmount && b.totalOrdersAmount
          ? b.totalOrdersAmount - a.totalOrdersAmount
          : 1;
      });
    } else {
      newFilteredPersons.sort((a, b) => {
        return a.ordersQuantity && b.ordersQuantity
          ? b.ordersQuantity - a.ordersQuantity
          : 1;
      });
    }

    setFilteredPersons(newFilteredPersons);
  }, [filterForAmount]);

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
      toast.success("Pedidos filtrados correctamente.");
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
      toast.success("Pedidos filtrados correctamente.");
    }
  };

  const handleChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterForAmount(e.target.value === "Ordenar por importe" ? true : false);
  };

  return (
    user?.role && (
      <Suspense fallback={<Loader />}>
        {user?.role === "Administrador" ? (
          <div className="customersRanking__container">
            <div className="customersRanking__header">
              <h2 className="customersRanking__title">Ranking de clientes</h2>
              <div className="customersRanking__filter">
                <input type="date" onChange={handleChangeStartDate} />
                <label>-</label>
                <input type="date" onChange={handleChangeEndDate} />
                <button onClick={handleClick}>
                  <FaSearch />
                </button>
              </div>
            </div>
            {filteredOrders && filteredOrders?.length > 0 && (
              <div className="customersRanking__options">
                <select
                  className="customersRanking__select"
                  onChange={handleChangeOption}
                >
                  <option value="Ordenar por importe">
                    Ordenar por importe
                  </option>
                  <option value="Ordenar por cantidad de pedidos">
                    Ordenar por cantidad de pedidos
                  </option>
                </select>
              </div>
            )}
            {!isLoading && (
              <CustomersRankingTable
                customers={filteredPersons}
                datesToFilter={datesToFilter}
                orders={filteredOrders ?? []}
              />
            )}
          </div>
        ) : (
          <NoPermissions />
        )}
      </Suspense>
    )
  );
}
