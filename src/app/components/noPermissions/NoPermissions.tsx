import { Link } from "react-router-dom";
import "./noPermissions.css";

export default function NoPermissions() {
  return (
    <div className="noPermissions__container">
      <div className="noPermissions__elements">
        <h1 className="noPermissions__h1">
          Ups! Parece que no tienes permisos para acceder a esta sección.
        </h1>
        <button className="noPermissions__button">
          <Link to={"/"}>Volver al inicio</Link>
        </button>
      </div>
    </div>
  );
}
