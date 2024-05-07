import { Suspense, lazy, useEffect, useState } from "react";
import { FaClock } from "react-icons/fa6";
import { PurchaseOrder } from "../../interfaces/PurchaseOrder";
import { useStore as useCurrentUser } from "../../store/CurrentUserStore";
import { getAllPurchaseOrder } from "../../functions/PurchaseOrderAPI";
import Loader from "../../components/loader/Loader";
import "./userOrders.css";
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
  number: Math.floor(Math.random() * (999999 - 100000 + 1) + 100000),
  estimatedEndTime: 0,
  shippingType: "Retiro en el local",
  paymentMethod: "Efectivo",
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
  status: { id: 1, status: "A confirmar" },
  details: null,
};

export default function UserOrders() {
  const { user } = useCurrentUser();
  const [orders, setOrders] = useState<PurchaseOrder[]>();
  const [order, setOrder] = useState<PurchaseOrder>(
    PURCHASE_ORDER_INITIAL_STATE
  );
  const [filterOrders, setFilterOrders] = useState<PurchaseOrder[]>();
  const [invoices, setInvoices] = useState<Invoice[]>();

  const [open, setOpen] = useState(false);
  const [isLoaded, setisLoaded] = useState(false);

  const handleOpen = (orderParam: PurchaseOrder) => {
    setOpen(true);
    setOrder(orderParam);
  };

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
            order.status?.status != "Entregado" &&
            order.active
        )
      );
      setisLoaded(true);
    }
  }, [user, orders]);

  return (
    <Suspense fallback={<Loader />}>
      <div className="userOrders__container">
        <div className="userOrders__table">
          <div className="userOrders__header">
            <h1 className="userOrders__header__title">
              {isLoaded && (filterOrders ? "Mis órdenes" : "No hay órdenes")}
            </h1>
          </div>

          <div
            className={`userOrders__labels ${
              filterOrders?.length && filterOrders.length > 0 ? "" : "hide"
            }`}
          >
            <span className="userOrders__span">
              <b>N° de orden</b>
            </span>
            <span className="userOrders__span">
              <b>Total</b>
            </span>
            <span className="userOrders__span">
              <b>Tiempo estimado</b>
            </span>
          </div>

          <div className="userOrders__content">
            {filterOrders?.map((order: PurchaseOrder) => (
              <div className="userOrders__card" key={order.id}>
                <span className="userOrders__span">
                  Orden N° {order.number}
                </span>
                <span className="userOrders__span">${order.total}</span>
                <span className="userOrders__span">
                  <FaClock /> {order.estimatedEndTime} m.
                </span>
                <div className="userOrders__card__buttons">
                  <button
                    className="userOrders__card__button"
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
                            <button className="userOrders__card__button">
                              Factura
                            </button>
                          </PDFDownloadLink>
                        );
                      }
                    })()}
                </div>
              </div>
            ))}
          </div>
        </div>
        <ModalOrderDetails
          open={open}
          setOpen={setOpen}
          purchaseOrder={order}
        />
      </div>
    </Suspense>
  );
}
