import "./NavBarPostLoginUsuarios.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";

const NavBarPostLoginUsuarios = () => {
  const { logout } = useAuth0();

  return (
    <nav className="navbar">
      <Link to="/home" className="logo">
        <img src="/images/navbar/logoLargoGris.png" alt="Logo" />
      </Link>
      <div className="searchBar">
        <form role="search">
          <input
            type="search"
            placeholder="Search"
            aria-label="Search"
            className="searchBarInput"
          />
          <FiSearch className="searchBarInputButton" />
        </form>
      </div>
      <div className="navbarIconsContainer">
        <Link to="/shopcart" className="navbarShoppingLink">
          <FiShoppingCart className="navbarShoppingCart" />
        </Link>
        <FiUser
          className="navbarUser"
          onClick={function () {
            logout();
          }}
        />
      </div>
    </nav>
  );
};

export default NavBarPostLoginUsuarios;

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
