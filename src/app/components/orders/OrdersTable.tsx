import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaEye, FaGear } from "react-icons/fa6";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";
import { IoArrowRedoSharp } from "react-icons/io5";
import { PurchaseOrder } from "../../interfaces/PurchaseOrder";
import { Box, Fade, Modal } from "@mui/material";
import { Status } from "../../interfaces/Status";
import { getAllState } from "../../functions/StatusAPI";
import { updatePurchaseOrder } from "../../functions/PurchaseOrderAPI";
import { useStore as useToken } from "../../store/UserTokenStore";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
import { useStore as useUser } from "../../store/CurrentUserStore";
import ModalOrderDetails from "../modalOrderDetails/ModalOrderDetails";
import { Invoice, InvoiceDetail } from "../../interfaces/Invoice";
import {
  createInvoice,
  getAllInvoice,
  updateInvoice,
} from "../../functions/InvoiceAPI";
import { CreditNote } from "../../interfaces/CreditNote";
import { createCreditNote } from "../../functions/CreditNoteAPI";
import { updateStock } from "../../functions/StockAPI";

type Props = {
  datos: PurchaseOrder[];
  setChangeOrderStatus: Dispatch<SetStateAction<boolean>>;
};

const PURCHASE_ORDER_INITIAL_STATE = {
  id: 0,
  fecha: new Date(),
  number: 0,
  estimatedEndTime: 0,
  shippingType: "",
  paymentMethod: "",
  total: 0,
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
  // mercadoPagoData: null,
  details: [],
};
const CREDIT_NOTE_INITIAL_STATE = {
  id: 0,
  date: new Date(),
  total: 0,
  purchaseOrder: PURCHASE_ORDER_INITIAL_STATE,
  invoice: INVOICE_INITIAL_STATE,
};

