async function getAllAddress(){
    return await fetch("http://localhost:9000/api/v1/address").then(r => r.json);
}

async function getOneAddress(id: String){
    return await fetch(`http://localhost:9000/api/v1/address/${id}`).then(r => r.json);
}