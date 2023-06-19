import "./Header2.css";
import { Link } from "react-router-dom";

const Header2 = () => {
  return (
    <>
      <header>
        <div className="imagen2">
          <div className="centro2 pX-0">
            <div className="textoDiv2">
              <p className="texto m-0">Queremos saber que piensas ;)</p>
            </div>
            <div className="botonDiv2">
              <button className="boton2 btn-lg">Dejar un comentario</button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header2;
