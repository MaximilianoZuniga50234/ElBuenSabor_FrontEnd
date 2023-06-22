import HomeProductCardPopular from "./homeProductCardPopular/HomeProductCardPopular";
import "./homePopular.css";

const HomePopular = () => {
  return (
    <section className="homeProductPopularContainer">
      <h2>DESTACADOS</h2>
      <HomeProductCardPopular />
      <HomeProductCardPopular />
      <HomeProductCardPopular />
    </section>
  );
};

export default HomePopular;
