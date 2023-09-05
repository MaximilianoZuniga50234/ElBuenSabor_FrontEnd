async function getAllUser(){
    return await fetch("http://localhost:9000/api/v1/user").then(r => r.json);
}

async function getOneUser(id: String){
    return await fetch(`http://localhost:9000/api/v1/user/${id}`).then(r => r.json);
}