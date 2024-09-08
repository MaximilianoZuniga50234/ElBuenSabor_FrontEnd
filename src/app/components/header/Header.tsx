import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <header className="header__header">
      <div className="header__container">
        <div className="header__content__container">
          <div className="header__content">
            <h1 className="header__title">
              Disfrutá de nuestros mejores platos
            </h1>
            <Link to="/u/products" className="header__button">
              Ver productos
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
