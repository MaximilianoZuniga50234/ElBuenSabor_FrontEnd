import { useStore } from "../../store/CartStore";
import { Link } from "react-router-dom";
import { CartItem } from "../../interfaces/CartItem";
import { createPurchaseOrder } from "../../functions/PurchaseOrderAPI";
import { MouseEvent } from "react";
import "./cart.css";

const Cart = () => {
  const { cartProducts, remove, clear } = useStore();

  const handleConfirm = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await createPurchaseOrder(cartProducts);
    clear();
  };

  return (
    <div>
      <h2>Carrito de compras</h2>
      <p>{cartProducts.length} Productos</p>
      {cartProducts.map((cartItem: CartItem) => (
        <div key={cartItem.product.id}>
          <h3>
            {cartItem.product.denomination}
            <p>{cartItem.amount}</p>
          </h3>
          <p>{cartItem.product.salePrice}</p>
          <button onClick={() => remove(cartItem.product.id)}>Eliminar</button>
        </div>
      ))}
      <Link to="/">Volver</Link>
      <button onClick={() => clear()}>Limpiar</button>
      <button onClick={handleConfirm}>Confirmar</button>
    </div>
  );
};

export default Cart;
