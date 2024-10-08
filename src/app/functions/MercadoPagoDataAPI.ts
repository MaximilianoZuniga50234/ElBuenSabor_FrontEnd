export async function getAllMercadoPagoData() {
  return await fetch("http://localhost:9000/api/v1/mercadoPagoData").then((r) =>
    r.json()
  );
}

export async function getOneMercadoPagoData(id: string) {
  return await fetch(`http://localhost:9000/api/v1/mercadoPagoData/${id}`).then(
    (r) => r.json()
  );
}
