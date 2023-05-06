import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <div className="container-fluid" id="footer">
      <div className="row justify-content-center" id="filaIconos">
        <div className="col-4 text-center">
          <Link to="https://instagram.com">
            <img className="icon" src="/images/footer/Instagram.png" />
          </Link>
          <Link to="https://facebook.com">
            <img className="icon" src="/images/footer/Facebook.png" />
          </Link>
          <Link to="https://twitter.com">
            <img className="icon" src="/images/footer/Twitter.png" />
          </Link>
          <Link to="https://gmail.com">
            <img className="icon" src="/images/footer/email.png" />
          </Link>
        </div>
      </div>
      <div
        className="row justify-content-center"
        id="filaContenedoraInputButton"
      >
        <div className="col-6" id="colInputButton">
          <div className="row" id="rowInputButton">
            <div className="col-10" id="colInput">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Escribe tu email para recibir novedades"
                id="inputMail"
              />
            </div>
            <div className="col-2" id="colButton">
              <button
                type="button"
                className="btn text-center"
                id="botonEnviar"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row align-items-end">
        <div className="col-6 text-start">
          <div className="d-flex align-items-center">
            <img className="icon" src="/images/footer/Whatsapp.png" />
            <h6>123456789</h6>
          </div>
          <div className="d-flex align-items-center">
            <Link to="/ubicacion" className="link">
              <img className="icon" src="/images/footer/Ubicacion.png" />
            </Link>
            <Link to="/ubicacion" className="link">
              <h6 id="ubicacion">Calle 123, Ciudad, Mendoza, Argentina</h6>
            </Link>
          </div>
        </div>
        <div className="col-6 d-flex justify-content-end ">
          <Link to="/sobreNosotros" className="link">
            <h6 id="sobreNosotros">Sobre nosotros</h6>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
