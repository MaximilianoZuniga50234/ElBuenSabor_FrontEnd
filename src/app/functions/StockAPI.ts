export async function getAllStock() {
  return await fetch("http://localhost:9000/api/v1/stock").then((r) =>
    r.json()
  );
}

export async function getOneStock(id: string) {
  return await fetch(`http://localhost:9000/api/v1/stock/${id}`).then((r) =>
    r.json()
  );
}
