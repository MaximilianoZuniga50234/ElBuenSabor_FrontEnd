import { Person } from "../interfaces/Person";

export async function getAllPerson() {
  return await fetch("http://localhost:9000/api/v1/person").then((r) =>
    r.json()
  );
}

export async function getOnePerson(id: string) {
  return await fetch(`http://localhost:9000/api/v1/person/${id}`).then((r) =>
    r.json()
  );
}

export async function addPerson(person: Person, token: string) {
  await fetch(`http://localhost:9000/api/v1/person`, {
    method: "POST",
    body: JSON.stringify(person),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export async function updatePerson(person: Person, token: string, id: string) {
  await fetch(`http://localhost:9000/api/v1/person/${id}`, {
    method: "PUT",
    body: JSON.stringify(person),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}
