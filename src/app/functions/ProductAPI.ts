export async function getAllProduct() {
  return await fetch("http://localhost:9000/api/v1/product").then((r) =>
    r.json()
  );
}

export async function getOneProduct(id: String) {
  return await fetch(`http://localhost:9000/api/v1/product/${id}`).then((r) =>
    r.json()
  );
}
