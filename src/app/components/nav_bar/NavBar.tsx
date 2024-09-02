import { ChangeEvent, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useStore as useFilter } from "../../store/FilterStore";
import {
  FaBars,
  FaSearch,
  FaHome,
  FaHistory,
  FaSignOutAlt,
} from "react-icons/fa";
import { FaBagShopping, FaCartShopping, FaUser } from "react-icons/fa6";
import "./navBar.css";
import { useStore as useUser } from "../../store/CurrentUserStore";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [wordToSearch, setWordToSearch] = useState("");
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const { user } = useUser();
  const { params, setName, setActive } = useFilter();

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogIn = () => {
    loginWithRedirect({
      appState: {
        returnTo: "/",
      },
    });
  };

  const handleRegister = () => {
    loginWithRedirect({
      appState: {
        returnTo: "/",
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
    <div className="nav_bar_container">
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
              {user?.role && user?.role != "Cliente" && (
                <li className="nav_bar_dropdown_container">
                  <button className="nav_bar_button">Administración</button>

                  <ul className="nav_bar_dropdown_ul">
                    <li className="nav_bar_dropdown_li">
                      <Link to="/e/orders" className="nav_bar_dropdown_link">
                        <span>Pedidos</span>
                      </Link>
                    </li>
                    {(user?.role === "Administrador" ||
                      user?.role === "Cocinero") && (
                      <>
                        <li className="nav_bar_dropdown_li">
                          <Link
                            to="/e/itemStockAbm"
                            className="nav_bar_dropdown_link"
                          >
                            <span>Rubros de ingredientes</span>
                          </Link>
                        </li>

                        <li className="nav_bar_dropdown_li">
                          <Link
                            to="/e/itemProductAbm"
                            className="nav_bar_dropdown_link"
                          >
                            <span>Rubros de productos</span>
                          </Link>
                        </li>

                        <li className="nav_bar_dropdown_li">
                          <Link
                            to="/e/measurementUnitAbm"
                            className="nav_bar_dropdown_link"
                          >
                            <span>Unidades de medida</span>
                          </Link>
                        </li>
                        <li className="nav_bar_dropdown_li">
                          <Link
                            to="/e/productAbm"
                            className="nav_bar_dropdown_link"
                          >
                            <span>Productos</span>
                          </Link>
                        </li>
                        <li className="nav_bar_dropdown_li">
                          <Link
                            to="/e/stockAbm"
                            className="nav_bar_dropdown_link"
                          >
                            <span>Ingredientes</span>
                          </Link>
                        </li>
                        <li className="nav_bar_dropdown_li">
                          <Link
                            to="/e/lowStock"
                            className="nav_bar_dropdown_link"
                          >
                            <span>Ingredientes con bajo stock</span>
                          </Link>
                        </li>
                      </>
                    )}

                    {user?.role === "Administrador" && (
                      <>
                        <li className="nav_bar_dropdown_li">
                          <Link
                            to="/a/employees"
                            className="nav_bar_dropdown_link"
                          >
                            <span>Tabla de empleados</span>
                          </Link>
                        </li>
                        <li className="nav_bar_dropdown_li">
                          <Link
                            to="/a/customers"
                            className="nav_bar_dropdown_link"
                          >
                            <span>Tabla de clientes</span>
                          </Link>
                        </li>
                        <li className="nav_bar_dropdown_li">
                          <Link
                            to="/a/productsRanking"
                            className="nav_bar_dropdown_link"
                          >
                            <span>Ranking de productos</span>
                          </Link>
                        </li>
                        <li className="nav_bar_dropdown_li">
                          <Link
                            to="/a/customersRanking"
                            className="nav_bar_dropdown_link"
                          >
                            <span>Ranking de clientes</span>
                          </Link>
                        </li>
                        <li className="nav_bar_dropdown_li">
                          <Link
                            to="/a/monetaryMovements"
                            className="nav_bar_dropdown_link"
                          >
                            <span>Movimientos monetarios</span>
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </li>
              )}

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
                    <Link
                      to="/u/orders/history"
                      className="nav_bar_dropdown_profile_link"
                      onClick={handleCloseMenu}
                    >
                      <span>
                        {isMenuOpen && <FaHistory />} Historial de órdenes
                      </span>
                    </Link>
                  </li>
                  <li className="nav_bar_dropdown_profile_li">
                    <button
                      className="nav_bar_dropdown_profile_link"
                      onClick={handleLogOut}
                    >
                      <span>
                        {isMenuOpen && <FaSignOutAlt />} Cerrar sesión
                      </span>
                    </button>
                  </li>
                </ul>
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

          <li className="nav_bar_cart">
            <Link to="/u/cart" onClick={handleCloseMenu}>
              <span className="nav_bar_user_icon">
                <FaCartShopping />
              </span>
            </Link>
          </li>
          <li className="nav_bar_home">
            <Link to="/" onClick={handleCloseMenu}>
              <span className="nav_bar_user_icon">
                <FaHome />
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
