import HomeProductCardOffers from "./homeProductCardOffers/HomeProductCardOffers";
import "./homeOffers.css";

const HomeOffers = () => {
  return (
    <section className="homeProductOffersContainer">
      <h2>OFERTAS</h2>
      <HomeProductCardOffers />
      <HomeProductCardOffers />
      <HomeProductCardOffers />
    </section>
  );
};

export default HomeOffers;
