import { ItemStock } from "../interfaces/ItemStock";

export async function getAllItemStock() {
  return await fetch("http://localhost:9000/api/v1/itemStock").then((r) =>
    r.json()
  );
}

export async function getOneItemStock(id: string) {
  return await fetch(`http://localhost:9000/api/v1/itemStock/${id}`).then((r) =>
    r.json()
  );
}

export async function updateItemStock(itemStock: ItemStock, token: string) {
  await fetch(`http://localhost:9000/api/v1/itemStock/${itemStock.id}`, {
    method: "PUT",
    body: JSON.stringify(itemStock),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export async function addItemStock(itemStock: ItemStock, token: string) {
  await fetch(`http://localhost:9000/api/v1/itemStock`, {
    method: "POST",
    body: JSON.stringify(itemStock),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}
