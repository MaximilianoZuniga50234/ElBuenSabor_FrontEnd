import { useEffect, useState } from "react"
import { PurchaseOrder } from "../../interfaces/PurchaseOrder"
import { useStore as useCurrentUser } from "../../store/CurrentUserStore"
import { getAllPurchaseOrder } from "../../functions/PurchaseOrderAPI"
import { FaClock } from "react-icons/fa6"
import "./userOrders.css"
import ModalOrderDetails from "../../components/modalOrderDetails/ModalOrderDetails"
import { useAuth0 } from "@auth0/auth0-react"

export default function UserOrders() {
    const { user } = useCurrentUser()
    const { isAuthenticated } = useAuth0()
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
    const [isLoaded, setisLoaded] = useState(false)

    const handleOpen = (orderParam: PurchaseOrder) => {
        setOpen(true)
        setOrder(orderParam)
    };

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
            setFilterOrders(orders.filter((order: PurchaseOrder) => order.person?.user_id === user?.user_id && order.status?.status === "Por aceptar"))
        }
    }, [user, orders])

    return (
        <div className="userOrders__container">
            <div className="userOrders__table">

                <div className="userOrders__header">
                    <h1 className="userOrders__header__title">
                        {
                            isAuthenticated ?
                                (isLoaded &&
                                    (filterOrders === undefined || (filterOrders && filterOrders.length === 0) ?
                                        "No hay órdenes" :
                                        "Mis órdenes")
                                )
                                :
                                "Inicia sesión para ver tus órdenes"
                        }
                    </h1>
                </div>

                <div className="userOrders__labels">
                    <span className="userOrders__span"><b>N° de orden</b></span>
                    <span className="userOrders__span"><b>Total</b></span>
                    <span className="userOrders__span"><b>Tiempo estimado</b></span>
                </div>

                <div className="userOrders__content">
                    {
                        filterOrders?.map((order: PurchaseOrder) => (
                            <div className="userOrders__card" key={order.id}>
                                <span className="userOrders__span" > Orden N° {order.number}</span>
                                <span className="userOrders__span">${order.total}</span>
                                <span className="userOrders__span"> <FaClock /> {order.estimatedEndTime} m.</span>
                                <button className="userOrders__card__button" onClick={() => { handleOpen(order) }}>Detalles</button>
                            </div>
                        ))}
                </div>
            </div>

            <ModalOrderDetails open={open} setOpen={setOpen} order={order}></ModalOrderDetails>
        </div >
    )
}
