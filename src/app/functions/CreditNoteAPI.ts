import { CreditNote } from "../interfaces/CreditNote";

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
