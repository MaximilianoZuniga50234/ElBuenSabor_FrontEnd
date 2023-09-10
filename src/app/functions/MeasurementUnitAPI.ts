export async function getAllMeasurementUnit(){
    return await fetch("http://localhost:9000/api/v1/measurementUnit").then(r => r.json);
}

export async function getOneMeasurementUnit(id: String){
    return await fetch(`http://localhost:9000/api/v1/measurementUnit/${id}`).then(r => r.json);
}