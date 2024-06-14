import { FaCartShopping } from "react-icons/fa6";
import { Product } from "../../interfaces/Product";
import { toast } from "sonner";
import { useStore as useCart } from "../../store/CartStore";
import { MouseEvent, useState } from "react";
import ModalProductDetail from "../ModalProductDetail/ModalProductDetail";

interface Props {
  product: Product;
}

export default function AllProductsCard({ product }: Props) {
  const { add } = useCart();

  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const addToCart = (product: Product, event?: MouseEvent | undefined) => {
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
      toast.success("Producto agregado al carrito");
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

  return (
    <>
      <div className="allProducts__card" onClick={() => openModal()}>
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
            {product.discountPercentaje > 0 ? (
              <div className="allProducts__card__p__withDiscount">
                <p className="allProducts__card__p">
                  <span>${product.salePrice}</span>
                </p>
                <p className="allProducts__card__p">
                  $
                  {product.salePrice -
                    product.salePrice * (product.discountPercentaje / 100)}
                </p>
              </div>
            ) : (
              <p className="allProducts__card__p">${product.salePrice}</p>
            )}
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
          </div>
        </div>
      </div>
      <ModalProductDetail
        open={open}
        product={product}
        setOpen={setOpen}
        onAddToCart={addToCart}
      />
    </>
  );
}
