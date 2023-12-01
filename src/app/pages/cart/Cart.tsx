import { useStore } from "../../store/CartStore";
import { Link } from "react-router-dom";
import { CartItem } from "../../interfaces/CartItem";
import { createPurchaseOrder } from "../../functions/PurchaseOrderAPI";
import { MouseEvent } from "react";
import "./cart.css";
import { FaArrowLeft, FaMinus, FaPlus } from "react-icons/fa6";

const Cart = () => {
  const { cartProducts, remove, clear, removeOne, addOne } = useStore();

  const handleConfirm = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await createPurchaseOrder(cartProducts);
    clear();
  };

  return (
    <div className="cart_main_container">
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
        <button onClick={handleConfirm}>Confirmar compra</button>
      </div>
    </div>
  );
};

export default Cart;
