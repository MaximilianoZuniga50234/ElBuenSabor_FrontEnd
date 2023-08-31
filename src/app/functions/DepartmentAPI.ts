async function getAllDepartment(){
    return await fetch("http://localhost:9000/api/v1/department").then(r => r.json);
}

async function getOneDepartment(id: String){
    return await fetch(`http://localhost:9000/api/v1/deparment/${id}`).then(r => r.json);
}