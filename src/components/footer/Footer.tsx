import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="container-fluid bh-light text-center col-lg-12 fixed-bottom">
        <div className="footer-container">
          <div className="row">
            <div className="col-lg-12 p-0">
              <div className="Redes mt-2">
                <button
                  className="botonRed mb-2 mx-3"
                  type="submit"
                  style={{
                    backgroundImage:
                      "url('../../../public/images/Footer/Instagram.png')",
                  }}
                ></button>
                <button
                  className="botonRed mb-2 mx-3"
                  type="submit"
                  style={{
                    backgroundImage:
                      "url('../../../public/images/Footer/Facebook.png')",
                  }}
                ></button>
                <button
                  className="botonRed mb-2 mx-3"
                  type="submit"
                  style={{
                    backgroundImage:
                      "url('../../../public/images/Footer/Twitter.png')",
                  }}
                ></button>
                <button
                  className="botonRed mb-2 mx-3"
                  type="submit"
                  style={{
                    backgroundImage:
                      "url('../../../public/images/Footer/Gmail.png')",
                  }}
                ></button>
              </div>
            </div>

            <div className="col-lg-12 p-0">
              <div className="divCorreo p-1">
                <input
                  style={{ height: "40px" }}
                  className="me correo"
                  type="text"
                  placeholder="Escribe tu email para recibir novedades"
                  aria-label="Search"
                ></input>
                <button
                  className=" botonCorreo"
                  type="submit"
                  style={{ height: "40px" }}
                >
                  Enviar
                </button>
              </div>
            </div>

            <div className="col-lg-12 p-0">
              <div className="textoFooter p-1 m-1">
                <div className="d-flex">
                  <img
                    src="../../../public/images/Footer/Whatsapp.png"
                    className="mx-2"
                    style={{ width: "25px", height: "25px" }}
                  />
                  <p className="pb-0 mb-1">2617863234</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex">
                    <img
                      src="../../../public/images/Footer/Ubicacion.png"
                      className="mx-2"
                      style={{ width: "25px", height: "25px" }}
                    />
                    <p className="pb-0 mb-1">
                      Calle 123, Ciudad, Mendoza, Argentina
                    </p>
                  </div>
                  <div className="d-flex">
                    <p className="pb-0 mb-1">Sobre Nosotros</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
