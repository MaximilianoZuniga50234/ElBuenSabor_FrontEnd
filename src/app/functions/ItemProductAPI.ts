import { ItemProduct } from "../interfaces/ItemProduct";

export async function getAllItemProduct() {
  return await fetch("http://localhost:9000/api/v1/itemProduct").then(
    (r) => r.json
  );
}

export async function getOneItemProduct(id: string) {
  return await fetch(`http://localhost:9000/api/v1/itemProduct/${id}`).then(
    (r) => r.json
  );
}

export async function updateItemProduct(
  itemProduct: ItemProduct,
  token: string
) {
  await fetch(`http://localhost:9000/api/v1/itemProduct/${itemProduct.id}`, {
    method: "PUT",
    body: JSON.stringify(itemProduct),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export async function addItemProduct(itemProduct: ItemProduct, token: string) {
  await fetch(`http://localhost:9000/api/v1/itemProduct`, {
    method: "POST",
    body: JSON.stringify(itemProduct),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}
