import { Product } from "../../../interfaces/Product";

interface ShoppingCartProps {
  shoppingCart: Product[];
}

const ShoppingCart = ({ shoppingCart }: ShoppingCartProps) => {
  return (
    <div>
      <h2>Carrito de compras</h2>
      <ul>
        {shoppingCart.map((product) => (
          <li key={product.id}>
            {product.denomination} - ${product.salePrice}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingCart;
