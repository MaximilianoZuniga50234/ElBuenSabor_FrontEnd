async function getAllRole(){
    return await fetch("http://localhost:9000/api/v1/role").then(r => r.json);
}

async function getOneRole(id: String){
    return await fetch(`http://localhost:9000/api/v1/role/${id}`).then(r => r.json);
}