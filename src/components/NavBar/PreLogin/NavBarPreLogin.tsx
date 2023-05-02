import { Link } from "react-router-dom";
import "./NavBarPreLogin.css";
import { useAuth0 } from "@auth0/auth0-react";

export const NavBarPreLogin = () => {
  const { loginWithRedirect } = useAuth0();
  const {} = useAuth0();

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home" id="logo">
          <img
            src="./images/navbar/logoLargo.png"
            alt="Logo"
            width="180"
            height="50"
          />
        </Link>
        <div className="container text-end" id="containerButtons">
          <button
            type="button"
            className="btn"
            id="botonIngresar"
            onClick={function () {
              loginWithRedirect();
            }}
          >
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
