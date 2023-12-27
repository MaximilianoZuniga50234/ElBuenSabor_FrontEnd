import "./cart.css";
import { useStore } from "../../store/CartStore";
import { useStore as useCurrentUser } from "../../store/CurrentUserStore";
import { Link } from "react-router-dom";
import { CartItem } from "../../interfaces/CartItem";
import { createPurchaseOrder } from "../../functions/PurchaseOrderAPI";
import { MouseEvent, useEffect, useState } from "react";
import { FaArrowLeft, FaMinus, FaPlus } from "react-icons/fa6";
import { PurchaseOrder } from "../../interfaces/PurchaseOrder";
import { Person } from "../../interfaces/Person";
import { getAllAddress } from "../../functions/AddressAPI";
import { getAllPerson } from "../../functions/PersonAPI";
import { Address } from "../../interfaces/Address";
import { Box, Fade, Modal } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { PurchaseOrderDetail } from "../../interfaces/PurchaseOrderDetail";

const Cart = () => {
  const { cartProducts, remove, clear, removeOne, addOne } = useStore();
  const [tokenState, setTokenState] = useState<string>("");
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [personsDatabase, setPersonsDatabase] = useState<Person[]>();
  const [addressesDatabase, setAddressesDatabase] = useState<Address[]>();

  const getPersonsDatabase = async () => {
    const response = await getAllPerson();
    setPersonsDatabase(response);
  };

  const getAddressesDatabase = async () => {
    const response = await getAllAddress();
    setAddressesDatabase(response);
  };

  useEffect(() => {
    getAddressesDatabase();
    getPersonsDatabase();
  }, []);

  const getToken = async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });
      setTokenState(token);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) getToken();
  }, [isAuthenticated]);

  const { user } = useCurrentUser()

  const [priceAndTime, setPriceAndTime] = useState({
    totalPrice: 0,
    totalTime: 0
  })

  const [purchaseOrder, setPurchaseOrder] = useState<PurchaseOrder>({
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

  useEffect(() => {
    if (purchaseOrder.details && purchaseOrder.details?.length > 0) {
      createPurchaseOrder(purchaseOrder, tokenState);
    }
  }, [purchaseOrder.details]);

  useEffect(() => {
    if (user?.user_id != "" &&
      personsDatabase &&
      personsDatabase.length > 0 &&
      addressesDatabase &&
      addressesDatabase?.length > 0) {

      const person = personsDatabase.find((person) => person.user_id === user?.user_id)
      const address = addressesDatabase?.find((address) => address.person.id === person?.id)

      setPurchaseOrder({ ...purchaseOrder, address: address, person: person })
    }
  }, [user, personsDatabase, addressesDatabase])

  useEffect(() => {
    if (cartProducts.length > 0) {
      let time = 0
      let price = 0
      cartProducts.map(async (cartProduct) => {
        time = time + cartProduct.product.estimatedTimeKitchen
        price = price + cartProduct.product.salePrice * cartProduct.amount
      })
      setPriceAndTime({ totalPrice: price, totalTime: time })
    }

  }, [cartProducts])

  useEffect(() => {
    setPurchaseOrder({ ...purchaseOrder, estimatedEndTime: priceAndTime.totalTime, total: priceAndTime.totalPrice })
  }, [priceAndTime])

  const handleChangeShippingType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPurchaseOrder({ ...purchaseOrder, shippingType: event.target.value, paymentMethod: event.target.value === "Retiro en el local" ? "Efectivo" : "Mercado Pago" })
  };

  const handleConfirm = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const details: PurchaseOrderDetail[] = cartProducts.map(cartProduct => {
      return {
        amount: cartProduct.amount,
        subtotal: cartProduct.product.salePrice * cartProduct.amount,
        product: cartProduct.product,
        stock: null
      } as PurchaseOrderDetail
    })
    setPurchaseOrder({ ...purchaseOrder, details: details })
    handleClose()
    clear();
  };

  return (

    isAuthenticated ?
      <>
        < div className="cart_main_container" >
          <h2>Carrito de compras</h2>
          <div className="cart_back_amount">
            <Link to="/">
              <FaArrowLeft />
              Volver
            </Link>
            {cartProducts.length > 0 ? (
              <p>
                <b>{cartProducts.length}</b> Productos
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
          <div className="cart_buttons_container">
            <button onClick={() => clear()}>Limpiar</button>
            <button onClick={handleOpen}>Elegir forma de entrega</button>
          </div>
        </div >
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
                Elegir forma de envío
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

              <div className="modalCart__buttons">
                <button className="modalCart__button" onClick={() => { handleClose() }}>Cancelar</button>
                <button className="modalCart__button"
                  onClick={handleConfirm} >
                  Confirmar
                </button>
              </div>
            </Box>
          </Fade>
        </Modal >
      </>

      :

      <div className="div__noSesion">
        <h1>Debes iniciar sesión para ver el carrito</h1>
      </div >
  );
};

export default Cart;
