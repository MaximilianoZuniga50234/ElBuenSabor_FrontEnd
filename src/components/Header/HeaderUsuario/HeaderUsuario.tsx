import "./HeaderUsuario.css";
import { Link } from "react-router-dom";

const HeaderUsuario = () => {
  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">
          <div className="container-fluid text-end d-flex justify-content-end">
            <form className="d-flex buscadorDiv" role="search">
              <div className="input-group">
                <input
                  className="form-control buscador"
                  type="search"
                  placeholder=" "
                  aria-label="Search"
                />
              </div>
            </form>
            <Link className="aImg p-1" to="/">
              <img
                className="img"
                src="/images/carrito.png"
                width="25"
                height="25"
              />
            </Link>
            <Link className="aImg p-1" to="/">
              <img
                className="img"
                src="/images/usuario.png"
                width="25"
                height="25"
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
    </>
  );
};

export default HeaderUsuario;
