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
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
import { useStore as useCurrentUser } from "../../store/CurrentUserStore";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);
  const [isPerfilComplete, setIsPerfilComplete] = useState<boolean>(true);
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const { isAuthenticated } = useAuth0();

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

  useEffect(() => {
    if (isAuthenticated && !isPerfilComplete) {
      toast(
        "Serás redireccionado a tu perfil para que completes tu información."
      );
      setTimeout(() => {
        navigate("/u/profile");
      }, 3000);
    }
  }, [isAuthenticated, isPerfilComplete]);

  useEffect(() => {
    if (user != null) {
      if (
        user?.given_name === "" ||
        user?.family_name === "" ||
        user?.user_metadata?.address?.department === "" ||
        user?.user_metadata?.address?.number === 0 ||
        user?.user_metadata?.address?.street === ""
      ) {
        setIsPerfilComplete(false);
      }
    }
  }, [user]);

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
