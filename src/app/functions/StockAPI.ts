import { Stock } from "../interfaces/Stock";

const BASE_URL = "http://localhost:9000"

export async function getAllStock() {
  return await fetch(`${BASE_URL}/api/v1/stock`).then((r) =>
    r.json()
  );
}

export async function getAllIngredients() {
  return await fetch(`${BASE_URL}/api/v1/stock/ingredients`).then((r) =>
    r.json()
  );
}

export async function getOneStock(id: string) {
  return await fetch(`${BASE_URL}/api/v1/stock/${id}`).then((r) =>
    r.json()
  );
}

export async function updateStock(stock: Stock, token: string) {
  await fetch(`${BASE_URL}/api/v1/stock/${stock.id}`, {
    method: "PUT",
    body: JSON.stringify(stock),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export async function addStock(stock: Stock, token: string) {
  await fetch(`${BASE_URL}/api/v1/stock`, {
    method: "POST",
    body: JSON.stringify(stock),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}
