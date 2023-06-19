import "./landing.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landingMainContainer">
      <div className="landingLogoContainer">
        <img src="./images/landing/logo2azulGris.png" alt="Logo" />
        <Link className="landingButton" to="/allProducts">
          VER CATÁLOGO
        </Link>
      </div>
    </div>
  );
};

export default Landing;
