export async function getAllInvoice(){
    return await fetch("http://localhost:9000/api/v1/invoice").then(r => r.json);
}

export async function getOneInvoice(id: String){
    return await fetch(`http://localhost:9000/api/v1/invoice/${id}`).then(r => r.json);
}