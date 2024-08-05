import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa6";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";
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
import InvoicePdf from "../invoice/InvoicePdf";
import { pdf } from "@react-pdf/renderer";
import { sendEmail } from "../../functions/EmailAPI";
import { FaPencilAlt } from "react-icons/fa";

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
  // mercadoPagoData: null,
  details: [],
};
const CREDIT_NOTE_INITIAL_STATE = {
  id: 0,
  date: new Date(),
  active: true,
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
  const [addTime, setAddTime] = useState<boolean>(false);
  const [newOrderTime, setNewOrderTime] = useState<number>(0);

  const [open, setOpen] = useState(false);
  const [openModalOrderDetails, setOpenModalOrderDetails] = useState(false);
  useState(false);
  const [isOnlyDrinks, setIsOnlyDrinks] = useState(false);

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
    setAddTime(false);
    setNewOrderTime(0);
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
    setAddTime(false);
    setNewOrderTime(0);
  };

  const postInvoice = async () => {
    try {
      await createInvoice(invoice, token);
      const updatedInvoices = await getInvoices();
      const invoiceMail = updatedInvoices.find(
        (o: Invoice) => o.purchaseOrder.id === purchaseOrder.id
      );
      generatePdfBase64(invoiceMail);
    } catch (err) {
      console.error(err);
    }
  };

  const generatePdfBase64 = async (invoiceMail: Invoice) => {
    const pdfBlob = await pdf(<InvoicePdf invoice={invoiceMail} />).toBlob();
    const formData = new FormData();
    formData.append("file", pdfBlob, `Factura_${invoiceMail.id}.pdf`);
    formData.append("order", JSON.stringify(invoiceMail.purchaseOrder));
    sendEmail(formData);
  };

  useEffect(() => {
    if (invoice.details.length > 0) {
      postInvoice();
    }
  }, [invoice]);

  useEffect(() => {
    if (purchaseOrder.id != 0 && invoices && invoices?.length > 0) {
      const correspondentInvoice = invoices?.find(
        (invoice: Invoice) => invoice.purchaseOrder.id === purchaseOrder.id
      );

      correspondentInvoice &&
        setCreditNote({
          id: 0,
          date: new Date(),
          active: true,
          invoice: correspondentInvoice,
          purchaseOrder: purchaseOrder,
          total: correspondentInvoice.purchaseOrder.amountToPaid,
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
      if (creditNote.total != 0) {
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
    } else if (addTime) {
      await updatePurchaseOrder(
        {
          ...purchaseOrder,
          estimatedEndTime: purchaseOrder.estimatedEndTime + newOrderTime,
        },
        token
      );
      setChangeOrderStatus(true);
      setAddTime(false);
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
      return response;
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

  const handleChangeAddTime = () => {
    setAddTime(!addTime);
    setNewOrderTime(0);
  };

  const handleChangeNewOrderTime = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewOrderTime(Number(event.target.value));
  };

  useEffect(() => {
    const haveProduct = purchaseOrder.details?.some((detail) => detail.product);
    if (haveProduct != undefined && haveProduct != null) {
      setIsOnlyDrinks(!haveProduct);
    }
  }, [purchaseOrder]);

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
            <td>MODIFICAR</td>
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
                  <FaPencilAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
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
                    user?.role === "Cajero" &&
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
                    user?.role === "Cajero" &&
                    (orderStatus === "A confirmar" ||
                      (purchaseOrder.status?.status === "A cocina" &&
                        orderStatus === "Facturado") ||
                      (isOnlyDrinks &&
                        purchaseOrder.status?.status === "Listo" &&
                        orderStatus === "Facturado"))
                      ? false
                      : true
                  }
                >
                  Facturado
                </option>
                <option
                  value="A cocina"
                  disabled={
                    (user?.role === "Cajero" &&
                      !isOnlyDrinks &&
                      orderStatus === "Facturado") ||
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
                    (!isOnlyDrinks &&
                      orderStatus === "A cocina" &&
                      user?.role === "Cocinero") ||
                    (user?.role === "Cajero" &&
                      ((isOnlyDrinks && orderStatus === "Facturado") ||
                        ((purchaseOrder.status?.status === "En delivery" ||
                          purchaseOrder.status?.status === "Entregado") &&
                          orderStatus === "Listo")))
                      ? false
                      : true
                  }
                >
                  Listo
                </option>

                <option
                  value="En delivery"
                  disabled={
                    purchaseOrder.shippingType === "Envío a domicilio" &&
                    ((user?.role === "Cajero" && orderStatus === "Listo") ||
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
                    (user?.role === "Cajero" &&
                      orderStatus === "Listo" &&
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

            {orderStatus === "A cocina" &&
              purchaseOrder.status?.status === "A cocina" &&
              user?.role === "Cocinero" && (
                <div className="modalOrders__addTime">
                  <button
                    className="modalOrders__addTime__button"
                    onClick={handleChangeAddTime}
                  >
                    {addTime
                      ? "No agregar tiempo de retraso"
                      : "Agregar tiempo de retraso"}
                  </button>

                  {addTime && (
                    <input
                      type="number"
                      className="modalOrders__addTime__input"
                      onChange={handleChangeNewOrderTime}
                      placeholder="Tiempo a agregar (en minutos)"
                    />
                  )}
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
