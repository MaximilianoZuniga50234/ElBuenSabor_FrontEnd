import "./postPaymentPage.css";
import { Link } from "react-router-dom";

export default function FailurePage() {
  return (
    <div className="postPaymentPage__container">
      <div className="postPaymentPage__content">
        <h1>Lo sentimos, su pago fue rechazado. Inténtelo de nuevo.</h1>
        <button className="postPaymentPage__button">
          <Link to="/">Volver al inicio</Link>
        </button>
      </div>
    </div>
  );
}
