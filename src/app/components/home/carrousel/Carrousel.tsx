import { useState, useEffect } from "react";
import Modal from "../../../components/modal/Modal";
import { Product } from "../../../interfaces/Product";
import "./carrusel.css";
import { getAllProduct } from "../../../functions/ProductAPI";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { BiCartAdd } from "react-icons/bi";
import { useStore } from "../../../store/CartStore";

const Carrousel = () => {
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);
  const [discountProducts, setDiscountProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addToCart = useStore().add;

  const getProductsJSONFetch = async () => {
    try {
      const response = await getAllProduct();
      const discountProducts = response.filter(
        (product: Product) => product.discountPercentaje > 0
      );
      setDiscountProducts(discountProducts);

      const nonDiscountProducts = response.filter(
        (product: Product) =>
          !product.discountPercentaje || product.discountPercentaje === 0
      );
      const shuffled = nonDiscountProducts.sort(() => 0.5 - Math.random());
      setRandomProducts(shuffled.slice(0, 10));
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    getProductsJSONFetch();
  }, []);

  const buttonClick = (product: Product) => {
    addToCart(product);
  };

  const createCarouselItems = (products: Product[], showDiscount: boolean) =>
    products.map((product) => (
      <div className="productCard" key={product.id}>
        <figure className="productFigure">
          <div className="image-discount">
            <img
              src={product.imgUrl}
              alt=""
              className="productImage"
              onClick={() => openModal(product)}
            />
            {showDiscount && (
              <div className="productDiscount">
                <p className="products__card__d">
                  -{product.discountPercentaje}%
                </p>
              </div>
            )}
          </div>
        </figure>
        <div className="productInfo">
          <div className="productName">
            <p className="products__card__p">{product.denomination}</p>
          </div>
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
            <div className="productCart">
              <button className="button" onClick={() => buttonClick(product)}>
                <BiCartAdd className="cart-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    ));

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="Carrousel">
      <h1 className="title">Destacados</h1>
      <AliceCarousel
        items={createCarouselItems(randomProducts, false)}
        responsive={{
          0: { items: 1 },
          800: { items: 2 },
          1024: { items: 2 },
          1304: { items: 3 },
          1440: { items: 4 },
          2560: { items: 5 },
          5570: { items: 7 },
        }}
        infinite
        mouseTracking
      />
      <h1 className="title">Ofertas</h1>
      <AliceCarousel
        items={createCarouselItems(discountProducts, true)}
        responsive={{
          0: { items: 1 },
          800: { items: 2 },
          1024: { items: 2 },
          1304: { items: 3 },
          1440: { items: 4 },
          2560: { items: 5 },
          5570: { items: 7 },
        }}
        infinite
        mouseTracking
      />
      <Modal
        isOpen={isModalOpen}
        product={selectedProduct}
        onClose={closeModal}
        onAddToCart={buttonClick}
      />
    </div>
  );
};

export default Carrousel;
