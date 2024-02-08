import "./postPaymentPage.css";
import { Link } from "react-router-dom";

export default function PendingPage() {
  return (
    <div className="postPaymentPage__container">
      <div className="postPaymentPage__content">
        <h1>
          Parece que su pago quedó pendiente. Una vez que se resuelva se
          generará el pedido.
        </h1>
        <button className="postPaymentPage__button">
          <Link to="/">Volver al inicio</Link>
        </button>
      </div>
    </div>
  );
}
