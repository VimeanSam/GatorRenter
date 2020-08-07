async function edit(obj){
    document.getElementById("curr_post").value = obj.id
    const response = await axios.post('/listings/getbyID', {lid: obj.id});
    const info = response.data[0];
    $("#edits").modal('show');
    document.getElementById('name').innerHTML = "Edit "+info.title;
    document.getElementById('address').value = info.address;
    if(parseInt(info.aptNumber) > -1){
        document.getElementById('unit').value = info.aptNumber;
    }
    document.getElementById('city').value = info.city;
    document.getElementById('zip').value = info.zip;

    document.getElementById('price').value = info.price;

    document.getElementById('district').value = info.district;

    document.getElementById(info.type).checked = "checked"

    document.getElementById("numbeds").value = info.bed
    document.getElementById("numbaths").value = info.bath
    document.getElementById("squarefeet").value = info.size

    let amenities = info.amenities.split(", ")
    for(let i = 0; i < amenities.length; i++){
        document.getElementById(amenities[i]).checked = true;
    }

    document.getElementById("description").value = info.description
}

function update(){
    let id = document.getElementById("curr_post").value
    axios.post('/listings/editPost', {
        lid: id,
        address: document.getElementById('address').value,
        aptNumber: document.getElementById('unit').value,
        city: document.getElementById('city').value,
        zip: document.getElementById('zip').value,
        price: document.getElementById('price').value,
        district: document.getElementById('district').value,
        type: document.querySelector('.propertyType:checked').value,
        bed: document.getElementById("numbeds").value,
        bath: document.getElementById("numbaths").value,
        size: document.getElementById("squarefeet").value,
        pets: document.getElementById("Pets Allowed").checked,
        furnished: document.getElementById("Furnished").checked,
        ac: document.getElementById("Air Conditioning").checked,
        heat: document.getElementById("Heating").checked,
        nosmoke: document.getElementById("No Smoking").checked,
        wheelchair: document.getElementById("Wheel Chair Access").checked,
        description: document.getElementById("description").value
    })
    .then((data) =>{
        window.location.reload();
    })
    .catch((err) =>{
        console.log(err)
    })
}