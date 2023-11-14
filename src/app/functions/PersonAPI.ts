export async function getAllPerson(){
    return await fetch("http://localhost:9000/api/v1/person").then(r => r.json);
}

export async function getOnePerson(id: string){
    return await fetch(`http://localhost:9000/api/v1/person/${id}`).then(r => r.json);
}