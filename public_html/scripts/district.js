async function test(obj){
    $("#exampleModal").modal('show');
    document.getElementById('named').innerHTML = obj.id;
    document.getElementById('descr').innerHTML = '';
    document.getElementById('pro').innerHTML = '';
    document.getElementById('con').innerHTML = '';
    document.getElementById('distance').innerHTML = '';
    const response = await axios.get('/districtsInfo');
    const neighborhoods = response.data;
    for (var key in neighborhoods) {
        if (neighborhoods.hasOwnProperty(key)) {
            if(obj.id === neighborhoods[key].name){
                document.getElementById('descr').innerHTML = neighborhoods[key].description;
                document.getElementById('pro').innerHTML = neighborhoods[key].pros;
                document.getElementById('con').innerHTML = neighborhoods[key].cons;
                document.getElementById('distance').innerHTML = "Distance from SFSU: "+neighborhoods[key].distance_from_sfsu;
            }
        }
    }
}
function showPopUp(){
    if(window.location.hash === ''){
        //do nothing
    }else{
        var hashString = window.location.hash.toString().replace("%20", " ");
        var districtID = hashString.replace("#", "");
        document.getElementById(districtID).click();
    }    
}