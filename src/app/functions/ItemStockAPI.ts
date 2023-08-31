async function getAllItemStock(){
    return await fetch("http://localhost:9000/api/v1/itemStock").then(r => r.json);
}

async function getOneItemStock(id: String){
    return await fetch(`http://localhost:9000/api/v1/itemStock/${id}`).then(r => r.json);
}