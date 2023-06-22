import { Link } from "react-router-dom";
import "./NavBarPreLogin.css";
import { useAuth0 } from "@auth0/auth0-react";

const NavBarPreLogin = () => {
  const { loginWithRedirect } = useAuth0();
  const {} = useAuth0();

  return (
    <nav className="navbar">
      <Link className="logo" to="/home">
        <img
          src="./images/navbar/logoLargoGris.png"
          alt="Logo"
        />
      </Link>
      <div className="containerButtons">
        <button
          type="button"
          className="botonIngresar"
          onClick={function () {
            loginWithRedirect();
          }}
        >
          Ingresar
        </button>
        <button type="button" className="botonRegistrarse">
          Registrarse
        </button>
      </div>
    </nav>
  );
};

export default NavBarPreLogin;
