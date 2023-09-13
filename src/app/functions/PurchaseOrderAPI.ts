export async function getAllPurchaseOrder(){
    return await fetch("http://localhost:9000/api/v1/purchaseOrder").then(r => r.json);
}

export async function getOnePurchaseOrder(id: String){
    return await fetch(`http://localhost:9000/api/v1/purchaseOrder/${id}`).then(r => r.json);
}