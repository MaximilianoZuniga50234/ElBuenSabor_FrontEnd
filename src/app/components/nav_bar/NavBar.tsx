import { Link } from "react-router-dom";
import { FaBars, FaSearch, FaHome, FaInfo } from "react-icons/fa";
import "./navBar.css";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FaUser } from "react-icons/fa6";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const [wordToSearch, setWordToSearch] = useState("");

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogIn = () => {
    loginWithRedirect({
      appState: {
        returnTo: window.location.pathname,
      },
    });
  };

  const handleRegister = () => {
    loginWithRedirect({
      appState: {
        returnTo: window.location.pathname,
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  const handleLogOut = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWordToSearch(event.target.value);
  };

  return (
    <nav className="nav_bar_pre_login_container">
      <Link to="/" className="nav_bar_logo">
        <span>EL BUEN SABOR</span>
      </Link>

      <div className="nav_bar_form">
        <input
          type="text"
          placeholder="Buscar productos"
          required
          onChange={handleChangeInput}
        />

        <Link
          to={
            wordToSearch != ""
              ? `u/products/search/${wordToSearch}`
              : "u/products"
          }
        >
          <FaSearch />
        </Link>
      </div>

      <label
        className="nav_bar_menu_icon"
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        <FaBars />
      </label>

      <ul className={`nav_bar_list ${isMenuOpen ? "active" : ""}`}>
        {isAuthenticated ? (
          <>
            <li className="nav_bar_dropdown_container">
              <button className="nav_bar_button">ABM</button>

              <ul className="nav_bar_dropdown_ul">
                <li className="nav_bar_dropdown_li">
                  <Link to="/e/itemStockAbm" className="nav_bar_dropdown_link">
                    <span>Item Stock ABM</span>
                  </Link>
                </li>
                <li className="nav_bar_dropdown_li">
                  <Link
                    to="/e/itemProductAbm"
                    className="nav_bar_dropdown_link"
                  >
                    <span>Item Product ABM</span>
                  </Link>
                </li>
                <li className="nav_bar_dropdown_li">
                  <Link
                    to="/e/measurementUnitAbm"
                    className="nav_bar_dropdown_link"
                  >
                    <span>Measurement Unit ABM</span>
                  </Link>
                </li>
                <li className="nav_bar_dropdown_li">
                  <Link to="/e/stockAbm" className="nav_bar_dropdown_link">
                    <span>Stock ABM</span>
                  </Link>
                </li>
                <li className="nav_bar_dropdown_li">
                  <Link to="/e/lowStock" className="nav_bar_dropdown_link">
                    <span>Low Stock Page</span>
                  </Link>
                </li>
                <li className="nav_bar_dropdown_li">
                  <Link to="/a/employees" className="nav_bar_dropdown_link">
                    <span>Employees ABM</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <button className="nav_bar_button" onClick={handleLogOut}>
                Cerrar sesión
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <button className="nav_bar_button" onClick={handleRegister}>
                Registrarse
              </button>
            </li>
            <li>
              <button className="nav_bar_button" onClick={handleLogIn}>
                Iniciar sesión
              </button>
            </li>
          </>
        )}

        <li className="nav_bar_home">
          <Link to="/" onClick={handleCloseMenu}>
            <span>
              <FaHome />
            </span>
          </Link>
        </li>
        {isAuthenticated &&
          <li className="nav_bar_about">
            <Link to="/u/profile" onClick={handleCloseMenu}>
              <span>
                <FaUser />
              </span>
            </Link>
          </li>}
      </ul>
    </nav>
  );
};

export default NavBar;
