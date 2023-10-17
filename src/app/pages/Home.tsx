import { useState, useEffect } from "react";
import Modal from "../components/modal/Modal";
import { Product } from "../interfaces/Product";
import "./Home.css";
import { getAllProduct } from "../functions/ProductAPI";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { BiCartAdd } from "react-icons/bi";

const Home = () => {
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

  const ButtonClick = (product: Product) => {

  };

  const items = products.map((product) => (
    <div key={product.id} className="product-card">
      <img
        src={product.imgUrl}
        alt={product.denomination}
        className="product-image"
        onClick={() => openModal(product)}
      />
      <div className="product-info">
        <h3 className="product-title">{product.denomination}</h3>
        <div className="product-price">
          <h4>${product.salePrice}</h4>
          <button className="button" onClick={() => ButtonClick(product)}>
            <BiCartAdd className="cart-icon" />
          </button>
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
    <div className="Home">
      <h1>Destacados</h1>
      <AliceCarousel
        items={items}
        responsive={{
          0: { items: 1 },
          568: { items: 2 },
          1024: { items: 3 },
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

export default Home;