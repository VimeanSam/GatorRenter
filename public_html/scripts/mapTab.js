function initMap() {
    var sfsu = {lat: 37.721804, lng: -122.478231};
    var lat = document.getElementById("lat").innerHTML;
    var lon = document.getElementById("lon").innerHTML;
    var geocoder = new google.maps.Geocoder();
    var address = document.getElementById("addr").innerHTML;        
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: {lat: parseFloat(lat), lng: parseFloat(lon)}
    });
    var marker = new google.maps.Marker({
        map: map,
        position: {lat: parseFloat(lat), lng: parseFloat(lon)}
    });
}