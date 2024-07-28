import { Stock } from "../interfaces/Stock";

const BASE_URL = "http://localhost:9000";

export async function getAllStock() {
  return await fetch(`${BASE_URL}/api/v1/stock`).then((r) => r.json());
}

export async function getAllIngredients() {
  return await fetch(`${BASE_URL}/api/v1/stock/ingredients`).then((r) =>
    r.json()
  );
}

export async function getNotIngredients() {
  return await fetch(`${BASE_URL}/api/v1/stock/not_ingredients`).then((r) =>
    r.json()
  );
}

export async function getOneStock(id: string) {
  return await fetch(`${BASE_URL}/api/v1/stock/${id}`).then((r) => r.json());
}

export async function updateStock(stock: Stock, token: string) {
  await fetch(`${BASE_URL}/api/v1/stock/${stock.id}`, {
    method: "PUT",
    body: JSON.stringify(stock),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export async function updateStockWithImage(
  stock: Stock,
  image: string | null,
  token: string
) {
  const formData = new FormData();
  formData.append("stock", JSON.stringify(stock));

  if (image) {
    const imageBlob = base64ToBlob(image);
    const imageFile = new File(
      [imageBlob],
      `${stock.id}_${stock.denomination.replace(" ", "_")}.jpg`,
      { type: "image/jpeg" }
    );
    formData.append("image", imageFile);
  }

  await fetch(`${BASE_URL}/api/v1/stock/update/${stock.id}`, {
    method: "PUT",
    body: formData,
    headers: {
      // "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export async function addStockWithImage(
  stock: Stock,
  image: string | null,
  token: string
) {
  const formData = new FormData();
  formData.append("stock", JSON.stringify(stock));
  if (image) {
    const imageBlob = base64ToBlob(image);
    const imageFile = new File(
      [imageBlob],
      `${stock.id}_${stock.denomination.replace(" ", "_")}.jpg`,
      { type: "image/jpeg" }
    );
    formData.append("image", imageFile);
  }

  await fetch(`${BASE_URL}/api/v1/stock/create`, {
    method: "POST",
    body: formData,
    headers: {
      // "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

// Esta función debe recibir un archivo decodificado en base64
function base64ToBlob(base64: string): Blob {
  const byteCharacters = atob(base64.split(",")[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: "image/jpeg" });
}
