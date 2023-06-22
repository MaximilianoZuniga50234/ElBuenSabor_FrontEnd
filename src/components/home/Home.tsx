import { useSelector } from "react-redux";
import { RootState } from "../../context/store";
import HomePopular from "./homePopular/HomePopular";
import HomeOffers from "./homeOffers/HomeOffers";
import "./home.css";

const Home = () => {
  const productsFounded = useSelector(
    (state: RootState) => state.articuloManufacturado
  );

  return (
    <main className="homeMainContainer">
      <header>{/*Para los headers*/}</header>
      <h2>DESTACADOS</h2>
      <HomePopular />
      <h2>OFERTAS</h2>
      <HomeOffers />
    </main>
  );
};

export default Home;
