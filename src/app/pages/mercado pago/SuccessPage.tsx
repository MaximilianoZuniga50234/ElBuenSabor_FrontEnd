import "./postPaymentPage.css";
import { Link } from "react-router-dom";

export default function SuccesPage() {
  return (
    <div className="postPaymentPage__container">
      <div className="postPaymentPage__content">
        <h1>¡Su pago fue realizado con éxito!</h1>
        <button className="postPaymentPage__button">
          <Link to="/">Volver al inicio</Link>
        </button>
      </div>
    </div>
  );
}
