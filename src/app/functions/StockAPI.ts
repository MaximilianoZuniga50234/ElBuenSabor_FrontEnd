async function getAllStock(){
    return await fetch("http://localhost:9000/api/v1/stock").then(r => r.json);
}

async function getOneStock(id: String){
    return await fetch(`http://localhost:9000/api/v1/stock/${id}`).then(r => r.json);
}