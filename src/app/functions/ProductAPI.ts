export async function getAllProduct() {
  return await fetch("http://localhost:9000/api/v1/product").then((r) =>
    r.json()
  );
}

export async function getOneProduct(id: string) {
  return await fetch(`http://localhost:9000/api/v1/product/${id}`).then((r) =>
    r.json()
  );
}

export async function getProductsForName(search: string) {
  return await fetch(
    `http://localhost:9000/api/v1/product/search/${search}`
  ).then((r) => r.json());
}

export async function getProductsByCategory(search: string) {
  return await fetch(
    `http://localhost:9000/api/v1/product/search/cat/${search}`
  ).then((r) => r.json());
}