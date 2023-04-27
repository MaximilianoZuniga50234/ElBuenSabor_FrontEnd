import "./NavBarPreLogin.css";
import { Link } from "react-router-dom";

export const NavBarPreLogin = () => {
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home" id="logo">
          <img src="/images/logo.png" alt="Logo" width="40" height="40" />
        </Link>
        <div className="container text-end" id="containerButtons">
          <button type="button" className="btn" id="botonIngresar">
            Ingresar
          </button>
          <button type="button" className="btn" id="botonRegistrarse">
            Registrarse
          </button>
        </div>
      </div>
    </nav>
  );
};
