
const link = "https://maps.googleapis.com/maps/api/js?key=" + process.env.APIKEY + "&libraries=visualization&callback=initMap";
var m = document.getElementById('googlemaps');
m.setAttribute("src", link);
function initMap() {
    var loudounCounty = new google.maps.LatLng(39.070144, -77.663148);

    map = new google.maps.Map(document.getElementById('map'), {
    center: loudounCounty,

    zoom: 10, 
});
    bounds = new google.maps.LatLngBounds();
    // var boundsNew = new google.maps.LatLngBounds();


    var indexValue = [];
    
}