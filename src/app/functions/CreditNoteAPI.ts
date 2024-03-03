import { CreditNote } from "../interfaces/CreditNote";

export async function getAllCreditNotes() {
  return await fetch("http://localhost:9000/api/v1/creditNote").then((r) =>
    r.json()
  );
}

export async function getOneCreditNote(id: string) {
  return await fetch(`http://localhost:9000/api/v1/creditNote/${id}`).then(
    (r) => r.json()
  );
}

export async function createCreditNote(creditNote: CreditNote, token: string) {
  await fetch(`http://localhost:9000/api/v1/creditNote`, {
    method: "POST",
    body: JSON.stringify(creditNote),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export async function updateCreditNote(creditNote: CreditNote, token: string) {
  await fetch(`http://localhost:9000/api/v1/creditNote/${creditNote.id}`, {
    method: "PUT",
    body: JSON.stringify(creditNote),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}
