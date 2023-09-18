import "./footer.css";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <figure className="footer__logo">
          <img
            src="images/footer/logo-largo.png"
            alt="logo"
            className="footer__img footer__img--logo"
          />
        </figure>

        <div className="footer__users">
          <div className="footer__users__container">
            <h2 className="footer__title">Creadores</h2>

            <div className="footer__user">
              <FaGithub className="footer__icon" />
              <h3 className="footer__name">
                <Link
                  to="https://github.com/MaximilianoZuniga50234"
                  className="footer__link"
                  target="_blank"
                >
                  MaximilianoZuniga50234
                </Link>
              </h3>
            </div>

            <div className="footer__user">
              <FaGithub className="footer__icon" />
              <h3 className="footer__name">
                <Link
                  to="https://github.com/CandeZuniga"
                  className="footer__link"
                  target="_blank"
                >
                  CandeZuniga
                </Link>
              </h3>
            </div>

            <div className="footer__user">
              <FaGithub className="footer__icon" />
              <h3 className="footer__name">
                <Link
                  to="https://github.com/FJFFH"
                  className="footer__link"
                  target="_blank"
                >
                  FJFFH
                </Link>
              </h3>
            </div>

            <div className="footer__user">
              <FaGithub className="footer__icon" />
              <h3 className="footer__name">
                <Link
                  to="https://github.com/Laujo11"
                  className="footer__link"
                  target="_blank"
                >
                  Laujo11
                </Link>
              </h3>
            </div>
          </div>
        </div>

        <div className="footer__info">
          <ul className="footer__ul">
            <li className="footer__li">
              <Link to="#" className="footer__link" target="_blank">
                Contacto
              </Link>
            </li>
            <li className="footer__li">
              <Link to="#" className="footer__link" target="_blank">
                Sobre Nosotros
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
