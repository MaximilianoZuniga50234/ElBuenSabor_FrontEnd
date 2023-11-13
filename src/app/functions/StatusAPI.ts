export async function getAllState(){
    return await fetch("http://localhost:9000/api/v1/status").then(r => r.json);
}

export async function getOneState(id: string){
    return await fetch(`http://localhost:9000/api/v1/status/${id}`).then(r => r.json);
}