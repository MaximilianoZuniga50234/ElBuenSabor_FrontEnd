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
