import { MercadoPagoInfo } from "../interfaces/MercadoPagoInfo";

export async function createPreference(
  mercadoPagoInfo: MercadoPagoInfo,
  token: string
) {
  const response = await fetch("http://localhost:9000/mp", {
    body: JSON.stringify(mercadoPagoInfo),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const resJson = await response.json();
  return resJson;
}
