import { Product } from "../interfaces/Product";

const URL_BASE = "http://localhost:9000"

export async function getAllProduct() {
  return await fetch(`${URL_BASE}/api/v1/product`).then((r) =>
    r.json()
  );
}

export async function getOneProduct(id: string) {
  return await fetch(`${URL_BASE}/api/v1/product/${id}`).then((r) =>
    r.json()
  );
}

export async function getProductsInSale() {
  return await fetch(`${URL_BASE}/api/v1/product/all/sale`).then(
    (r) => r.json()
  );
}

export async function getFeaturedProducts() {
  return await fetch(`${URL_BASE}/api/v1/product/all/featured`).then(
    (r) => r.json()
  );
}

export async function createProduct(product: Product, image: string | null) {
  const formData = new FormData();
  formData.append("product", JSON.stringify(product));
  if (image) {
    const imageBlob = base64ToBlob(image);
    const imageFile = new File(
      [imageBlob],
      `${product.id}_${product.denomination.replace(" ", "_")}.jpg`,
      { type: "image/jpeg" }
    );
    formData.append("image", imageFile);
  }

  return await fetch(`${URL_BASE}/api/v1/product/create`, {
    method: "POST",
    body: formData,
  }).then((r) => r.json());
}

export async function updateProduct(product: Product, image: string | null) {
  const formData = new FormData();
  formData.append("product", JSON.stringify(product));

  if (image) {
    const imageBlob = base64ToBlob(image);
    const imageFile = new File(
      [imageBlob],
      `${product.id}_${product.denomination.replace(" ", "_")}.jpg`,
      { type: "image/jpeg" }
    );
    formData.append("image", imageFile);
  }

  return await fetch(
    `${URL_BASE}/api/v1/product/update/${product.id}`,
    {
      method: "PUT",
      body: formData,
    }
  ).then((r) => r.json());
}

export async function deleteProduct(id: string) {
  return await fetch(`${URL_BASE}/api/v1/product/desactivate/${id}`, {
    method: "PATCH",
    headers: {},
  }).then((r) => r.json());
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
