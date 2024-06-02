import { MouseEvent, useState } from "react";
import { toast } from "sonner";
import AliceCarousel from "react-alice-carousel";
import { Product } from "../../../interfaces/Product";
import { useStore as useCart } from "../../../store/CartStore";
import { FaCartShopping, FaClock } from "react-icons/fa6";
import "react-alice-carousel/lib/alice-carousel.css";
import "./carrousel.css";
import ModalProductDetail from "../../ModalProductDetail/ModalProductDetail";

interface Props {
  products: Product[];
}

const Carrousel = ({ products }: Props) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  const { add } = useCart();

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const buttonClick = (product: Product, event?: MouseEvent | undefined) => {
    event?.stopPropagation();

    // const currentDate = new Date();

    // if (
    //   (currentDate.getDay() > 0 &&
    //     currentDate.getDay() < 6 &&
    //     currentDate.getHours() >= 20) ||
    //   ((currentDate.getDay() === 0 || currentDate.getDay() === 6) &&
    //     (currentDate.getHours() >= 20 ||
    //       (currentDate.getHours() >= 11 && currentDate.getHours() < 15)))
    // ) {
    let insufficientStock = false;
    for (const productDetail of product.details) {
      if (productDetail.stock.currentStock - productDetail.amount < 0) {
        insufficientStock = true;
      }

      if (insufficientStock) {
        toast.error(
          `Lo sentimos, no hay suficiente stock para preparar el producto "${product.denomination}".`
        );
        break;
      }
    }

    if (!insufficientStock) {
      toast.success("Producto agregado al carrito.");
      add(product);
    }
    // } else {
    //   toast.error(
    //     "Lo sentimos, no puedes agregar un producto al carrito fuera de nuestro horario de atención. El mismo es de 20:00 hs. a 00:00 hs. de lunes a viernes y también de 11:00 hs. a 15:00 hs. los sábados y domingos.",
    //     {
    //       duration: 10000,
    //       icon: <FaClock />,
    //     }
    //   );
    // }
  };

  const createCarouselItems = (products: Product[]) =>
    products.map((product) => (
      <div
        className="productCard"
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
            <button onClick={(e) => buttonClick(product, e)}>
              <FaCartShopping />
            </button>
          </div>
        </div>
      </div>
    ));

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
      <ModalProductDetail
        open={open}
        product={selectedProduct}
        setOpen={setOpen}
        onAddToCart={buttonClick}
      />
    </div>
  );
};

export default Carrousel;
