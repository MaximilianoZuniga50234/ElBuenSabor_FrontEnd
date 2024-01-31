import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PurchaseOrder } from "../../interfaces/PurchaseOrder";
import { Box, Fade, Modal } from "@mui/material";
import "./ModalOrderDetails.css";
import { useStore as useUser } from "../../store/CurrentUserStore";
import { Invoice } from "../../interfaces/Invoice";
import { getAllInvoice } from "../../functions/InvoiceAPI";
import InvoicePdf from "../invoice/InvoicePdf";
import { PDFDownloadLink } from "@react-pdf/renderer";

interface ModalOrderDetailsProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setConfirmPurchase?: Dispatch<SetStateAction<boolean>>;
  purchaseOrder: PurchaseOrder;
  isOrderFromCart?: boolean;
}

const PURCHASE_ORDER_INITIAL_STATE = {
  id: 0,
  fecha: new Date(),
  number: 0,
  estimatedEndTime: 0,
  shippingType: "",
  paymentMethod: "",
  total: 0,
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
  purchaseOrder: PURCHASE_ORDER_INITIAL_STATE,
  // mercadoPagoData: null,
  details: [],
};

export default function ModalOrderDetails({
  open,
  setOpen,
  purchaseOrder,
  setConfirmPurchase,
  isOrderFromCart = false,
}: ModalOrderDetailsProps) {
  const { user } = useUser();
  const [estimatedHour, setEstimatedHour] = useState<string>();
  const [date, setDate] = useState<string>();
  const handleClose = () => {
    setOpen(false);
  };

  const getTime = () => {
    const fecha = new Date(purchaseOrder?.fecha);
    fecha.setMinutes(fecha.getMinutes() + purchaseOrder.estimatedEndTime);
    fecha.setSeconds(0);
    setEstimatedHour(fecha.toLocaleTimeString());
    setDate(fecha.toLocaleDateString());
  };

  useEffect(() => {
    if (purchaseOrder) {
      getTime();
    }
  }, [purchaseOrder]);

  const handleConfirm = async () => {
    if (setConfirmPurchase) setConfirmPurchase(true);
    handleClose();
  };

  const [invoice, setInvoice] = useState<Invoice>(INVOICE_INITIAL_STATE);

  const getInvoice = async () => {
    try {
      const response: Invoice[] = await getAllInvoice();
      setInvoice(
        response.find((i) => i.purchaseOrder.id === purchaseOrder.id) ??
          INVOICE_INITIAL_STATE
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (purchaseOrder.id != 0) {
      if (invoice.id === 0) {
        getInvoice();
      }
    }
  }, [invoice, purchaseOrder]);

  return (
    <>
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
          <Box className="modalOrderDetails__box">
            {user?.role && user.role != "Delivery" ? (
              <>
                {!isOrderFromCart && (
                  <h3 className="modalOrderDetails__title">
                    Orden N° {purchaseOrder?.number}
                  </h3>
                )}

                <div className="modalOrderDetails__header">
                  <h4>Detalles de entrega</h4>
                  {purchaseOrder.shippingType === "Retiro en el local" ? (
                    <>
                      {purchaseOrder.status?.status != "Entregado" &&
                        user?.role === "Cliente" && (
                          <p>
                            Su pedido estará listo aproximadamente a las{" "}
                            {estimatedHour}
                          </p>
                        )}
                      <p>Retiro en el local</p>
                    </>
                  ) : (
                    <>
                      {purchaseOrder.status?.status != "Entregado" &&
                        user?.role === "Cliente" && (
                          <p>
                            Su pedido llegará aproximadamente a las{" "}
                            {estimatedHour}
                          </p>
                        )}
                      <p>
                        Envío a domicilio -{" "}
                        {`${purchaseOrder.address?.street} ${purchaseOrder.address?.number}, ${purchaseOrder.address?.department.name}`}
                      </p>
                    </>
                  )}
                </div>

                <h4>Detalles de la orden</h4>
                <div className="modalOrderDetails__orderInfo">
                  <div className="modalOrderDetails__orderInfo__header">
                    <h5>
                      <b>Fecha</b>
                    </h5>
                    <h5>
                      <b>Total</b>
                    </h5>
                    <h5>
                      <b>Forma de pago</b>
                    </h5>
                  </div>
                  <div className="modalOrderDetails__orderInfo__content">
                    <h5>{date}</h5>
                    <h5>${purchaseOrder.total}</h5>
                    <h5>{purchaseOrder.paymentMethod}</h5>
                  </div>
                </div>

                {purchaseOrder.shippingType === "Retiro en el local" && (
                  <h5> El total ya tiene aplicado el descuento del 10%. </h5>
                )}
                <h4>Productos de la orden</h4>

                <div className="modalOrderDetails__products">
                  <div className="modalOrderDetails__products__header">
                    <h5>
                      <b>Nombre</b>
                    </h5>
                    <h5>
                      <b>Cantidad</b>
                    </h5>
                    <h5>
                      <b>Precio</b>
                    </h5>
                  </div>
                  <div className="modalOrderDetails__products__content">
                    {purchaseOrder.details?.map((product) => (
                      <div
                        className="modalOrderDetails__products__content__product"
                        key={product?.product?.id}
                      >
                        <h5>{product.product?.denomination}</h5>
                        <h5>{product.amount}</h5>
                        <h5>${product.subtotal}</h5>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="modalOrderDetails__buttons">
                  <button
                    className="modalOrderDetails__button"
                    onClick={handleClose}
                  >
                    Cerrar
                  </button>
                  {purchaseOrder.status?.status != "A confirmar" && (
                    <PDFDownloadLink
                      document={<InvoicePdf invoice={invoice} />}
                      fileName={`Factura_${invoice.id}.pdf`}
                      className="modalOrderDetails__button"
                    >
                      <button className="modalOrderDetails__button">
                        Factura
                      </button>
                    </PDFDownloadLink>
                  )}
                  {isOrderFromCart && (
                    <button
                      className="modalOrderDetails__button"
                      onClick={handleConfirm}
                    >
                      Confirmar
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="modalOrderDetailsDelivery__container">
                <h2 className="modalOrderDetailsDelivery__h1">
                  Orden N° {purchaseOrder.number}
                </h2>
                <div className="modalOrderDetailsDelivery__userDetails">
                  <div className="modalOrderDetailsDelivery__userDetails__title">
                    <h3 className="modalOrderDetailsDelivery__h4">
                      <b>Detalles del cliente</b>
                    </h3>
                  </div>
                  <div className="modalOrderDetailsDelivery__userDetails__info">
                    <h5>
                      <b>Nombre:</b> {purchaseOrder.person?.name}
                    </h5>
                    <h5>
                      <b>Apellido:</b> {purchaseOrder.person?.lastName}
                    </h5>
                    <h5>
                      <b>Departamento:</b>{" "}
                      {purchaseOrder.address?.department.name}
                    </h5>
                    <h5>
                      <b>Calle:</b> {purchaseOrder.address?.street}
                    </h5>
                    <h5>
                      <b>Número:</b> {purchaseOrder.address?.number}
                    </h5>
                    <h5>
                      <b>Total:</b> ${purchaseOrder.total}
                    </h5>
                  </div>
                </div>
              </div>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