const Table = ({ datos, setChangeOrderStatus }: Props) => {
  const { user } = useUser();
  const { token } = useToken();
  const { isAuthenticated } = useAuth0();
  const [paginaActual, setPaginaActual] = useState<number>(1);
  const [cancelInvoice, setCancelInvoice] = useState<boolean>(false);

  const [open, setOpen] = useState(false);
  const [openModalOrderDetails, setOpenModalOrderDetails] = useState(false);
  useState(false);
  // const [isOnlyDrinks, setIsOnlyDrinks] = useState(true);

  const [allStatus, setAllStatus] = useState<Status[]>();
  const [orderStatus, setOrderStatus] = useState<string>("A confirmar");

  const [purchaseOrder, setPurchaseOrder] = useState<PurchaseOrder>(
    PURCHASE_ORDER_INITIAL_STATE
  );

  const [invoices, setInvoices] = useState<Invoice[]>();
  const [invoice, setInvoice] = useState<Invoice>(INVOICE_INITIAL_STATE);
  const [creditNote, setCreditNote] = useState<CreditNote>(
    CREDIT_NOTE_INITIAL_STATE
  );

  const indiceInicio = (paginaActual - 1) * 10;
  const indiceFin =
    datos.length < paginaActual * 10 ? datos.length : paginaActual * 10;

  const elementosPaginaActual = datos.slice(indiceInicio, indiceFin);

  const handleChangePage = (n: number) => {
    n === 0
      ? setPaginaActual(1)
      : n === 2
      ? setPaginaActual(Math.ceil(datos.length / 10))
      : setPaginaActual(paginaActual + n);
  };

  const handleOpenModalOrderDetails = (order: PurchaseOrder) => {
    setPurchaseOrder(order);
    setOpenModalOrderDetails(true);
  };

  const handleOpen = (order: PurchaseOrder) => {
    setPurchaseOrder(order);
    setOrderStatus(order.status ? order?.status?.status : "");
    setCancelInvoice(false);
    getInvoices();
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = allStatus?.find((s) => s.status === event.target.value);
    if (newStatus) {
      setPurchaseOrder({ ...purchaseOrder, status: newStatus });
    }
    setCancelInvoice(false);
  };

  const postInvoice = async () => {
    try {
      await createInvoice(invoice, token);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (invoice.details.length > 0) {
      postInvoice();
    }
  }, [invoice]);

  useEffect(() => {
    if (purchaseOrder.id != 0 && invoices && invoices?.length > 0) {
      setCreditNote({
        id: 0,
        date: new Date(),
        invoice:
          invoices?.find(
            (invoice: Invoice) => invoice.purchaseOrder.id === purchaseOrder.id
          ) ?? INVOICE_INITIAL_STATE,
        purchaseOrder: purchaseOrder,
        total: invoice.totalSale,
      });
    }
  }, [purchaseOrder, invoices]);

  const generateInvoice = () => {
    let totalPrice = 0;
    if (purchaseOrder.details) {
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
        purchaseOrder: purchaseOrder,
        details: invoiceDetails,
      });
    }
  };

  const createNoteAndUpdateInvoiceAndOrder = async () => {
    try {
      await updateInvoice({ ...creditNote.invoice, active: false }, token);
      await updatePurchaseOrder(
        { ...creditNote.purchaseOrder, active: false },
        token
      );
      await createCreditNote(creditNote, token);

      if (creditNote.purchaseOrder.details) {
        for (const detail of creditNote.purchaseOrder.details) {
          if (detail.product?.details) {
            for (const productDetail of detail.product.details) {
              await updateStock(
                {
                  ...productDetail.stock,
                  currentStock:
                    productDetail.stock.currentStock +
                    productDetail.amount * detail.amount,
                },
                token
              );
            }
          }
        }
      }
      setChangeOrderStatus(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleConfirm = async () => {
    if (
      orderStatus === "A confirmar" &&
      purchaseOrder.status?.status === "Facturado"
    ) {
      generateInvoice();
    }

    if (cancelInvoice) {
      createNoteAndUpdateInvoiceAndOrder();
    } else {
      if (isAuthenticated) {
        await updatePurchaseOrder(purchaseOrder, token);
        setChangeOrderStatus(true);
      } else {
        toast("Debes iniciar sesión");
      }
    }
    handleClose();
  };

  const getStatus = async () => {
    try {
      const response = await getAllState();
      setAllStatus(response);
    } catch (err) {
      console.error(err);
    }
  };

  const getInvoices = async () => {
    try {
      const response = await getAllInvoice();
      setInvoices(response);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  const handleChangeDeleteInvoice = () => {
    setCancelInvoice(!cancelInvoice);
  };

  // Ver si es un pedido de solo bebidas
  // useEffect(() => {
  // purchaseOrder.details?.forEach((detail) => {

  //   if (detail.product != null) {
  //     setIsOnlyDrinks(false)
  //   }

  // })
  // }, [purchaseOrder])

  return (
    <>
      <table className="orders_list_table">
        <thead>
          <tr>
            <td>N° ORDEN</td>
            <td>CLIENTE</td>
            <td>TIEMPO</td>
            <td>ENVÍO</td>
            <td>ESTADO</td>
            <td>DETALLES</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {elementosPaginaActual.map((e) => (
            <tr key={e.id}>
              <td>{`${e.id}`}</td>
              <td>{`${e.person?.name}`}</td>
              <td>{`${e.estimatedEndTime} Minutos`}</td>
              <td>{`${e.shippingType}`}</td>
              <td>{`${e.status?.status}`}</td>
              <td className="celda_acciones">
                <button
                  onClick={() => {
                    handleOpenModalOrderDetails(e);
                  }}
                >
                  <FaEye />
                </button>
              </td>
              <td className="celda_acciones">
                <button
                  onClick={() => {
                    handleOpen(e);
                  }}
                >
                  <FaGear />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <a href="?">
                <IoArrowRedoSharp />
                EXPORTAR A EXCEL
              </a>
            </td>
            <td></td>
            <td></td>
            <td>
              {indiceInicio} - {indiceFin} de {datos.length}
            </td>
            <td className="celda_acciones">
              {datos.length > 10 && paginaActual > 1 && (
                <HiOutlineChevronDoubleLeft
                  className="paginacion_flechas"
                  onClick={() => handleChangePage(0)}
                />
              )}
              {datos.length > 10 && paginaActual > 1 && (
                <HiOutlineChevronLeft
                  className="paginacion_flechas"
                  onClick={() => handleChangePage(-1)}
                />
              )}
              {datos.length > 10 &&
                paginaActual !== Math.ceil(datos.length / 10) && (
                  <HiOutlineChevronRight
                    className="paginacion_flechas"
                    onClick={() => handleChangePage(1)}
                  />
                )}
              {datos.length > 10 &&
                paginaActual !== Math.ceil(datos.length / 10) && (
                  <HiOutlineChevronDoubleRight
                    className="paginacion_flechas"
                    onClick={() => handleChangePage(2)}
                  />
                )}
            </td>
          </tr>
        </tfoot>
      </table>
      <Modal
        open={open}
        onClose={handleClose}
        slotProps={{
          backdrop: {
            timeout: 300,
          },
        }}
        disableScrollLock={true}
      >
        <Fade in={open}>
          <Box className="modalOrders__box">
            <h3 className="modalOrders__h3">Cambiar estado del pedido</h3>

            <div className="modalOrders__div">
              <h5 className="modalOrders__h5">Estado del pedido</h5>

              <select
                className="modalOrders__select"
                onChange={handleChangeStatus}
                defaultValue={orderStatus}
              >
                <option
                  value="A confirmar"
                  disabled={
                    purchaseOrder.status?.status === "Facturado" &&
                    orderStatus === "A confirmar"
                      ? false
                      : true
                  }
                >
                  A confirmar
                </option>
                <option
                  value="Facturado"
                  disabled={
                    orderStatus === "A confirmar" ||
                    (purchaseOrder.status?.status === "A cocina" &&
                      orderStatus === "Facturado")
                      ? false
                      : true
                  }
                >
                  Facturado
                </option>
                <option
                  value="A cocina"
                  disabled={
                    orderStatus === "Facturado" ||
                    (purchaseOrder.status?.status === "Listo" &&
                      orderStatus === "A cocina")
                      ? false
                      : true
                  }
                >
                  A cocina
                </option>
                <option
                  value="Listo"
                  disabled={
                    (orderStatus === "A cocina" && user?.role === "Cocinero") ||
                    ((purchaseOrder.status?.status === "En delivery" ||
                      purchaseOrder.status?.status === "Entregado") &&
                      orderStatus === "Listo")
                      ? false
                      : true
                  }
                  // disabled={isOnlyDrinks ? false : true}
                >
                  Listo
                </option>

                <option
                  value="En delivery"
                  disabled={
                    purchaseOrder.shippingType === "Envío a domicilio" &&
                    (orderStatus === "Listo" ||
                      (purchaseOrder.status?.status === "Entregado" &&
                        orderStatus === "En delivery"))
                      ? false
                      : true
                  }
                >
                  En delivery
                </option>
                <option
                  value="Entregado"
                  disabled={
                    (orderStatus === "En delivery" &&
                      user?.role === "Delivery") ||
                    (orderStatus === "Listo" &&
                      purchaseOrder.shippingType === "Retiro en el local")
                      ? false
                      : true
                  }
                >
                  Entregado
                </option>
              </select>
            </div>

            {orderStatus === "Facturado" &&
              purchaseOrder.status?.status === "Facturado" && (
                <div className="modalOrders__deleteInvoice">
                  <button
                    className="modalOrders__deleteInvoice__button"
                    onClick={handleChangeDeleteInvoice}
                  >
                    {cancelInvoice ? "No anular factura" : "Anular factura"}
                  </button>
                  <p className="modalOrders__deleteInvoice__text">
                    Anular la factura generará una orden de compra para el
                    usuario. Al presionar el botón para confirmar se realizará
                    la operación.
                  </p>
                </div>
              )}
            <div className="modalOrders__buttons">
              <button
                className="modalOrders__button"
                onClick={() => {
                  handleClose();
                }}
              >
                Cancelar
              </button>
              <button className="modalOrders__button" onClick={handleConfirm}>
                Confirmar
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
      <ModalOrderDetails
        open={openModalOrderDetails}
        setOpen={setOpenModalOrderDetails}
        purchaseOrder={purchaseOrder}
      />
    </>
  );
};

export default Table;
