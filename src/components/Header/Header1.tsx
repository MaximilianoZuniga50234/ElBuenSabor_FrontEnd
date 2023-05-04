import "./Header1.css";
import { Link } from "react-router-dom";

const Header1 = () => {
  return (
    <>
      <div>
        <div className="imagen">
          <div className="separa">
            <div className="textoDiv">
                <p className="texto m-0">Tentate con nuestos</p>
                <p className="texto m-0">mejores platos</p>
            </div>
            <div className="botonDiv">
                <button className="boton btn-lg">Ver productos</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header1;
