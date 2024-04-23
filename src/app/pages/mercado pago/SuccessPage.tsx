import { useEffect, useState } from "react";
import "./postPaymentPage.css";
import { Link, useLocation } from "react-router-dom";
import { PurchaseOrder } from "../../interfaces/PurchaseOrder";
import { useStore as useToken } from "../../store/UserTokenStore";
import { CreditNote } from "../../interfaces/CreditNote";
import { toast } from "sonner";
import {
  createPurchaseOrder,
  getAllPurchaseOrder,
} from "../../functions/PurchaseOrderAPI";
import {
  getAllCreditNotes,
  updateCreditNote,
} from "../../functions/CreditNoteAPI";
import { updateStock } from "../../functions/StockAPI";
import { useStore as useCart } from "../../store/CartStore";
import { useStore as useCurrentUser } from "../../store/CurrentUserStore";
import { Invoice, InvoiceDetail } from "../../interfaces/Invoice";
import { createInvoice } from "../../functions/InvoiceAPI";
import { MercadoPagoData } from "../../interfaces/MercadoPagoData";

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

const INVOICE_INITIAL_STATE = {
  id: 0,
  date: new Date(),
  discountAmount: 0,
  totalSale: 0,
  totalCost: 0,
  active: true,
  purchaseOrder: PURCHASE_ORDER_INITIAL_STATE,
  details: [],
};

