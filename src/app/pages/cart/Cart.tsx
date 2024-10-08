import { useAuth0 } from "@auth0/auth0-react";
import { Box, Fade, Modal } from "@mui/material";
import { Suspense, lazy, useEffect, useState } from "react";
import { FaArrowLeft, FaClock, FaMinus, FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Loader from "../../components/loader/Loader";
import { getAllAddress } from "../../functions/AddressAPI";
import {
  getAllCreditNotes,
  updateCreditNote,
} from "../../functions/CreditNoteAPI";
import { getAllPerson } from "../../functions/PersonAPI";
import {
  createPurchaseOrder,
  getAllPurchaseOrder,
} from "../../functions/PurchaseOrderAPI";
import { updateStock } from "../../functions/StockAPI";
import { Address } from "../../interfaces/Address";
import { CartItem } from "../../interfaces/CartItem";
import { CreditNote } from "../../interfaces/CreditNote";
import { Person } from "../../interfaces/Person";
import { Product } from "../../interfaces/Product";
import { PurchaseOrder } from "../../interfaces/PurchaseOrder";
import { PurchaseOrderDetail } from "../../interfaces/PurchaseOrderDetail";
import { Stock } from "../../interfaces/Stock";
import { useStore } from "../../store/CartStore";
import { useStore as useCurrentUser } from "../../store/CurrentUserStore";
import { useStore as useToken } from "../../store/UserTokenStore";
import "./cart.css";

const ModalOrderDetails = lazy(
  () => import("../../components/modalOrderDetails/ModalOrderDetails")
);

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

const Cart = () => {
  const { cartProducts, remove, clear, removeOne, addOne } = useStore();
  const { token } = useToken();
  const { user } = useCurrentUser();
  const { isAuthenticated } = useAuth0();

  const [purchaseOrder, setPurchaseOrder] = useState<PurchaseOrder>({
    ...PURCHASE_ORDER_INITIAL_STATE,
    shippingType: "Retiro en el local",
    paymentMethod: "Efectivo",
    status: { id: 1, status: "A confirmar" },
  });

  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>();

  const [creditNotes, setCreditNotes] = useState<CreditNote[]>();
  const [userCreditNotes, setUserCreditNotes] = useState<CreditNote[]>([]);

  const [totalCreditNoteAmount, setTotalCreditNoteAmount] = useState(0);
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
    getCreditNotes();
  }, []);

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
    const priceTime = {
      totalPrice: 0,
      highestTime: 0,
    };

    // Recorremos la lista de productos agregados al carrito para calcular el precio total y tiempo de cocina
    cartProducts.forEach((cartProduct) => {
      if (cartProduct.product.type === "product") {
        const productObj = cartProduct.product as Product;

        // Si el tiempo de cocina del producto es mayor al tiempo de cocina actual, lo reemplazamos
        if (productObj.estimatedTimeKitchen > priceTime.highestTime) {
          priceTime.highestTime = productObj.estimatedTimeKitchen;
        }
        priceTime.totalPrice +=
          (productObj.salePrice -
            productObj.salePrice * (productObj.discountPercentaje / 100)) *
          cartProduct.amount;
      }

      if (cartProduct.product.type === "stock")
        priceTime.totalPrice +=
          cartProduct.product.salePrice * cartProduct.amount;
    });

    setPriceAndTime(priceTime);
  }, [cartProducts]);

  useEffect(() => {
    if (creditNotes && creditNotes.length > 0 && user) {
      setUserCreditNotes(
        creditNotes.filter(
          (note: CreditNote) =>
            note.purchaseOrder.person?.user_id === user.user_id && note.active
        )
      );
    }
  }, [creditNotes, user]);

  useEffect(() => {
    if (userCreditNotes.length > 0) {
      userCreditNotes.forEach((note: CreditNote) => {
        setTotalCreditNoteAmount(totalCreditNoteAmount + note.total);
      });
    }
  }, [userCreditNotes]);

  useEffect(() => {
    if (purchaseOrder.shippingType === "Retiro en el local") {
      setPurchaseOrder({
        ...purchaseOrder,
        amountToPaid:
          totalCreditNoteAmount >
          parseFloat((priceAndTime.totalPrice * 0.9).toFixed(0))
            ? 0
            : parseFloat((priceAndTime.totalPrice * 0.9).toFixed(0)) -
              totalCreditNoteAmount,
      });
    } else {
      setPurchaseOrder({
        ...purchaseOrder,
        amountToPaid:
          totalCreditNoteAmount > priceAndTime.totalPrice
            ? 0
            : priceAndTime.totalPrice - totalCreditNoteAmount,
      });
    }
  }, [purchaseOrder.shippingType]);

  useEffect(() => {
    if (confirmPurchase) {
      createOrder();
      setConfirmPurchase(false);
    }
  }, [confirmPurchase]);

  useEffect(() => {
    if (purchaseOrder.details && purchaseOrder.details?.length > 0) {
      let insufficientStock = false;
      const cantidadesStock: { [key: string]: number } = {};

      for (const detail of purchaseOrder.details) {
        if (detail.product?.details) {
          for (const productDetail of detail.product.details) {
            if (!cantidadesStock[productDetail.stock.denomination]) {
              cantidadesStock[productDetail.stock.denomination] = 0;
            }
            cantidadesStock[productDetail.stock.denomination] +=
              productDetail.amount * detail.amount;
          }
        }
      }

      for (const detail of purchaseOrder.details) {
        if (detail.product?.details) {
          for (const productDetail of detail.product.details) {
            if (
              productDetail.stock.currentStock -
                cantidadesStock[productDetail.stock.denomination] <
              0
            ) {
              insufficientStock = true;
              toast.error(
                `Lo sentimos, no hay suficiente stock de "${productDetail.stock?.denomination}" para preparar los productos seleccionados.`
              );
              break;
            }
          }
        }
        if (insufficientStock) break;
      }

      if (!insufficientStock) {
        setOpen(true);
      }
    }
  }, [purchaseOrder.details]);

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

  const getCreditNotes = async () => {
    const response = await getAllCreditNotes();
    setCreditNotes(response);
  };

  const handleContinueBuy = () => {
    // const currentDate = new Date();
    if (!isAuthenticated) {
      toast.error("Debes iniciar sesión para realizar una compra.");
    } else if (!isPerfilComplete) {
      toast.error(
        "Debes completar la información de tu perfil antes de realizar una compra."
      );
    } else if (user?.role != "Cliente") {
      toast.error(
        "No puedes realizar una compra con la cuenta de un empleado. Por favor, utiliza otra cuenta."
      );
    } else if (user.user_metadata.state === "De baja") {
      toast.error(
        "No puedes realizar una compra porque estás dado de baja del sistema."
      );
    } else {
      // if (
      //   (currentDate.getDay() > 0 &&
      //     currentDate.getDay() < 6 &&
      //     currentDate.getHours() >= 20) ||
      //   ((currentDate.getDay() === 0 || currentDate.getDay() === 6) &&
      //     (currentDate.getHours() >= 20 ||
      //       (currentDate.getHours() >= 11 && currentDate.getHours() < 15)))
      // ) {
      const details: PurchaseOrderDetail[] = cartProducts.map((cartProduct) => {
        // Obtenemos el subtotal de la compra dependiendo del tipo de producto
        let subtotal = 0;
        const productObj = cartProduct.product as Product;
        const stockObj = cartProduct.product as Stock;
        const productType = cartProduct.product.type;

        if (productType === "stock") {
          subtotal = cartProduct.product.salePrice * cartProduct.amount;
        }

        if (productType === "product") {
          subtotal =
            (cartProduct.product.salePrice -
              cartProduct.product.salePrice *
                (productObj.discountPercentaje / 100)) *
            cartProduct.amount;
        }

        return {
          amount: cartProduct.amount,
          subtotal: subtotal,
          product: productType === "product" ? productObj : null,
          stock: productType === "stock" ? stockObj : null,
        } as PurchaseOrderDetail;
      });

      setPurchaseOrder({
        ...purchaseOrder,
        details: details,
        total:
          purchaseOrder.shippingType === "Retiro en el local"
            ? parseFloat((priceAndTime.totalPrice * 0.9).toFixed(0))
            : priceAndTime.totalPrice,
        amountToPaid:
          totalCreditNoteAmount >
          parseFloat((priceAndTime.totalPrice * 0.9).toFixed(0))
            ? 0
            : purchaseOrder.shippingType === "Retiro en el local"
            ? parseFloat((priceAndTime.totalPrice * 0.9).toFixed(0)) -
              totalCreditNoteAmount
            : priceAndTime.totalPrice - totalCreditNoteAmount,
      });
      // } else {
      //   toast.error(
      //     "Lo sentimos, no puedes realizar un pedido fuera de nuestro horario de atención. El mismo es de 20:00 hs. a 00:00 hs. de lunes a viernes y también de 11:00 hs. a 15:00 hs. los sábados y domingos.",
      //     {
      //       duration: 10000,
      //       icon: <FaClock />,
      //     }
      //   );
      // }
    }
  };
  const handleClose = () => setOpen(false);

  const handleOpenModalOrderDetails = () => {
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
      estimatedEndTime:
        purchaseOrder.shippingType === "Envío a domicilio"
          ? priceAndTime.highestTime + highestTimeOrders + 10
          : priceAndTime.highestTime + highestTimeOrders,
      fecha: new Date(),
    });
    setOpenModalOrderDetails(true);
  };

  const createOrder = async () => {
    let response = null;

    if (userCreditNotes.length > 0) {
      if (purchaseOrder.total >= totalCreditNoteAmount) {
        response = await createPurchaseOrder(
          {
            ...purchaseOrder,
            amountToPaid: purchaseOrder.total - totalCreditNoteAmount,
          },
          token
        );

        userCreditNotes.forEach((note: CreditNote) => {
          updateCreditNote({ ...note, total: 0, active: false }, token);
        });
      } else {
        response = await createPurchaseOrder(
          { ...purchaseOrder, paymentMethod: "Efectivo" },
          token
        );

        let totalOrder = purchaseOrder.total;

        userCreditNotes.forEach((note: CreditNote) => {
          if (totalOrder >= note.total) {
            totalOrder = totalOrder - note.total;
            updateCreditNote({ ...note, total: 0, active: false }, token);
          } else {
            updateCreditNote(
              { ...note, total: note.total - totalOrder },
              token
            );
          }
        });
      }
    } else {
      response = await createPurchaseOrder(purchaseOrder, token);
    }

    if (response) {
      toast.success("Orden creada correctamente.");

      if (purchaseOrder.details) {
        const updatedStocks: Stock[] = [];
        for (const orderDetail of purchaseOrder.details) {
          if (orderDetail.product?.details) {
            for (const productDetail of orderDetail.product.details) {
              let stockIndex = -1;
              let updatedStock: Stock | null = null;
              if (updatedStocks.length > 0) {
                stockIndex = updatedStocks.findIndex(
                  (stock: Stock) => stock.id === productDetail.stock.id
                );
              }
              const reduction = parseFloat(
                (productDetail.amount * orderDetail.amount).toFixed(2)
              );

              if (stockIndex != -1) {
                updatedStocks[stockIndex].currentStock = parseFloat(
                  (updatedStocks[stockIndex].currentStock - reduction).toFixed(
                    2
                  )
                );
              } else {
                updatedStock = {
                  ...productDetail.stock,
                  currentStock: parseFloat(
                    (productDetail.stock.currentStock - reduction).toFixed(2)
                  ),
                };
                if (updatedStock) {
                  updatedStocks.push(updatedStock);
                }
              }
            }
          }
        }
        for (const stock of updatedStocks) {
          if (stock) {
            await updateStock(stock, token);
          }
        }
      }
    } else {
      toast.error("Error al crear la orden.");
    }
    handleClose();
    clear();
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
      total:
        event.target.value === "Retiro en el local"
          ? parseFloat((priceAndTime.totalPrice * 0.9).toFixed(0))
          : priceAndTime.totalPrice,
    });
  };

  const getCartProductPriceForCard = (item: CartItem) => {
    if (item.product.type === "product") {
      const productObj = item.product as Product;
      return (
        (productObj.salePrice -
          productObj.salePrice * (productObj.discountPercentaje / 100)) *
        item.amount
      );
    }

    if (item.product.type === "stock") {
      return item.product.salePrice * item.amount;
    }
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
                <p>Precio: ${getCartProductPriceForCard(cartItem)}</p>
              </div>
              <button
                onClick={() =>
                  remove(cartItem.product.id, cartItem.product.type)
                }
              >
                Eliminar
              </button>
              <div>
                {cartItem.amount > 1 && (
                  <FaMinus
                    onClick={() =>
                      removeOne(cartItem.product.id, cartItem.product.type)
                    }
                  />
                )}
                <input
                  type="number"
                  className="cart_item_amount_input"
                  value={cartItem.amount}
                  readOnly
                />
                {cartItem.amount < 99 && (
                  <FaPlus
                    onClick={() =>
                      addOne(cartItem.product.id, cartItem.product.type)
                    }
                  />
                )}
                {cartItem.amount > 1 ? (
                  <p style={{ userSelect: "none" }}>Uds.</p>
                ) : (
                  <p style={{ userSelect: "none" }}>Ud.</p>
                )}
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
            <button onClick={handleContinueBuy}>Continuar</button>
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

            {userCreditNotes.length > 0 && (
              <h5>
                Atención: Tienes una nota de crédito con un monto de $
                {totalCreditNoteAmount} a tu favor. Se usará automáticamente. En
                caso de que el monto a abonar sea mayor, deberás pagar la
                diferencia. Si es menor, se guardará el saldo restante de tu
                nota de crédito.
              </h5>
            )}

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
