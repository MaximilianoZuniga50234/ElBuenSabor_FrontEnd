import { Address } from "../interfaces/Address";

export async function getAllAddress() {
  return await fetch("http://localhost:9000/api/v1/address").then((r) =>
    r.json()
  );
}

export async function getOneAddress(id: string) {
  return await fetch(`http://localhost:9000/api/v1/address/${id}`).then((r) =>
    r.json()
  );
}

export async function addAddress(address: Address, token: string) {
  await fetch(`http://localhost:9000/api/v1/address`, {
    method: "POST",
    body: JSON.stringify(address),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export async function updateAddress(address: Address, token: string, id: number) {
  await fetch(`http://localhost:9000/api/v1/address/${id}`, {
    method: "PUT",
    body: JSON.stringify(address),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}
