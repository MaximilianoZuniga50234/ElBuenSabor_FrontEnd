import "./NavBarPostLoginEmpleados.css";

export const NavBarPostLoginEmpleados = () => {
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <div className="container-fluid text-end" id="containerImg">
          <a className="aImg" href="">
            <img
              className="img"
              src="/images/usuario.png"
              width="40"
              height="40"
            />
          </a>
          <a className="aImg" href="/landing">
            <img
              className="img"
              src="/images/logo.png"
              alt="Logo"
              width="40"
              height="40"
            />
          </a>
        </div>
      </div>
    </nav>
  );
};
