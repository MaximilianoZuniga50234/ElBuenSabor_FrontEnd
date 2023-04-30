import "./Footer.css";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <>
      <footer className="container-fluid bh-light text-center p-1">
        <div className="footer-container">
          <div className="row">
            <div className="col-lg-12">
                <div className="Redes">
                <button 
                    className="botonRed mb-2 mx-3" 
                    type="submit">
                </button>
                <button 
                    className="botonRed mb-2 mx-3" 
                    type="submit">
                </button>
                <button 
                    className="botonRed mb-2 mx-3" 
                    type="submit">
                </button>
                <button 
                    className="botonRed mb-2 mx-3" 
                    type="submit">
                </button>
                </div>
            </div>

            <div className="col-lg-12">
                <div className="divCorreo p-1">
              <input
                style={{ height: "40px"}}
                className="me correo"
                type="text"
                placeholder="Escribe tu email para recibir novedades"
                aria-label="Search"
              ></input>
              <button 
                className=" botonCorreo" 
                type="submit"
                style={{ height: "40px" }}>
                    Enviar
              </button>
              </div>
            </div>

            <div className="col-lg-12 text-left">
                <div className="textoFooter">
                    <p>26171283</p>
                </div>
            </div>

          </div>
        </div>
      </footer>

    </>
  );
};
