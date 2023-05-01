import "./landing.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landingMainContainer">
      <div className="landingLogoContainer">
        <img src="./images/landing/landingLogo.png" alt="Logo" />
        <Link className="landingButton" to="/home">
          VER CATÁLOGO
        </Link>
      </div>
      <div className="landingImagesContainer">
        <img
          src="./images/landing/landingBurger.jpg"
          alt="comida1"
        />
        <img src="./images/landing/landingPizza.jpg" alt="comida2" />
      </div>
    </div>
  );
};

export default Landing;
