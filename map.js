//Set up some of our variables.
var map; //Will contain map object.
var marker = false; ////Has the user plotted their location marker? 
var infoWindow; //To show the pop up window

//Function called to initialize / create the map.
//This is called when the page has loaded.
function initMap() {

    //The center location of our map.
    var centerOfMap = new google.maps.LatLng(12.993170567133912, 77.58906071514681);
 
    //Map options.
    var options = {
      center: centerOfMap, //Set center.
      zoom: 15 //The zoom value.
    };

    infoWindow = new google.maps.InfoWindow;
 
    //Create the map object.
    map = new google.maps.Map(document.getElementById('map'), options);

    // Try HTML5 geolocation. user should accept the Geolocation request.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          infoWindow.open(map);
          map.setCenter(pos);
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
 
    /*var centerMarker = new google.maps.Marker({
        position: centerOfMap,
		map: map,
        title: 'Selected Location'
    });*/

    var element = document.getElementById("map")

    // Append CSS centered marker element
    var node = document.createElement('div')
    node.classList.add('centerMarker')

    if (element) {
      element.classList.add('location-picker')
      element.children[0].appendChild(node)
    }

    google.maps.event.addListener(map, 'dragend', function(event){
        markerLocation();
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
   
//This function will get the marker's current location and then add the lat/long
//values to our textfields so that we can save the location.
function markerLocation(){
    //Get location.
    var currentLocation = map.getCenter();
    //Add lat and lng values to a field that we can save.
    //document.getElementById('lat').value = currentLocation.lat(); //latitude
    //document.getElementById('lng').value = currentLocation.lng(); //longitude

    infoWindow.setPosition(currentLocation);
    infoWindow.setContent('Location found.');
    infoWindow.open(map);
}
        
//Load the map when the page has finished loading.
google.maps.event.addDomListener(window, 'load', initMap);