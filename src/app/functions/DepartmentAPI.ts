export async function getAllDepartment() {
  return await fetch("http://localhost:9000/api/v1/department").then((r) =>
    r.json()
  );
}

export async function getOneDepartment(id: string) {
  return await fetch(`http://localhost:9000/api/v1/deparment/${id}`).then((r) =>
    r.json()
  );
}
