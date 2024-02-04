import { FaLeftLong, FaRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "./notFound.css";

const NotFound = () => {
  return (
    <div className="not_found_main_container">
      <article className="not_found_article">
        <div className="not_found_article_text">
          <h1>404</h1>
          <div>
            <h3>UPS...</h3>
            <p>NO PUDIMOS ENCONTRAR LA PÁGINA.</p>
          </div>
        </div>
        <Link to="/">
          <FaRightLong />
          Volver al inicio
          <FaLeftLong />
        </Link>
      </article>
      <img src="/images/fondo_doodle.png" />
    </div>
  );
};

export default NotFound;
