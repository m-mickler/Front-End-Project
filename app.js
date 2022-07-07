var map;
var service;
var infowindow;
// initializes map at given location, gets called in the URL
function initMap() {
  var bremerton = new google.maps.LatLng(47.5673202, -122.6329356);

  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(document.getElementById("map"), {
    center: bremerton,
    zoom: 15,
  });
}
//creates a marker at all search locations
function createMarker(place) {
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
//allows the user to use a search bar and button
const $userForm = $("#user-search");
const $input = $("input[name='search']");

$userForm.submit((event) => {
  $(".info").empty(); // emptys the span
  event.preventDefault();
  processSearchRequest($input.val() + " golf");
});

window.initMap = initMap;
export {};
// gives information on the location submitted
function processSearchRequest(queryString) {
  var request = {
    query: queryString,
    fields: [
      "name",
      "geometry",
      "place_id",
      "formatted_address",
      "photo",
      "price_level",
      "rating",
    ],
  };

  var service = new google.maps.places.PlacesService(map);

  service.findPlaceFromQuery(request, function (results, status) {
    //reloads with information on the new search
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
      console.log(results[i]);
      const $h2 = $('<h2 class="name"></h2>');
      $(".info").append($h2);
      let name = results[i].name;
      console.log(name);
      $(".name").eq(i).text(`${name}`);

      const $h4 = $('<h4 class="address"></h4>');
      $(".info").append($h4);
      let address = results[i].formatted_address;
      console.log(name);
      $(".address").eq(i).text(`${address}`);

      const $h5 = $('<h5 class="rating"></h5>');
      $(".info").append($h5);
      let rating = results[i].rating;
      console.log(name);
      $(".rating").eq(i).text(`Rating ${rating}`);

      if (results[i].photo !== null) {
        const $img = $('<img class="image"></img>');
        $(".info").append($img);
        let image = results[i].photos[0].getUrl();
        $(".image").eq(i).attr("src", `${image}`);
        console.log(image);
      }
    }
    map.setCenter(results[0].geometry.location);
    golfSearch(results);
  });
}
// gathers data from all nearby locations that match with the keyword
function golfSearch(results) {
  let currentLocation = new google.maps.LatLng(
    results["0"].geometry.location.lat(),
    results["0"].geometry.location.lng()
  );
  var details = {
    location: currentLocation,
    radius: 20000,
    keyword: "golf course",
  };
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(details, callback);
}
//places a marker on all locations that come up with the keyword
function callback(details) {
  for (let i = 0; i < details.length; i++) {
    let place = details[i];
    // takes the detail object values to be put in to the info window
    let contentString = `<h3>${place.name}</h3><h3>Rating ${place.rating}</h3><h3>${place.vicinity}</h3>`;
    var marker = new google.maps.Marker({
      position: place.geometry.location,
      map: map,
      title: place.name,
    });
    let content = "this content";
    // brings up an info window which gives information about the clicked on marker
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });
    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
      });
    });
  }
}
