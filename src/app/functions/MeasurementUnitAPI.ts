import { MeasurementUnit } from "../interfaces/MeasurementUnit";

export async function getAllMeasurementUnit() {
  return await fetch("http://localhost:9000/api/v1/measurementUnit").then(
    (r) => r.json
  );
}

export async function getOneMeasurementUnit(id: String) {
  return await fetch(`http://localhost:9000/api/v1/measurementUnit/${id}`).then(
    (r) => r.json
  );
}

export async function updateMeasurementUnit(
  measurementUnit: MeasurementUnit,
  token: string
) {
  await fetch(
    `http://localhost:9000/api/v1/measurementUnit/${measurementUnit.id}`,
    {
      method: "PUT",
      body: JSON.stringify(measurementUnit),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );
}

export async function addMeasurementUnit(
  measurementUnit: MeasurementUnit,
  token: string
) {
  await fetch(`http://localhost:9000/api/v1/measurementUnit`, {
    method: "POST",
    body: JSON.stringify(measurementUnit),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}
