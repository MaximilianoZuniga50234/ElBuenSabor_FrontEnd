import { useState, useEffect } from "react";
import Modal from "../components/modal/Modal"; 
import { Product } from "../interfaces/Product";
import "./Home.css";
import { getAllProduct } from "../functions/ProductAPI";
import { BiCartAdd } from "react-icons/bi";
import { GrNext, GrPrevious } from 'react-icons/gr';

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
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

  const moveCarousel = (direction: "prev" | "next") => {
    const numProducts = products.length;

    if (direction === "prev") {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? numProducts - 1 : prevIndex - 1
      );
    } else if (direction === "next") {
      setCurrentIndex((prevIndex) =>
        prevIndex === numProducts - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const ButtonClick = (product: Product) => {

  };

  return (
    <div>
      <div style={{ height: "50px"}}></div>
      <h1 style={{ textAlign: "center", margin: "0 0 20px 0" }}>Destacados</h1>
      <div className="carousel-container">
        <span onClick={() => moveCarousel("prev")} className="carousel-arrow">
          <GrPrevious />
        </span>
        <div className="carousel-content">
          <div
            style={{
              display: "flex",
              maxHeight: "250px",
              transform: `translateX(-${currentIndex * 125}px)`,
              transition: "transform 0.3s ease-in-out",
            }}
          >
            {products.map((product) => (
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
                    <button className="button"onClick={() => ButtonClick(product)}>
                      <BiCartAdd className="cart-icon" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <span onClick={() => moveCarousel("next")} className="carousel-arrow">
          <GrNext />
        </span>
      </div>

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

