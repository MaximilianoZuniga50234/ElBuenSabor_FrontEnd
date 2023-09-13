import { Link } from "react-router-dom";
import { FaBars, FaSearch, FaHome, FaInfo } from "react-icons/fa";
import "./navBar.css";
import { useState } from "react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="nav_bar_pre_login_container">
      <Link to="/" className="nav_bar_logo">
        <span>EL BUEN SABOR</span>
      </Link>

      <form className="nav_bar_form">
        <input type="text" placeholder="Búsqueda" required />
        <button>
          <FaSearch />
        </button>
      </form>

      <label
        className="nav_bar_menu_icon"
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        <FaBars />
      </label>

      <ul className={`nav_bar_list ${isMenuOpen ? "active" : ""}`}>
        <li>
          <Link to="/login" onClick={handleCloseMenu}>
            Iniciar sesión
          </Link>
        </li>
        <li>
          <Link to="/register" onClick={handleCloseMenu}>
            Registrarse
          </Link>
        </li>
        <li className="nav_bar_home">
          <Link to="/home" onClick={handleCloseMenu}>
            <span>
              <FaHome /> Inicio
            </span>
          </Link>
        </li>
        <li className="nav_bar_about">
          <Link to="/about" onClick={handleCloseMenu}>
            <span>
              <FaInfo /> Sobre nosotros
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
