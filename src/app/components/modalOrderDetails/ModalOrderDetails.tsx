import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PurchaseOrder } from "../../interfaces/PurchaseOrder";
import { Box, Fade, Modal } from "@mui/material";
import "./ModalOrderDetails.css"
interface ModalOrderDetailsProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    order: PurchaseOrder
}

export default function ModalOrderDetails({ open, setOpen, order }: ModalOrderDetailsProps) {

    const [estimatedHour, setEstimatedHour] = useState<string>()
    const [date, setDate] = useState<string>()
    const handleClose = () => {
        setOpen(false)
    }

    const getTime = () => {
        const fecha = new Date(order?.fecha)
        fecha.setMinutes(fecha.getMinutes() + order.estimatedEndTime)
        fecha.setSeconds(0)
        setEstimatedHour(fecha.toLocaleTimeString())
        setDate(fecha.toLocaleDateString())
    }

    useEffect(() => {
        if (order) {
            getTime()
        }
    }, [order])

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
                <Box className='modalOrderDetails__box'>
                    <h3 className="modalOrderDetails__title">Orden {order?.number}</h3>

                    <div className="modalOrderDetails__header">
                        <h4>Detalles de entrega</h4>
                        {order.shippingType === "Retiro en el local" ?
                            <>
                                <p>Su pedido estará listo aproximadamente a las {estimatedHour}</p>
                                <p>Retiro en el local</p>
                            </>
                            :
                            <>
                                <p>Su pedido llegará aproximadamente a las {estimatedHour}</p>
                                <p>Envío a domicilio - {`${order.address?.street} ${order.address?.number}, ${order.address?.department.name}`}</p>
                            </>
                        }
                    </div>

                    <h4>Detalles de la orden</h4>
                    <div className="modalOrderDetails__orderInfo">
                        <div className="modalOrderDetails__orderInfo__header">
                            <h5><b>Fecha</b></h5>
                            <h5><b>Total</b></h5>
                            <h5><b>Forma de pago</b></h5>
                        </div>
                        <div className="modalOrderDetails__orderInfo__content">
                            <h5>{date}</h5>
                            <h5>${order.total}</h5>
                            <h5>{order.paymentMethod}</h5>
                        </div>
                    </div>

                    <h4>Productos de la orden</h4>

                    <div className="modalOrderDetails__products">
                        <div className="modalOrderDetails__products__header">
                            <h5><b>Nombre</b></h5>
                            <h5><b>Cantidad</b></h5>
                            <h5><b>Precio</b></h5>
                        </div>
                        <div className="modalOrderDetails__products__content">
                            {order.details?.map((product) => (
                                <div className="modalOrderDetails__products__content__product" key={product?.product?.id}>
                                    <h5>{product.product?.denomination}</h5>
                                    <h5>{product.amount}</h5>
                                    <h5>${product.subtotal}</h5>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="modalOrderDetails__buttons">
                        <button className="modalOrderDetails__button" onClick={handleClose}>Cerrar</button>
                        {order.status?.status === "Facturado" &&
                            <button className="modalOrderDetails__button">Factura</button>
                        }
                    </div>

                </Box>
            </Fade>
        </Modal >
    )
}
