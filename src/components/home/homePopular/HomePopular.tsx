import HomeProductCardPopular from "./homeProductCardPopular/HomeProductCardPopular";
import "./homePopular.css";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const HomePopular = () => {
  return (
    <section className="homeProductPopularContainer">
      <FiArrowLeft className="homeProductPopularArrowLeft" />
      <HomeProductCardPopular />
      <HomeProductCardPopular />
      <HomeProductCardPopular />
      <FiArrowRight className="homeProductPopularArrowRigth" />
    </section>
  );
};

export default HomePopular;
