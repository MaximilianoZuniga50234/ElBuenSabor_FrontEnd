import { MouseEvent } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { Product } from "../../interfaces/Product";
import { Stock } from "../../interfaces/Stock";

interface Props {
  product: Product | Stock;
  openModal: (product: Product | Stock) => void;
  addToCart: (
    product: Product | Stock,
    event?: MouseEvent<HTMLButtonElement, globalThis.MouseEvent> | undefined
  ) => void;
}

export default function AllProductsCard({
  product,
  openModal,
  addToCart,
}: Props) {
  const productObj = product as Product;
  const stockObj = product as Stock;
  const productWithoutStock = productObj.details?.some(
    (detail) => detail.stock.currentStock - detail.amount < 0
  );
  const noStock = stockObj.currentStock - 1 < 0;

  return (
    <div
      className={`allProducts__card ${
        productWithoutStock || noStock ? "allProducts__cardNoStock" : ""
      }`}
      onClick={() => openModal(product)}
    >
      <img
        src={product.imgUrl}
        alt="Imagen del producto"
        className="allProducts__card__img"
      />
      <div className="allProducts__card__text">
        <h6>
          <span>{product.denomination}</span>
        </h6>
        <div className="allProducts__card__priceAndCart">
          {productObj.discountPercentaje > 0 ? (
            <div className="allProducts__card__p__withDiscount">
              <p className="allProducts__card__p">
                <span>${product.salePrice}</span>
              </p>
              <p className="allProducts__card__p">
                $
                {product.salePrice -
                  product.salePrice * (productObj.discountPercentaje / 100)}
              </p>
            </div>
          ) : (
            <p className="allProducts__card__p">${product.salePrice}</p>
          )}
          {!(productWithoutStock || noStock) && (
            <div className="allProducts__card__addProduct">
              <button
                className="allProducts__bar__link__cart"
                onClick={(e) => {
                  addToCart(product, e);
                }}
              >
                <FaCartShopping />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
