import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PurchaseOrder } from "../../interfaces/PurchaseOrder";
import { Box, Fade, Modal } from "@mui/material";
import "./ModalOrderDetails.css";
import { useStore as useUser } from "../../store/CurrentUserStore";

interface ModalOrderDetailsProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setConfirmPurchase?: Dispatch<SetStateAction<boolean>>;
  order: PurchaseOrder;
  isOrderFromCart?: boolean;
}

export default function ModalOrderDetails({
  open,
  setOpen,
  order,
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
    const fecha = new Date(order?.fecha);
    fecha.setMinutes(fecha.getMinutes() + order.estimatedEndTime);
    fecha.setSeconds(0);
    setEstimatedHour(fecha.toLocaleTimeString());
    setDate(fecha.toLocaleDateString());
  };

  useEffect(() => {
    if (order) {
      getTime();
    }
  }, [order]);

  const handleConfirm = async () => {
    if (setConfirmPurchase) setConfirmPurchase(true);
    handleClose();
  };

  return (
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
                  Orden N° {order?.number}
                </h3>
              )}

              <div className="modalOrderDetails__header">
                <h4>Detalles de entrega</h4>
                {order.shippingType === "Retiro en el local" ? (
                  <>
                    {order.status?.status != "Entregado" &&
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
                    {order.status?.status != "Entregado" &&
                      user?.role === "Cliente" && (
                        <p>
                          Su pedido llegará aproximadamente a las{" "}
                          {estimatedHour}
                        </p>
                      )}
                    <p>
                      Envío a domicilio -{" "}
                      {`${order.address?.street} ${order.address?.number}, ${order.address?.department.name}`}
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
                  <h5>${order.total}</h5>
                  <h5>{order.paymentMethod}</h5>
                </div>
              </div>

              {order.shippingType === "Retiro en el local" && (
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
                  {order.details?.map((product) => (
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
                {order.status?.status === "Facturado" && (
                  <button className="modalOrderDetails__button">Factura</button>
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
                Orden N° {order.number}
              </h2>
              <div className="modalOrderDetailsDelivery__userDetails">
                <div className="modalOrderDetailsDelivery__userDetails__title">
                  <h3 className="modalOrderDetailsDelivery__h4">
                    <b>Detalles del cliente</b>
                  </h3>
                </div>
                <div className="modalOrderDetailsDelivery__userDetails__info">
                  <h5>
                    <b>Nombre:</b> {order.person?.name}
                  </h5>
                  <h5>
                    <b>Apellido:</b> {order.person?.lastName}
                  </h5>
                  <h5>
                    <b>Departamento:</b> {order.address?.department.name}
                  </h5>
                  <h5>
                    <b>Calle:</b> {order.address?.street}
                  </h5>
                  <h5>
                    <b>Número:</b> {order.address?.number}
                  </h5>
                  <h5>
                    <b>Total:</b> ${order.total}
                  </h5>
                </div>
              </div>
            </div>
          )}
        </Box>
      </Fade>
    </Modal>
  );
}
