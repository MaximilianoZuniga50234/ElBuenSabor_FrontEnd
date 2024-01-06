import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Product } from "../../interfaces/Product";

interface Props {
  product: Product;
}

export default function AllProductsCard({ product }: Props) {
  return (
    <div className="allProducts__card">
      <img
        src={product.imgUrl}
        alt="Imagen del producto"
        className="allProducts__card__img"
      />
      <div className="allProducts__card__text">
        <h6><span>{product.denomination}</span></h6>
        <div className="allProducts__card__priceAndCart">
          <p className="allProducts__card__p">${product.salePrice}</p>
          <Link
            to="#"
            className="allProducts__bar__link__cart"
          >
            <FaCartShopping />
          </Link>
        </div>
      </div>
    </div>
  );
}
