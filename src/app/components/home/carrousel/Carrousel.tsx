import { useState, useEffect } from "react";
import Modal from "../../../components/modal/Modal";
import { Product } from "../../../interfaces/Product";
import "./carrusel.css";
import { getAllProduct } from "../../../functions/ProductAPI";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { BiCartAdd } from "react-icons/bi";
import ShoppingCart from  "../shoppingCart/ShoppingCart";

const Carrousel = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shoppingCart, setShoppingCart] = useState<Product[]>([]);

  const getProductsJSONFetch = async () => {
    try {
      const response = await getAllProduct();
      setProducts(response);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    getProductsJSONFetch();
  }, []);

  const ButtonClick = (product: Product) => {
    setShoppingCart([...shoppingCart, product]);
 };

  const items = products.map((product) => (
    <div className="productCard" key={product.id}>
      <figure className="productFigure">
        <img
          src={product.imgUrl}
          alt=""
          className="productImage"
          onClick={() => openModal(product)}
        />
      </figure>
      <div className="productInfo">
        <div className="productName">
          <p className="products__card__p">{product.denomination}</p>
        </div>
        <div className="productPriceIcon">
          <div className="productPrice">
            <p className="products__card__p">${product.salePrice}</p>
          </div>

          <div className="productCart">
            <button className="button" onClick={() => ButtonClick(product)}>
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
        items={items}
        responsive={{
          0: { items: 1 },
          800: { items: 2 },
          1024: { items: 2 },
          1304: { items: 3 },
          2560: { items: 5 },
          5570: { items: 7 }
        }}
        infinite
        mouseTracking
      />
      <ShoppingCart shoppingCart={shoppingCart} />
      <Modal
        isOpen={isModalOpen}
        product={selectedProduct}
        onClose={closeModal}
        onAddToCart={ButtonClick}
      />
    </div>
  );
};

export default Carrousel;
