import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useState } from "react";
import { createPreference } from "../../functions/MercadoPagoApi";
import { useStore } from "../../store/UserTokenStore";
import { useStore as useUser } from "../../store/CurrentUserStore";
import { Person } from "../../interfaces/Person";

export default function Pruebamp() {
  const [preferenceId, setPreferenceId] = useState("");

  initMercadoPago("TEST-63df9836-0c73-46e5-b88b-460ebd265694", {
    locale: "es-AR",
  });

  const [product, setProduct] = useState({
    title: "prueba",
    price: 253,
    quantity: 1,
  });

  const { token } = useStore();

  const getPreference = async () => {
    try {
      const data = await createPreference(product, token);
      if (data) {
        console.log(data.id);
        setPreferenceId(data.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Prueba mercado pago</h1>
      {token && <button onClick={getPreference}>crear</button>}

      {preferenceId && (
        <Wallet initialization={{ preferenceId: preferenceId }} />
      )}
    </div>
  );
}
