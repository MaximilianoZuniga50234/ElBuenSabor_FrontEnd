import { Box, Fade, Modal } from "@mui/material";
import "./modalUserOrders.css";
import { Dispatch, SetStateAction } from "react";
import { PurchaseOrder } from "../../../interfaces/PurchaseOrder";
import { Person } from "../../../interfaces/Person";
type ModalUserOrdersProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  orders: PurchaseOrder[];
  customer?: Person;
};

export default function ModalUserOrders({
  open,
  setOpen,
  orders,
  customer,
}: ModalUserOrdersProps) {
  const handleClose = () => {
    setOpen(false);
  };

  const getDate = (order: PurchaseOrder) => {
    const date = new Date(order?.fecha);
    return date.toLocaleDateString();
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
        <Box className="modalUserOrders__box">
          <h4 className="modalUserOrders__title">
            <b>
              Pedidos del cliente "{customer?.name + " " + customer?.lastName}"
            </b>
          </h4>

          <div className="modalUserOrders__orders">
            <div className="modalUserOrders__order__header">
              <h5 className="modalUserOrders__h5">Id</h5>
              <h5 className="modalUserOrders__h5">Fecha</h5>
              <h5 className="modalUserOrders__h5">Método de pago</h5>
              <h5 className="modalUserOrders__h5">Total</h5>
            </div>
            {orders.map((order: PurchaseOrder) => (
              <div className="modalUserOrders__order__content" key={order.id}>
                <h5 className="modalUserOrders__h5">{order.id}</h5>
                <h5 className="modalUserOrders__h5">{getDate(order)}</h5>
                <h5 className="modalUserOrders__h5">{order.paymentMethod}</h5>
                <h5 className="modalUserOrders__h5">${order.total}</h5>
              </div>
            ))}
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}
