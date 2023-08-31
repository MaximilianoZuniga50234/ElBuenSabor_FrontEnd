async function getAllItemProduct(){
    return await fetch("http://localhost:9000/api/v1/itemProduct").then(r => r.json);
}

async function getOneItemProduct(id: String){
    return await fetch(`http://localhost:9000/api/v1/itemProduct/${id}`).then(r => r.json);
}