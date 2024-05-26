import { Product } from "../interfaces/Product";

export async function getAllProduct(
  name?: string,
  order?: string,
  category?: string,
  min?: string,
  max?: string
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

export async function getProductsInSale() {
  return await fetch(`http://localhost:9000/api/v1/product/all/sale`).then(
    (r) => r.json()
  );
}

export async function getFeaturedProducts() {
  return await fetch(`http://localhost:9000/api/v1/product/all/featured`).then(
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

  return await fetch(`http://localhost:9000/api/v1/product/create`, {
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
    `http://localhost:9000/api/v1/product/update/${product.id}`,
    {
      method: "PUT",
      body: formData,
    }
  ).then((r) => r.json());
}

export async function deleteProduct(id: string) {
  return await fetch(`http://localhost:9000/api/v1/product/desactivate/${id}`, {
    method: "PATCH",
    headers: {},
  }).then((r) => r.json());
}

// Esta función debe recibir un archivo decodificado en base64
function base64ToBlob(base64: string): Blob {
  const byteCharacters = atob(base64.split(',')[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: 'image/jpeg' });
}