import { useEffect, useState } from "react";
import { Product } from "../../interfaces/Product";
import { Header1 } from "../../components/header/header1/Header1";
import Carrousel from "../../components/home/carrousel/Carrousel";
import Categories from "../../components/home/categories/Categories";
import {
  getFeaturedProducts,
  getProductsInSale,
} from "../../functions/ProductAPI";
import "./Home.css";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);

  const getProductsForCarrousel = async () => {
    try {
      setFeaturedProducts(await getFeaturedProducts());
      setSaleProducts(await getProductsInSale());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductsForCarrousel();
  }, []);

  return (
    <>
      <Header1 />
      <br />
      <div className="home_main_container">
        <div className="home_featured_products">
          <h1 className="title">Destacados</h1>
          <Carrousel products={featuredProducts} />
        </div>
        <div className="home_sale_products">
          <h1 className="title">Ofertas</h1>
          <Carrousel products={saleProducts} />
        </div>
        <Categories />
        {/* <Modal
        isOpen={isModalOpen}
        product={selectedProduct}
        onClose={closeModal}
        onAddToCart={ButtonClick}
      /> */}
      </div>
    </>
  );
};

export default Home;