export default function SuccesPage() {
  const location = useLocation();
  const { token } = useToken();
  const { clear } = useCart();
  const { user } = useCurrentUser();

  const [purchaseOrder, setPurchaseOrder] = useState<PurchaseOrder>();
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>();
  const [invoice, setInvoice] = useState<Invoice>(INVOICE_INITIAL_STATE);
  const [creditNotes, setCreditNotes] = useState<CreditNote[]>();
  const [userCreditNotes, setUserCreditNotes] = useState<CreditNote[]>();
  const [totalCreditNoteAmount, setTotalCreditNoteAmount] = useState<number>();
  const [mercadoPagoData, setMercadoPagoData] = useState<MercadoPagoData>();

  useEffect(() => {
    const order = localStorage.getItem("order");
    if (order && !purchaseOrder) {
      setPurchaseOrder(JSON.parse(order));
    }
    getCreditNotes();

    const params = new URLSearchParams(location.search);
    const queryParams: { [key: string]: string } = {};
    params.forEach((value, key) => {
      queryParams[key] = value;
    });

    setMercadoPagoData({
      id: 0,
      collectionId: queryParams.collection_id,
      collectionStatus: queryParams.collection_status,
      externalReference: queryParams.external_reference,
      merchantAccountId: queryParams.merchant_account_id,
      merchantOrderId: queryParams.merchant_order_id,
      paymentId: queryParams.payment_id,
      paymentType: queryParams.payment_type,
      preferenceId: queryParams.preference_id,
      processingMode: queryParams.processing_mode,
      siteId: queryParams.site_id,
      status: queryParams.status,
    });
  }, []);

  const getCreditNotes = async () => {
    const response = await getAllCreditNotes();
    setCreditNotes(response);
  };

  useEffect(() => {
    if (user && creditNotes) {
      if (creditNotes.length > 0) {
        setUserCreditNotes(
          creditNotes.filter(
            (note: CreditNote) =>
              note.purchaseOrder.person?.user_id === user.user_id && note.active
          )
        );
      } else {
        setUserCreditNotes([]);
      }
    }
  }, [creditNotes, user]);

  useEffect(() => {
    if (userCreditNotes) {
      if (userCreditNotes.length > 0) {
        let totalCreditNote = 0;
        userCreditNotes.forEach((note: CreditNote) => {
          totalCreditNote *= note.total;
        });
        setTotalCreditNoteAmount(totalCreditNote);
      } else {
        setTotalCreditNoteAmount(0);
      }
    }
  }, [userCreditNotes]);

  useEffect(() => {
    if (
      purchaseOrder &&
      token != "" &&
      userCreditNotes &&
      totalCreditNoteAmount != undefined
    ) {
      createOrder();
    }
  }, [purchaseOrder, token, userCreditNotes, totalCreditNoteAmount]);

  const createOrder = async () => {
    if (purchaseOrder) {
      let response = null;

      if (userCreditNotes && userCreditNotes.length > 0) {
        if (
          totalCreditNoteAmount &&
          purchaseOrder.total >= totalCreditNoteAmount
        ) {
          response = await createPurchaseOrder(
            {
              ...purchaseOrder,
              status: { id: 2, status: "Facturado" },
            },
            token
          );

          userCreditNotes.forEach((note: CreditNote) => {
            updateCreditNote({ ...note, total: 0, active: false }, token);
          });
        } else {
          response = await createPurchaseOrder(
            { ...purchaseOrder, status: { id: 2, status: "Facturado" } },
            token
          );

          let totalOrder = purchaseOrder.total;

          userCreditNotes.forEach((note: CreditNote) => {
            if (totalOrder >= note.total) {
              totalOrder = totalOrder - note.total;
              updateCreditNote({ ...note, total: 0, active: false }, token);
            } else {
              updateCreditNote(
                { ...note, total: note.total - totalOrder },
                token
              );
            }
          });
        }
      } else {
        response = await createPurchaseOrder(
          { ...purchaseOrder, status: { id: 2, status: "Facturado" } },
          token
        );
      }

      if (response) {
        localStorage.removeItem("order");

        toast.success("Orden creada correctamente.");

        if (purchaseOrder.details) {
          for (const detail of purchaseOrder.details) {
            if (detail.product?.details) {
              for (const productDetail of detail.product.details) {
                await updateStock(
                  {
                    ...productDetail.stock,
                    currentStock:
                      productDetail.stock.currentStock -
                      productDetail.amount * detail.amount,
                  },
                  token
                );
              }
            }
          }
        }
        const orders = await getAllPurchaseOrder();
        if (orders) {
          const userOrders = orders.filter(
            (o: PurchaseOrder) => o.person?.user_id === user?.user_id
          );
          if (userOrders) {
            setPurchaseOrders(userOrders);
          }
        }
      } else {
        toast.error("Error al crear la orden.");
      }
      clear();
    }
  };

  useEffect(() => {
    if (purchaseOrders && purchaseOrders?.length > 0 && mercadoPagoData) {
      generateInvoice();
    }
  }, [purchaseOrders]);

  const generateInvoice = () => {
    let totalPrice = 0;
    if (purchaseOrder && purchaseOrder.details) {
      const invoiceDetails: InvoiceDetail[] = purchaseOrder.details.map(
        (detail) => {
          totalPrice += detail.subtotal;
          return {
            amount: detail.amount,
            subtotal: detail.subtotal,
            product: detail.product,
            stock: detail.stock,
          } as InvoiceDetail;
        }
      );

      setInvoice({
        ...invoice,
        discountAmount:
          purchaseOrder.shippingType === "Retiro en el local"
            ? totalPrice * 0.1
            : 0,
        totalCost: totalPrice,
        totalSale: purchaseOrder.total,
        purchaseOrder: purchaseOrders
          ? purchaseOrders[purchaseOrders?.length - 1]
          : purchaseOrder,
        details: invoiceDetails,
        mercadoPagoData: mercadoPagoData,
      });
    }
  };

  useEffect(() => {
    if (invoice.details.length > 0) {
      postInvoice();
    }
  }, [invoice]);

  const postInvoice = async () => {
    try {
      await createInvoice(invoice, token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="postPaymentPage__container">
      <div className="postPaymentPage__content">
        <h1>¡Su pago fue realizado con éxito!</h1>
        <button className="postPaymentPage__button">
          <Link to="/u/orders">Ir a "Mis órdenes"</Link>
        </button>
      </div>
    </div>
  );
}
