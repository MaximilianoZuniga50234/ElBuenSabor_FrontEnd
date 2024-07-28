import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PurchaseOrder } from "../../interfaces/PurchaseOrder";
import { Box, Fade, Modal } from "@mui/material";
import "./ModalOrderDetails.css";
import { useStore as useUser } from "../../store/CurrentUserStore";
import { Invoice } from "../../interfaces/Invoice";
import { getAllInvoice } from "../../functions/InvoiceAPI";
import InvoicePdf from "../invoice/InvoicePdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useStore as useToken } from "../../store/UserTokenStore";
import { createPreference } from "../../functions/MercadoPagoApi";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { MercadoPagoInfo } from "../../interfaces/MercadoPagoInfo";

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

export default function ModalOrderDetails({
  open,
  setOpen,
  purchaseOrder,
  setConfirmPurchase,
  isOrderFromCart = false,
}: ModalOrderDetailsProps) {
  const { user } = useUser();
  const { token } = useToken();

  const [preferenceId, setPreferenceId] = useState("");

  initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY, {
    locale: "es-AR",
  });

  const [mercadoPagoInfo, setMercadoPagoInfo] = useState<MercadoPagoInfo>({
    title: "Productos",
    price: 0,
    quantity: 1,
  });

  const [estimatedHour, setEstimatedHour] = useState<string>();
  const [date, setDate] = useState<string>();
  const handleClose = () => {
    setPreferenceId("");
    localStorage.removeItem("order");
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
    if (mercadoPagoInfo.price != 0) {
      getPreference();
    }
  }, [purchaseOrder.fecha]);

  useEffect(() => {
    if (purchaseOrder) {
      getTime();
    }
  }, [purchaseOrder]);

  useEffect(() => {
    if (isOrderFromCart) {
      setMercadoPagoInfo({
        title: "Productos",
        quantity: 1,
        price: purchaseOrder.amountToPaid,
      });
    }
  }, [purchaseOrder.amountToPaid]);

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

  const getPreference = async () => {
    try {
      const data = await createPreference(mercadoPagoInfo, token);
      if (data) {
        setPreferenceId(data.id);
      }
    } catch (error) {
      console.error(error);
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
                    Orden N° {purchaseOrder?.id}
                  </h3>
                )}

                <div className="modalOrderDetails__header">
                  <h5>Detalles de entrega</h5>
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

                <h5>Detalles de la orden</h5>
                <div className="modalOrderDetails__orderInfo">
                  <div className="modalOrderDetails__orderInfo__header">
                    <h6>
                      <b>Fecha</b>
                    </h6>
                    <h6>
                      <b>Total</b>
                    </h6>
                    <h6>
                      <b>Forma de pago</b>
                    </h6>
                  </div>
                  <div className="modalOrderDetails__orderInfo__content">
                    <h6>{date}</h6>
                    <h6>${purchaseOrder.total}</h6>
                    <h6>{purchaseOrder.paymentMethod}</h6>
                  </div>
                </div>

                {purchaseOrder.shippingType === "Retiro en el local" && (
                  <h6> El total ya tiene aplicado el descuento del 10%. </h6>
                )}
                <h5>Productos de la orden</h5>

                <div className="modalOrderDetails__products">
                  <div className="modalOrderDetails__products__header">
                    <h6>
                      <b>Nombre</b>
                    </h6>
                    <h6>
                      <b>Cantidad</b>
                    </h6>
                    <h6>
                      <b>Precio</b>
                    </h6>
                  </div>
                  <div className="modalOrderDetails__products__content">
                    {purchaseOrder.details?.map((detail) => (
                      <div
                        className="modalOrderDetails__products__content__product"
                        key={detail?.product?.id}
                      >
                        <h6>{detail.product ? detail.product?.denomination : detail.stock?.denomination}</h6>
                        <h6>{detail.amount}</h6>
                        <h6>${detail.subtotal}</h6>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className={`modalOrderDetails__buttons ${
                    isOrderFromCart &&
                    purchaseOrder.paymentMethod === "Mercado Pago" &&
                    purchaseOrder.amountToPaid != 0 &&
                    "mercado-pago"
                  }`}
                >
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
                  {isOrderFromCart &&
                    (purchaseOrder.paymentMethod === "Mercado Pago" &&
                    purchaseOrder.amountToPaid != 0 ? (
                      preferenceId != "" && (
                        <div>
                          <Wallet
                            initialization={{ preferenceId: preferenceId }}
                            customization={{
                              visual: {
                                borderRadius: "12px",
                                verticalPadding: "8px",
                              },
                            }}
                            onReady={() => {
                              localStorage.setItem(
                                "order",
                                JSON.stringify(purchaseOrder)
                              );
                            }}
                          />
                        </div>
                      )
                    ) : (
                      <>
                        <button
                          className="modalOrderDetails__button"
                          onClick={handleConfirm}
                        >
                          Confirmar
                        </button>
                      </>
                    ))}
                </div>
              </>
            ) : (
              <div className="modalOrderDetailsDelivery__container">
                <h2 className="modalOrderDetailsDelivery__h1">
                  Orden N° {purchaseOrder.id}
                </h2>
                <div className="modalOrderDetailsDelivery__userDetails">
                  <div className="modalOrderDetailsDelivery__userDetails__title">
                    <h3 className="modalOrderDetailsDelivery__h5">
                      <b>Detalles del cliente</b>
                    </h3>
                  </div>
                  <div className="modalOrderDetailsDelivery__userDetails__info">
                    <h6>
                      <b>Nombre:</b> {purchaseOrder.person?.name}
                    </h6>
                    <h6>
                      <b>Apellido:</b> {purchaseOrder.person?.lastName}
                    </h6>
                    <h6>
                      <b>Departamento:</b>{" "}
                      {purchaseOrder.address?.department.name}
                    </h6>
                    <h6>
                      <b>Calle:</b> {purchaseOrder.address?.street}
                    </h6>
                    <h6>
                      <b>Número:</b> {purchaseOrder.address?.number}
                    </h6>
                    <h6>
                      <b>Total:</b> ${purchaseOrder.total}
                    </h6>
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
