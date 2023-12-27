import { PurchaseOrder } from "../interfaces/PurchaseOrder";

export async function getAllPurchaseOrder() {
  return await fetch("http://localhost:9000/api/v1/purchaseOrder").then((r) =>
    r.json()
  );
}

export async function getOnePurchaseOrder(id: string) {
  return await fetch(`http://localhost:9000/api/v1/purchaseOrder/${id}`).then(
    (r) => r.json()
  );
}

export async function createPurchaseOrder(
  purchaseOrder: PurchaseOrder,
  token: string
) {
  await fetch(`http://localhost:9000/api/v1/purchaseOrder`, {
    method: "POST",
    body: JSON.stringify(purchaseOrder),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}
