
let map;
var service;
var infowindow;

function initMap() {
  var sydney = new google.maps.LatLng(-33.867, 151.195);

  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(
      document.getElementById('map'), {center: sydney, zoom: 15});

  var request = {
    query: 'sydney',
    fields: ['name', 'geometry'],
  };

  var service = new google.maps.places.PlacesService(map);

  service.findPlaceFromQuery(request, function(results, status) {
    console.log("Hello")
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      map.setCenter(results[0].geometry.location);
    }
 });
}
function createMarker(place){//, google.maps.places.PlaceResult) {
  if (!place.geometry || !place.geometry.location) return;

  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });

  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name || "");
    infowindow.open(map);
  });
}



const $userForm = $("#user-search");
const $input = $("input[name='search']");

$userForm.submit((event) => {
  console.log('hello world')
  event.preventDefault();
  let map = null;
  });

  window.initMap = initMap;
export {};


//******************************************************************************
// const $userForm = $("#user-search");
// const $input = $("input[name='search']");

// $userForm.submit((event) => {
//   console.log('hello world')
//   event.preventDefault();
//   const userInput = $input.val();
//   const URL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=golf_course&${userInput}&key=AIzaSyBLXnwDnn_VwpFMbo7T5LgpL960t5GeXG0`;

//   $.get(URL, (results) => {
//     var results = JSON.parse(data); 
//     console.log(results);
//     newResults(results);
//   });
// });

//   $.ajax({
//     type: "GET",
//     headers: {"Access-Control-Allow-Origin": "http://127.0.0.1:5500"},
//     url: URL
// }).done(function (data) {
//     console.log(data);
// });

// var xhr = new XMLHttpRequest();
// xhr.onload = function() {
//   console.log(this.responseXML.title);
// }
// xhr.open("GET", "file.html");
// xhr.responseType = "document";
// xhr.send();

















// let map = null;

// function initMap() {
//   let location = {};
//   navigator.geolocation.getCurrentPosition(function(position) {
//     location.lat = pos.coords.lattitude;
//     location.long = pos.coords.longitude;
//     map = new google.maps.Map(document.getElementById("map"), {
//       zoom: 13
//     });
//   bowlingSearch(location);
//   });
// }

// function bowlingSearch(location) {
//   let currentLocation = new google.maps.LatLng(location.lat, location.long);
//   let details = {
//     location: currentLocation,
//     radius: '2000',
//     type: ['bowling_alley']
//   };
//   let service = new google.maps.places.PlacesService(map);
//   service.nearbySearch(details, callback);
// }

// function callback(details, status) {
//   if (status == google.maps.PlacesServiceStatus.OK) {
//     for (let i = 0; i < details.length; i++) {
//       let place = details[i];
//       let info = 
//     }
//   }
// }


// below is not used

// window.initMap = initMap;

