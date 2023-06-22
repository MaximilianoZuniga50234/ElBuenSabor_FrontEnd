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
      <HomePopular />
      <HomeOffers />
    </main>
  );
};

export default Home;
