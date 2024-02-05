import { Suspense, lazy, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Product } from "../../interfaces/Product";
import {
  getFeaturedProducts,
  getProductsInSale,
} from "../../functions/ProductAPI";
import { useStore as useCurrentUser } from "../../store/CurrentUserStore";
import Loader from "../../components/loader/Loader";
import "./Home.css";

const Header1 = lazy(() => import("../../components/header/header1/Header1"));
const Carrousel = lazy(
  () => import("../../components/home/carrousel/Carrousel")
);
const Categories = lazy(
  () => import("../../components/home/categories/Categories")
);

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

    //Con esta línea forzas una redirección a la página de error con un error 500
    //De esta forma vamos a manejar los errores...
    //navigate("/error", {state: {error: "500", message: "Error de prueba"}});

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
    <Suspense fallback={<Loader />}>
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
    </Suspense>
  );
};

export default Home;
