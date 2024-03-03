import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useState } from "react";
import { createPreference } from "../../functions/MercadoPagoApi";
import { useStore } from "../../store/UserTokenStore";

export default function Pruebamp() {
  const [preferenceId, setPreferenceId] = useState("");

  initMercadoPago("TEST-0f14502d-ca69-425c-8886-7d871a5d1240", {
    locale: "es-AR",
  });

  const product = {
    title: "prueba",
    price: 253,
    quantity: 1,
  };

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
