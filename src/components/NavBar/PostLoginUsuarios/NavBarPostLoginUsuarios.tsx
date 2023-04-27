import "./NavBarPostLoginUsuarios.css";
import { Link } from "react-router-dom";

export const NavBarPostLoginUsuarios = () => {
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <div className="container text-center" id="containerSearch">
          <form className="d-flex" role="search" id="form">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <img src="/images/lupa.png" width="40" height="40" />
          </form>
        </div>

        <div className="container-flex text-end" id="containerImg">
          <Link className="aImg" to="/shopcart">
            <img
              className="img"
              src="/images/carrito.png"
              width="40"
              height="40"
            />
          </Link>
          <Link className="aImg" to="/home">
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
              src="/images/logo.png"
              alt="Logo"
              width="40"
              height="40"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

{
  /* <ul className="nav-item dropdown">
  <a
    className="nav-link dropdown-toggle"
    href="#"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    Dropdown link
  </a>
  <ul className="dropdown-menu">
    <li>
      <a className="dropdown-item" href="#">
        Action
      </a>
    </li>
    <li>
      <a className="dropdown-item" href="#">
        Another action
      </a>
    </li>
    <li>
      <a className="dropdown-item" href="#">
        Something else here
      </a>
    </li>
  </ul>
  <li className="nav-item">
    <a className="aImg" href="">
      <img className="img" src="/images/carrito.png" width="40" height="40" />
    </a>
  </li>
  <li className="nav-item">
    <a className="aImg" href="/landing" id="logo">
      <img src="/images/logo.png" alt="Logo" width="40" height="40" />
    </a>
  </li>
</ul>;
 */
}
