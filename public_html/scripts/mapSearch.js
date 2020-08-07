function initMap() {
    var sfsu = {lat: 37.721804, lng: -122.478231};
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: sfsu
    });
    var results = document.getElementById("results").value;
    for(let i = 0; i < results; i++){
        var addr = document.getElementById("address"+i).innerHTML;
        var geocoder = new google.maps.Geocoder();
        var lat = document.getElementById("lat"+i).innerHTML;
        var lon = document.getElementById("lon"+i).innerHTML;
        var address = addr.trim();
        var marker = new google.maps.Marker({
            map: map,
            position: {lat: parseFloat(lat), lng: parseFloat(lon)}
        });
        var httpLink = document.getElementById("id"+i).innerHTML;
        var name = document.getElementById("title"+i).innerHTML;
        var img = document.getElementById("cardImg"+i).src;
        var ptype = document.getElementById("ptype"+i).innerHTML;
        var info = document.getElementById("info"+i).innerHTML;
        var price = document.getElementById("price"+i).innerHTML;
        var contentString = `<a style="font-size: 18; font-weight: 600" href="/homedetails/${httpLink.trim()}">${name.trim()}</a>`+
                                    "<br>"+
                                    `<img src=${img.trim()} alt="" style="height:90px; margin-bottom: 10px; margin-top: 10px" />`+
                                    `<h5 style="font-weight: 600">${ptype}</h5>`+
                                    `<h5 style="font-weight: 600">${price}</h5>`+
                                    `<p>${info}</p>`;
                
        var infowindow = new google.maps.InfoWindow();
        google.maps.event.addListener(marker,'click', (function(marker,contentString,infowindow){ 
            return function() {
            infowindow.setOptions({maxWidth: 200});
            infowindow.setContent(contentString);
            infowindow.open(map,marker);
            };
        })(marker,contentString,infowindow));          
    }
}