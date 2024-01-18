import { useEffect, useState } from "react"
import { PurchaseOrder } from "../../interfaces/PurchaseOrder"
import { useStore as useCurrentUser } from "../../store/CurrentUserStore"
import { getAllPurchaseOrder } from "../../functions/PurchaseOrderAPI"
import "./ordersHistory.css"
import ModalOrderDetails from "../../components/modalOrderDetails/ModalOrderDetails"
import { useAuth0 } from "@auth0/auth0-react"

export default function OrdersHistory() {

    const { user } = useCurrentUser()
    const { isAuthenticated } = useAuth0()

    const getDate = (order: PurchaseOrder) => {
        const fecha = order?.fecha ? new Date(order?.fecha) : null
        return fecha ? <span className="ordersHistory__span">{fecha.toLocaleDateString()}</span> : null
    }

    const [orders, setOrders] = useState<PurchaseOrder[]>()
    const [order, setOrder] = useState<PurchaseOrder>({
        id: 0,
        fecha: new Date(),
        number: Math.floor(Math.random() * (999999 - 100000 + 1) + 100000),
        estimatedEndTime: 0,
        shippingType: "Retiro en el local",
        paymentMethod: "Efectivo",
        total: 0,
        person: { id: "0", name: "", email: "", lastName: "", phoneNumber: "", user_id: "" },
        address: {
            id: 0,
            street: "",
            number: 0,
            department: { id: 0, name: "" },
            person: { id: "0", name: "", email: "", lastName: "", phoneNumber: "", user_id: "" }
        },
        status: { id: 1, status: "Por aceptar" },
        details: null,
    })
    const [filterOrders, setFilterOrders] = useState<PurchaseOrder[]>()
    const [open, setOpen] = useState(false)
    const handleOpen = (orderParam: PurchaseOrder) => {
        setOpen(true)
        setOrder(orderParam)
    };
    const [isLoaded, setisLoaded] = useState(false)

    const getOrders = async () => {
        try {
            const response = await getAllPurchaseOrder()
            setOrders(response)
            setisLoaded(true)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getOrders()
    }, [])

    useEffect(() => {
        if (user && orders && orders.length > 0) {
            setFilterOrders(orders.filter((order: PurchaseOrder) => order.person?.user_id === user?.user_id && order.status?.status === "Entregado"))
        }
    }, [user, orders])

    return (
        <div className="ordersHistory__container">
            <div className="ordersHistory__table">
                <div className="ordersHistory__header">
                    <div className="ordersHistory__title">
                        <h3 className="ordersHistory__h3">{
                            isAuthenticated ?
                                (isLoaded &&
                                    (filterOrders === undefined || (filterOrders && filterOrders.length === 0) ?
                                        "No hay órdenes" :
                                        "Historial de órdenes"
                                    )
                                )
                                :
                                "Inicia sesión para ver tu historial de órdenes"
                        }
                        </h3>
                    </div>
                </div>

                <div className={`ordersHistory__labels ${filterOrders?.length && filterOrders.length > 0 ? "" : "hide"}`}>
                    <span className="ordersHistory__span"><b>N° de pedido</b></span>
                    <span className="ordersHistory__span"><b>Fecha</b></span>
                    <span className="ordersHistory__span"><b>Total </b></span>
                </div>

                <div className={`ordersHistory__cards__container ${filterOrders?.length && filterOrders.length > 0 ? "" : "hide"}`}>
                    <div className="ordersHistory__card__labels">
                        <span className="ordersHistory__span"><b>N° de pedido</b></span>
                        <span className="ordersHistory__span"><b>Fecha</b></span>
                        <span className="ordersHistory__span"><b>Total </b></span>
                    </div>

                    {filterOrders?.map((order) => (
                        <div className="ordersHistory__card" key={order.id}>
                            <div className="ordersHistory__card__info">
                                <span className="ordersHistory__span">{order.number}</span>
                                {getDate(order)}
                                <span className="ordersHistory__span">${order.total}</span>
                            </div>
                            <div className="ordersHistory__card__buttons">
                                <button className="ordersHistory__button" onClick={() => {
                                    handleOpen(order)
                                }}>Detalles</button>
                                <button className="ordersHistory__button">Factura</button>
                            </div>
                        </div>

                    ))}

                    <ModalOrderDetails open={open} setOpen={setOpen} order={order}></ModalOrderDetails>

                </div>


            </div>
        </div >
    )
}
