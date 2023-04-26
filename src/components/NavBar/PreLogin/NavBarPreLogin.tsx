import "./NavBarPreLogin.css";

export const NavBarPreLogin = () => {
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <a className="navbar-brand" href="/landing" id="logo">
          <img
            src="/images/logo.png"
            alt="Logo"
            width="40"
            height="40"
          />
        </a>
        <div className="container text-end" id="containerButtons">
          <button type="button" className="btn" id="botonIngresar">
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
