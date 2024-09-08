import { Link, useLocation } from "react-router-dom";
import "./error.css";

const Error = () => {

  const location = useLocation();
  const { state } = location;

  return (
    <div className="error_page_main_container">
      <article className="error_page_article">
        <h1>ERROR {state?.error ?? ":("}</h1>
        <p>{state?.message ?? "No hay descipción del error"}</p>
      </article>
      <Link to="/">Volver al inicio</Link>
      <img src="/images/burger_error_background.png" />
    </div>
  );
};

export default Error;
