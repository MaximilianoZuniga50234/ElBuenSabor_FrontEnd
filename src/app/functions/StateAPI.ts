async function getAllState(){
    return await fetch("http://localhost:9000/api/v1/state").then(r => r.json);
}

async function getOneState(id: String){
    return await fetch(`http://localhost:9000/api/v1/state/${id}`).then(r => r.json);
}