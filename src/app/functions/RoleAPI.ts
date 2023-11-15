export async function getAllRole() {
  return await fetch("http://localhost:9000/api/v1/role").then((r) => r.json());
}

export async function getOneRole(id: string) {
  return await fetch(`http://localhost:9000/api/v1/role/${id}`).then((r) =>
    r.json()
  );
}
