import { MouseEvent } from "react";
import AliceCarousel from "react-alice-carousel";
import { FaCartShopping } from "react-icons/fa6";
import { Product } from "../../../interfaces/Product";
import { Stock } from "../../../interfaces/Stock";
import "react-alice-carousel/lib/alice-carousel.css";
import "./carrousel.css";

interface Props {
  products: Product[];
  openModal: (product: Product | Stock) => void;
  buttonClick: (
    product: Product | Stock,
    event?: MouseEvent<HTMLButtonElement, globalThis.MouseEvent> | undefined
  ) => void;
}

const Carrousel = ({ products, openModal, buttonClick }: Props) => {
  const createCarouselItems = (products: Product[]) =>
    products.map((product) => {
      const productWithoutStock = product.details.some(
        (detail) => detail.stock.currentStock - detail.amount < 0
      );

      return (
        <div
          className={`productCard ${
            productWithoutStock ? "productCardNoStock" : ""
          }`}
          key={product.id}
          onClick={() => openModal(product)}
        >
          <div className="image-discount">
            <img src={product.imgUrl} alt="" className="productImage" />
            {product.discountPercentaje > 0 && (
              <p>-{product.discountPercentaje}%</p>
            )}
          </div>
          <div className="productInfo">
            <p className="products__card__p">
              <span>{product.denomination}</span>
            </p>
            <div className="productPriceIcon">
              <div className="productPrice">
                {product.discountPercentaje > 0 ? (
                  <>
                    <p className="products__card__p">
                      <s>${product.salePrice}</s>
                    </p>
                    <p className="products__card__p">
                      $
                      {product.salePrice -
                        product.salePrice * (product.discountPercentaje / 100)}
                    </p>
                  </>
                ) : (
                  <p className="products__card__p">${product.salePrice}</p>
                )}
              </div>
              {!productWithoutStock && (
                <button onClick={(e) => buttonClick(product, e)}>
                  <FaCartShopping />
                </button>
              )}
            </div>
          </div>
        </div>
      );
    });

  return (
    <div className="carrousel">
      <AliceCarousel
        items={createCarouselItems(products)}
        responsive={{
          0: { items: 1 },
          550: { items: 2 },
          820: { items: 3 },
          1100: { items: 4 },
          1440: { items: 5 },
          1700: { items: 6 },
          2050: { items: 7 },
          2400: { items: 8 },
        }}
        infinite
        mouseTracking
      />
    </div>
  );
};

export default Carrousel;
