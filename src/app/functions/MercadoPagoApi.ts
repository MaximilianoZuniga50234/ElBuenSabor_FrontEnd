interface ProductMp {
  title: string;
  quantity: number;
  price: number;
}

export async function createPreference(product: ProductMp, token: string) {
  const response = await fetch("http://localhost:9000/mp", {
    body: JSON.stringify(product),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const resJson = await response.json();
  return resJson;
}
