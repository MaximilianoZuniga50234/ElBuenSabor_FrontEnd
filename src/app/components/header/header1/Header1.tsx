import { Link } from "react-router-dom";
import "./header1.css";

function Header1() {
  return (
    <header className="header1__header">
      <div className="header1__container">
        <div className="header1__content__container">
          <div className="header1__content">
            <h1 className="header1__title">
              Tentate con nuestros mejores platos
            </h1>
            <Link to="/u/products" className="header1__button">
              Ver productos
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header1;
