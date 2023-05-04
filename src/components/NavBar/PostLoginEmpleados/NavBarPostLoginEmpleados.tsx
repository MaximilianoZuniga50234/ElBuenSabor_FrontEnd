import "./NavBarPostLoginEmpleados.css";
import { Link } from "react-router-dom";

const NavBarPostLoginEmpleados = () => {
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <div className="container-fluid text-end" id="containerImg">
          <Link className="aImg" to="/login">
            <img
              className="img"
              src="/images/usuario.png"
              width="40"
              height="40"
            />
          </Link>
          <Link className="aImg" to="/home">
            <img
              className="img"
              src="/images/navbar/logoLargoGris.png"
              alt="Logo"
              width="180"
              height="50"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBarPostLoginEmpleados;
