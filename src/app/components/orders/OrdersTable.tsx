import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaGear } from "react-icons/fa6";
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

type Props = {
  datos: PurchaseOrder[];
  setChangeOrderStatus: Dispatch<SetStateAction<boolean>>;
};

const Table = ({ datos, setChangeOrderStatus }: Props) => {

  const { token } = useToken()
  const { isAuthenticated } = useAuth0()
  const [paginaActual, setPaginaActual] = useState<number>(1);

  const [open, setOpen] = useState(false);
  // const [isOnlyDrinks, setIsOnlyDrinks] = useState(true); 

  const [allStatus, setAllStatus] = useState<Status[]>()
  const [orderStatus, setOrderStatus] = useState<string>("A confirmar")

  const [purchaseOrder, setPurchaseOrder] = useState<PurchaseOrder>({
    id: 0,
    fecha: new Date(),
    number: 0,
    estimatedEndTime: 0,
    shippingType: "",
    paymentMethod: "",
    total: 0,
    person: { id: "0", name: "", email: "", lastName: "", phoneNumber: "", user_id: "" },
    address: {
      id: 0,
      street: "",
      number: 0,
      department: { id: 0, name: "" },
      person: { id: "0", name: "", email: "", lastName: "", phoneNumber: "", user_id: "" }
    },
    status: { id: 0, status: "" },
    details: null,
  })

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

  const handleOpen = (order: PurchaseOrder) => {
    setPurchaseOrder(order)
    setOrderStatus(order.status ? order?.status?.status : "")
    setOpen(true);
  }

  const handleClose = () => setOpen(false);

  const handleChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = allStatus?.find((s) => s.status === event.target.value)
    if (newStatus) {
      setPurchaseOrder({ ...purchaseOrder, status: newStatus })
    }
  }

  const handleConfirm = async () => {

    if (isAuthenticated) {
      await updatePurchaseOrder(purchaseOrder, token)
      handleClose()
      setChangeOrderStatus(true)
    } else {
      toast("Debes iniciar sesión")
    }
  }

  const getStatus = async () => {
    const response = await getAllState()
    setAllStatus(response)
  }

  useEffect(() => {
    getStatus()
  }, [])

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
                <button onClick={() => { handleOpen(e) }}>
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
          <Box className='modalCart__box'>
            <h3 className="modalCart__h3">
              Cambiar estado del pedido
            </h3>

            <div className="modalCart__div">
              <h5 className="modalCart__h5">Estado del pedido</h5>

              <select
                className="modalCart__select"
                onChange={handleChangeStatus}
                defaultValue={orderStatus}
              >
                <option value="A confirmar" disabled={true}>A confirmar</option>
                <option value="Facturado" disabled={orderStatus === "A confirmar" ? false : true}>Facturado</option>
                <option value="A cocina" disabled={orderStatus === "Facturado" ? false : true}>A cocina</option>
                <option value="Listo"
                  disabled={orderStatus === "A cocina" ? false : true}
                // disabled={isOnlyDrinks ? false : true}
                >Listo</option>

                <option value="En delivery" disabled={orderStatus === "Listo" && purchaseOrder.shippingType === "Envío a domicilio" ? false : true}>En delivery</option>
                <option value="Entregado" disabled={orderStatus === "En delivery" || (orderStatus === "Listo" && purchaseOrder.shippingType === "Retiro en el local") ? false : true}>Entregado</option>
              </select>
            </div>

            <div className="modalCart__buttons">
              <button className="modalCart__button" onClick={() => { handleClose() }}>Cancelar</button>
              <button className="modalCart__button"
                onClick={handleConfirm}
              >
                Confirmar
              </button>
            </div>
          </Box>
        </Fade>
      </Modal >
    </>
  );
};

export default Table;
