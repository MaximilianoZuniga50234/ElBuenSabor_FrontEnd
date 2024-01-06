import { ChangeEvent, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useStore as useFilter } from "../../store/FilterStore";
import { FaBars, FaSearch, FaHome, FaHistory } from "react-icons/fa";
import { FaBagShopping, FaCartShopping, FaUser } from "react-icons/fa6";
import "./navBar.css";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [wordToSearch, setWordToSearch] = useState("");
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  const { params, setName, setActive } = useFilter();

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

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setWordToSearch(event.target.value);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    });
    setWordToSearch(params.productName);
  }, []);

  return (
    <nav className="nav_bar_pre_login_container">
      <Link to="/" className="nav_bar_logo">
        <span>EL BUEN SABOR</span>
      </Link>

      <div className="nav_bar_form">
        <input
          type="text"
          placeholder="Buscar productos"
          value={wordToSearch}
          required
          onChange={handleChangeInput}
        />

        <Link
          to="u/products"
          onClick={() => {
            setName(wordToSearch);
            setActive(true);
          }}
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
            <button className="nav_bar_button" onClick={handleLogOut}>
              Cerrar sesión
            </button>
            <li className="nav_bar_dropdown_profile_container">
              <span className="nav_bar_user">
                <FaUser />
              </span>
              <ul className="nav_bar_dropdown_profile_ul">
                <li className="nav_bar_dropdown_profile_li">
                  <Link
                    to="/u/profile"
                    className="nav_bar_dropdown_profile_link"
                    onClick={handleCloseMenu}
                  >
                    <span>{isMenuOpen && <FaUser />} Mi perfil</span>
                  </Link>
                </li>
                <li className="nav_bar_dropdown_profile_li">
                  <Link
                    to="/u/orders"
                    className="nav_bar_dropdown_profile_link"
                    onClick={handleCloseMenu}
                  >
                    <span>{isMenuOpen && <FaBagShopping />} Mis órdenes</span>
                  </Link>
                </li>
                <li className="nav_bar_dropdown_profile_li">
                  <Link to="/u/orders/history" className="nav_bar_dropdown_profile_link" onClick={handleCloseMenu}
                  >
                    <span>{isMenuOpen && <FaHistory />} Historial de órdenes</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav_bar_cart">
              <Link to="/u/cart" onClick={handleCloseMenu}>
                <span>
                  <FaCartShopping />
                </span>
              </Link>
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
            <span className="nav_bar_user_icon">
              <FaHome />
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
