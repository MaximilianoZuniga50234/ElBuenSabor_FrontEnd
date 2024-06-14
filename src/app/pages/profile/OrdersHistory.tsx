import { Suspense, lazy, useEffect, useState } from "react";
import { PurchaseOrder } from "../../interfaces/PurchaseOrder";
import { useStore as useCurrentUser } from "../../store/CurrentUserStore";
import { getAllPurchaseOrder } from "../../functions/PurchaseOrderAPI";
import Loader from "../../components/loader/Loader";
import "./ordersHistory.css";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePdf from "../../components/invoice/InvoicePdf";
import { Invoice } from "../../interfaces/Invoice";
import { getAllInvoice } from "../../functions/InvoiceAPI";

const ModalOrderDetails = lazy(
  () => import("../../components/modalOrderDetails/ModalOrderDetails")
);

const PURCHASE_ORDER_INITIAL_STATE = {
  id: 0,
  fecha: new Date(),
  number: 0,
  estimatedEndTime: 0,
  shippingType: "",
  paymentMethod: "",
  total: 0,
  amountToPaid: 0,
  active: true,
  person: {
    id: "0",
    name: "",
    email: "",
    lastName: "",
    phoneNumber: "",
    user_id: "",
  },
  address: {
    id: 0,
    street: "",
    number: 0,
    department: { id: 0, name: "" },
    person: {
      id: "0",
      name: "",
      email: "",
      lastName: "",
      phoneNumber: "",
      user_id: "",
    },
  },
  status: { id: 0, status: "" },
  details: null,
};

export default function OrdersHistory() {
  const { user } = useCurrentUser();

  const getDate = (order: PurchaseOrder) => {
    const fecha = order?.fecha ? new Date(order?.fecha) : null;
    return fecha ? (
      <span className="ordersHistory__span">{fecha.toLocaleDateString()}</span>
    ) : null;
  };

  const [orders, setOrders] = useState<PurchaseOrder[]>();
  const [order, setOrder] = useState<PurchaseOrder>(
    PURCHASE_ORDER_INITIAL_STATE
  );

  const [filterOrders, setFilterOrders] = useState<PurchaseOrder[]>();
  const [invoices, setInvoices] = useState<Invoice[]>();

  const [open, setOpen] = useState(false);
  const handleOpen = (orderParam: PurchaseOrder) => {
    setOpen(true);
    setOrder(orderParam);
  };
  const [isLoaded, setisLoaded] = useState(false);

  const getOrders = async () => {
    try {
      const response = await getAllPurchaseOrder();
      setOrders(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getInvoices = async () => {
    try {
      const response = await getAllInvoice();
      setInvoices(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOrders();
    getInvoices();
  }, []);

  useEffect(() => {
    if (user && orders && orders.length > 0) {
      setFilterOrders(
        orders.filter(
          (order: PurchaseOrder) =>
            order.person?.user_id === user?.user_id &&
            order.status?.status === "Entregado"
        )
      );
      setisLoaded(true);
    }
  }, [user, orders]);

  return (
    <Suspense fallback={<Loader />}>
      <div className="ordersHistory__container">
        <div className="ordersHistory__table">
          <div className="ordersHistory__header">
            <div className="ordersHistory__title">
              <h3 className="ordersHistory__h3">
                {isLoaded && (filterOrders && filterOrders?.length > 0 ? "Historial de órdenes" : "No hay órdenes")}
              </h3>
            </div>
          </div>

          <div
            className={`ordersHistory__labels ${
              filterOrders?.length && filterOrders.length > 0 ? "" : "hide"
            }`}
          >
            <span className="ordersHistory__span">
              <b>N° de pedido</b>
            </span>
            <span className="ordersHistory__span">
              <b>Fecha</b>
            </span>
            <span className="ordersHistory__span">
              <b>Total </b>
            </span>
          </div>

          <div
            className={`ordersHistory__cards__container ${
              filterOrders?.length && filterOrders.length > 0 ? "" : "hide"
            }`}
          >
            <div className="ordersHistory__card__labels">
              <span className="ordersHistory__span">
                <b>N° de pedido</b>
              </span>
              <span className="ordersHistory__span">
                <b>Fecha</b>
              </span>
              <span className="ordersHistory__span">
                <b>Total </b>
              </span>
            </div>

            {filterOrders?.map((order: PurchaseOrder) => (
              <div className="ordersHistory__card" key={order.id}>
                <div className="ordersHistory__card__info">
                  <span className="ordersHistory__span">{order.id}</span>
                  {getDate(order)}
                  <span className="ordersHistory__span">${order.total}</span>
                </div>
                <div className="ordersHistory__card__buttons">
                  <button
                    className="ordersHistory__button"
                    onClick={() => {
                      handleOpen(order);
                    }}
                  >
                    Detalles
                  </button>
                  {order.status?.status != "Por aceptar" &&
                    invoices &&
                    invoices.length > 0 &&
                    (() => {
                      const invoice = invoices.find(
                        (i) => i.purchaseOrder.id === order.id
                      );

                      if (invoice) {
                        return (
                          <PDFDownloadLink
                            document={<InvoicePdf invoice={invoice} />}
                            fileName={`Factura_${invoice.id}.pdf`}
                          >
                            <button className="ordersHistory__button">
                              Factura
                            </button>
                          </PDFDownloadLink>
                        );
                      }
                    })()}
                </div>
              </div>
            ))}

            <ModalOrderDetails
              open={open}
              setOpen={setOpen}
              purchaseOrder={order}
            ></ModalOrderDetails>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
