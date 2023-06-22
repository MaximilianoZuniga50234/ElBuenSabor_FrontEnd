import HomeProductCardOffers from "./homeProductCardOffers/HomeProductCardOffers";
import "./homeOffers.css";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const HomeOffers = () => {
  return (
    <section className="homeProductOffersContainer">
      <FiArrowLeft className="homeProductOffersArrowLeft" />
      <HomeProductCardOffers />
      <HomeProductCardOffers />
      <HomeProductCardOffers />
      <FiArrowRight className="homeProductOffersArrowRigth" />
    </section>
  );
};

export default HomeOffers;
