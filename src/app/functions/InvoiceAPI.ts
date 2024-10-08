import { Invoice } from "../interfaces/Invoice";

export async function getAllInvoice() {
  return await fetch("http://localhost:9000/api/v1/invoice").then((r) =>
    r.json()
  );
}

export async function getOneInvoice(id: string) {
  return await fetch(`http://localhost:9000/api/v1/invoice/${id}`).then((r) =>
    r.json()
  );
}

export async function createInvoice(invoice: Invoice, token: string) {
  await fetch(`http://localhost:9000/api/v1/invoice`, {
    method: "POST",
    body: JSON.stringify(invoice),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export async function updateInvoice(invoice: Invoice, token: string) {
  await fetch(`http://localhost:9000/api/v1/invoice/${invoice.id}`, {
    method: "PUT",
    body: JSON.stringify(invoice),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}
