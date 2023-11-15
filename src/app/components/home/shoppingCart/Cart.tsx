import { useStore } from "../../../store/CartStore";
import { Product } from "../../../interfaces/Product";

const Cart = () => {
  const { cartProducts, remove } = useStore();

  return (
    <div>
      <h2>Carrito de compras</h2>
      <p>{cartProducts.length}</p>
      {cartProducts.map((product: Product) => (
        <div key={product.id}>
          <h3>{product.denomination}</h3>
          <p>{product.salePrice}</p>
          <button onClick={() => remove(product.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
