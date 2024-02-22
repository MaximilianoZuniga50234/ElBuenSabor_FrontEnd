import { Suspense, lazy, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Fade, Modal } from "@mui/material";
import { FaArrowLeft, FaMinus, FaPlus } from "react-icons/fa6";
import { toast } from "sonner";
import { useStore } from "../../store/CartStore";
import { useStore as useCurrentUser } from "../../store/CurrentUserStore";
import { useStore as useToken } from "../../store/UserTokenStore";
import { CartItem } from "../../interfaces/CartItem";
import { PurchaseOrder } from "../../interfaces/PurchaseOrder";
import { Person } from "../../interfaces/Person";
import { Address } from "../../interfaces/Address";
import { PurchaseOrderDetail } from "../../interfaces/PurchaseOrderDetail";
import {
  createPurchaseOrder,
  getAllPurchaseOrder,
} from "../../functions/PurchaseOrderAPI";
import { getAllAddress } from "../../functions/AddressAPI";
import { getAllPerson } from "../../functions/PersonAPI";
import { updateStock } from "../../functions/StockAPI";
import Loader from "../../components/loader/Loader";
import "./cart.css";

const ModalOrderDetails = lazy(
  () => import("../../components/modalOrderDetails/ModalOrderDetails")
);

const Cart = () => {
  const { cartProducts, remove, clear, removeOne, addOne } = useStore();
  const { token } = useToken();
  const { user } = useCurrentUser();
  const { isAuthenticated } = useAuth0();

  const [purchaseOrder, setPurchaseOrder] = useState<PurchaseOrder>({
    id: 0,
    fecha: new Date(),
    number: Math.floor(Math.random() * (999999 - 100000 + 1) + 100000),
    estimatedEndTime: 0,
    shippingType: "Retiro en el local",
    paymentMethod: "Efectivo",
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
    status: { id: 1, status: "A confirmar" },
    details: null,
  });
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>();

  const [confirmPurchase, setConfirmPurchase] = useState(false);
  const [open, setOpen] = useState(false);
  const [openModalOrderDetails, setOpenModalOrderDetails] = useState(false);
  const [personsDatabase, setPersonsDatabase] = useState<Person[]>();
  const [addressesDatabase, setAddressesDatabase] = useState<Address[]>();
  const [priceAndTime, setPriceAndTime] = useState({
    totalPrice: 0,
    highestTime: 0,
  });
  const [isPerfilComplete, setIsPerfilComplete] = useState<boolean>(true);

  useEffect(() => {
    getPurchaseOrders();
    getAddressesDatabase();
    getPersonsDatabase();
  }, []);

  useEffect(() => {
    console.log(purchaseOrder);
  }, [purchaseOrder]);

  useEffect(() => {
    if (confirmPurchase) {
      createOrder();
      setConfirmPurchase(false);
    }
  }, [confirmPurchase]);

  useEffect(() => {
    if (
      user?.user_id != "" &&
      personsDatabase &&
      personsDatabase.length > 0 &&
      addressesDatabase &&
      addressesDatabase?.length > 0
    ) {
      const person = personsDatabase.find(
        (person) => person.user_id === user?.user_id
      );
      const address = addressesDatabase?.find(
        (address) => address.person.id === person?.id
      );

      setPurchaseOrder({ ...purchaseOrder, address: address, person: person });
    }
  }, [user, personsDatabase, addressesDatabase]);

  useEffect(() => {
    if (cartProducts.length > 0) {
      let time = 0;
      let price = 0;
      if (cartProducts.length > 0) {
        cartProducts.map(async (cartProduct) => {
          time =
            cartProduct.product.estimatedTimeKitchen > time
              ? cartProduct.product.estimatedTimeKitchen
              : time;
          price = price + cartProduct.product.salePrice * cartProduct.amount;
        });
        setPriceAndTime({ totalPrice: price, highestTime: time });
      }
    } else {
      setPriceAndTime({ totalPrice: 0, highestTime: 0 });
    }
  }, [cartProducts]);

  useEffect(() => {
    if (user != null) {
      if (
        user?.given_name === "" ||
        user?.family_name === "" ||
        user?.user_metadata?.address?.department === "" ||
        user?.user_metadata?.address?.number === 0 ||
        user?.user_metadata?.address?.street === ""
      ) {
        setIsPerfilComplete(false);
      }
    }
  }, [user]);

  const getPurchaseOrders = async () => {
    const response = await getAllPurchaseOrder();
    setPurchaseOrders(response);
  };

  const getPersonsDatabase = async () => {
    const response = await getAllPerson();
    setPersonsDatabase(response);
  };

  const getAddressesDatabase = async () => {
    const response = await getAllAddress();
    setAddressesDatabase(response);
  };

  const handleOpen = () => {
    // const currentDate = new Date();
    if (!isAuthenticated) {
      toast.error("Debes iniciar sesión para realizar una compra.");
    }
    // {
    //   if (
    //     (currentDate.getDay() > 0 &&
    //       currentDate.getDay() < 6 &&
    //       currentDate.getHours() >= 20) ||
    //     ((currentDate.getDay() === 0 || currentDate.getDay() === 6) &&
    //       (currentDate.getHours() >= 20 ||
    //         (currentDate.getHours() >= 11 && currentDate.getHours() < 15)))
    //   ) {
    else if (!isPerfilComplete) {
      toast.error(
        "Debes completar la información de tu perfil antes de realizar una compra."
      );
      // } else {
      //   if (user?.role != "Cliente") {
      //     toast.error(
      //       "No puedes realizar una compra con la cuenta de un empleado. Por favor, utiliza otra cuenta."
      //     );
      //   } else {
      //     if (user.user_metadata.state === "De baja") {
      //       toast.error(
      //         "No puedes realizar una compra porque estás dado de baja del sistema."
      //       );
    } else {
      setOpen(true);
    }
    // } else {
    //   toast.error(
    //     "Lo sentimos, no puedes realizar un pedido fuera de nuestro horario de atención. El mismo es de 20:00 hs. a 00:00 hs. de lunes a viernes y también de 11:00 hs. a 15:00 hs. los sábados y domingos.",
    //     {
    //       duration: 10000,
    //       icon: <FaClock />,
    //     }
    //   );
    // }
    // }
  };
  // }
  // };
  const handleClose = () => setOpen(false);

  const handleOpenModalOrderDetails = () => {
    const details: PurchaseOrderDetail[] = cartProducts.map((cartProduct) => {
      return {
        amount: cartProduct.amount,
        subtotal: cartProduct.product.salePrice * cartProduct.amount,
        product: cartProduct.product,
        stock: null,
      } as PurchaseOrderDetail;
    });

    let highestTimeOrders = 0;

    const ordersInKitchen = purchaseOrders?.filter(
      (order) => order.status?.status === "A cocina"
    );

    ordersInKitchen?.forEach((order) => {
      highestTimeOrders =
        order.estimatedEndTime > highestTimeOrders
          ? order.estimatedEndTime
          : highestTimeOrders;
    });

    setPurchaseOrder({
      ...purchaseOrder,
      details: details,
      estimatedEndTime:
        purchaseOrder.shippingType === "Envío a domicilio"
          ? priceAndTime.highestTime + highestTimeOrders + 10
          : priceAndTime.highestTime + highestTimeOrders,
      total:
        purchaseOrder.shippingType === "Retiro en el local"
          ? priceAndTime.totalPrice * 0.9
          : priceAndTime.totalPrice,
      fecha: new Date(),
    });
    setOpenModalOrderDetails(true);
  };

  const createOrder = async () => {
    let insufficientStock = false;
    if (purchaseOrder.details && purchaseOrder.details?.length > 0) {
      for (const detail of purchaseOrder.details) {
        if (detail.product?.details) {
          for (const productDetail of detail.product.details) {
            if (
              productDetail.stock.currentStock -
                productDetail.amount * detail.amount <
              0
            ) {
              insufficientStock = true;
              break;
            }
          }
        }

        if (insufficientStock) {
          toast.error(
            `Lo sentimos, no hay suficiente stock para preparar la cantidad seleccionada del producto "${detail.product?.denomination}".`
          );
          handleClose();
          break;
        }
      }

      if (!insufficientStock) {
        const response = await createPurchaseOrder(purchaseOrder, token);
        if (response) {
          toast.success("Orden creada correctamente.");

          if (purchaseOrder.details) {
            for (const detail of purchaseOrder.details) {
              if (detail.product?.details) {
                for (const productDetail of detail.product.details) {
                  await updateStock(
                    {
                      ...productDetail.stock,
                      currentStock:
                        productDetail.stock.currentStock -
                        productDetail.amount * detail.amount,
                    },
                    token
                  );
                }
              }
            }
          }
        } else {
          toast.error("Error al crear la orden.");
        }
        handleClose();
        clear();
      }
    }
  };

  const handleChangePaymentMethod = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPurchaseOrder({ ...purchaseOrder, paymentMethod: event.target.value });
  };

  const handleChangeShippingType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPurchaseOrder({
      ...purchaseOrder,
      shippingType: event.target.value,
      paymentMethod:
        event.target.value === "Envío a domicilio"
          ? "Mercado Pago"
          : purchaseOrder.paymentMethod,
    });
  };

  return (
    <Suspense fallback={<Loader />}>
      <div className="cart_main_container">
        <h2>Carrito de compras</h2>
        <div className="cart_back_amount">
          <Link to="/">
            <FaArrowLeft />
            Volver
          </Link>
          {cartProducts.length > 0 ? (
            <p>
              <b>{cartProducts.length}</b>{" "}
              {cartProducts.length === 1 ? "Producto" : "Productos"}
            </p>
          ) : (
            <p>Sin productos</p>
          )}
        </div>
        <div className="cart_items_container">
          {cartProducts.map((cartItem: CartItem) => (
            <div key={cartItem.product.id} className="cart_item">
              <img src={cartItem.product.imgUrl} />
              <div>
                <h3>{cartItem.product.denomination}</h3>
                <p>Precio: ${cartItem.product.salePrice * cartItem.amount}</p>
              </div>
              <button onClick={() => remove(cartItem.product.id)}>
                Eliminar
              </button>
              <div>
                {cartItem.amount > 1 && (
                  <FaMinus onClick={() => removeOne(cartItem.product.id)} />
                )}
                <input
                  type="number"
                  className="cart_item_amount_input"
                  value={cartItem.amount}
                  readOnly
                />
                {cartItem.amount < 99 && (
                  <FaPlus onClick={() => addOne(cartItem.product.id)} />
                )}
                {cartItem.amount > 1 ? <p>Uds.</p> : <p>Ud.</p>}
              </div>
            </div>
          ))}
        </div>

        <h1>
          {priceAndTime.totalPrice != 0 && `Total: $${priceAndTime.totalPrice}`}
        </h1>

        <div className="cart_buttons_container">
          <button onClick={() => clear()}>Limpiar</button>
          {cartProducts.length > 0 && (
            <button onClick={handleOpen}>Continuar</button>
          )}
        </div>
      </div>

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
          <Box className="modalCart__box">
            <h3 className="modalCart__h3">
              Elegir forma de entrega y método de pago
            </h3>

            <div className="modalCart__div">
              <h5 className="modalCart__h5">Forma de entrega</h5>
              <select
                className="modalCart__select"
                onChange={handleChangeShippingType}
                defaultValue={purchaseOrder.shippingType}
                placeholder="Ingrese el departamento del cliente"
              >
                <option value="Retiro en el local">Retiro en el local</option>
                <option value="Envío a domicilio">Envío a domicilio</option>
              </select>
            </div>

            <div className="modalCart__div">
              <h5 className="modalCart__h5">Método de pago</h5>
              <select
                className="modalCart__select"
                onChange={handleChangePaymentMethod}
                defaultValue={purchaseOrder.paymentMethod}
                placeholder="Ingrese el departamento del cliente"
              >
                <option value="Mercado Pago">Mercado Pago</option>
                {purchaseOrder.shippingType === "Retiro en el local" && (
                  <option value="Efectivo">Efectivo</option>
                )}
              </select>
            </div>

            <h5>
              Retirar la compra en el local otorga un 10% de descuento en la
              compra.
            </h5>

            <div className="modalCart__buttons">
              <button
                className="modalCart__button"
                onClick={() => {
                  handleClose();
                }}
              >
                Cancelar
              </button>
              <button
                className="modalCart__button"
                onClick={handleOpenModalOrderDetails}
              >
                Continuar
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
      <ModalOrderDetails
        open={openModalOrderDetails}
        purchaseOrder={purchaseOrder}
        setOpen={setOpenModalOrderDetails}
        isOrderFromCart={true}
        setConfirmPurchase={setConfirmPurchase}
      />
    </Suspense>
  );
};

export default Cart;
