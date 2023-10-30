import { useState, useEffect } from "react";
import Modal from "../../../components/modal/Modal";
import { Product } from "../../../interfaces/Product";
import "./carrusel.css";
import { getAllProduct } from "../../../functions/ProductAPI";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { BiCartAdd } from "react-icons/bi";
import "../../../pages/all products/allproducts.css";

const Carrousel = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const ButtonClick = (product: Product) => {};

  const items = products.map((product) => (
    <div className="allProducts__card" key={product.id}>
      <figure className="allProducts__card__figure">
        <img
          src={product.imgUrl}
          alt=""
          className="allProducts__card__img"
          onClick={() => openModal(product)}
        />
      </figure>
      <div className="allProducts__card__text">
        <div className="allProducts__card__productName">
          <p className="allProducts__card__p">{product.denomination}</p>
        </div>
        <div className="allProducts__card__priceAndCart">
          <div className="allProducts__card__price">
            <p className="allProducts__card__p">${product.salePrice}</p>
          </div>

          <div className="allProducts__card__cart">
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
          568: { items: 2 },
          1024: { items: 5 },
        }}
        infinite
        mouseTracking
      />
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
