export async function getAllUser(){
    return await fetch("http://localhost:9000/api/v1/user").then(r => r.json);
}

export async function getOneUser(id: string){
    return await fetch(`http://localhost:9000/api/v1/user/${id}`).then(r => r.json);
}