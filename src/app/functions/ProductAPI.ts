export async function getAllProduct(
  name: string | null,
  order: string | null,
  category: string | null,
  min: string | null,
  max: string | null
) {
  const url = new URL("http://localhost:9000/api/v1/product/all");
  if (name) url.searchParams.append("name", name);
  if (order) url.searchParams.append("order", order);
  if (category) url.searchParams.append("category", category);
  if (min) url.searchParams.append("min", min);
  if (max) url.searchParams.append("max", max);

  return await fetch(url.toString()).then((r) => r.json());
}

export async function getOneProduct(id: string) {
  return await fetch(`http://localhost:9000/api/v1/product/${id}`).then((r) =>
    r.json()
  );
}

// export async function getProductsByName(search: string) {
//   return await fetch(
//     `http://localhost:9000/api/v1/product/search/${search}`
//   ).then((r) => r.json());
// }

// export async function getProductsByCategory(search: string) {
//   return await fetch(
//     `http://localhost:9000/api/v1/product/search/cat/${search}`
//   ).then((r) => r.json());
// }
