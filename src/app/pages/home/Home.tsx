import { useEffect, useState } from "react";
import Modal from "../../components/modal/Modal";
import { Product } from "../../interfaces/Product";
import { useStore as useProduct } from "../../store/ProductStore";
import { getAllProduct } from "../../functions/ProductAPI";
import Categories from "../../components/home/categories/Categories";
import { useMediaQuery } from "react-responsive";
import "./Home.css";
import MobileCard from "../../components/home/card/MobileCard";
import DesktopCard from "../../components/home/card/DesktopCard";

const Home = () => {
  const products = useProduct().products;

  const isMobile = useMediaQuery({ maxWidth: 425 });
  const isDesktop = useMediaQuery({ minWidth: 426 });

  /* const [products, setProducts] = useState<Product[]>([]);

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
  }, []); */

  return (
    <div className="home_main_container">
      <h1>PRODUCTOS</h1>
      <div className="products_group">
        {products.map((p) => (
           isMobile && <MobileCard key={p.id} product={p} /> ||
           isDesktop && <DesktopCard key={p.id} product={p} />
        ))}
      </div>
      <Categories />
      {/* <Modal
        isOpen={isModalOpen}
        product={selectedProduct}
        onClose={closeModal}
        onAddToCart={ButtonClick}
      /> */}
    </div>
  );
};

export default Home;
