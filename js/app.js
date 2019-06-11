const mymap = L.map("mapid").setView([10, 10], 1);

L.tileLayer(
  "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.satellite",
    // Access token retrieved June 8, 2019
    accessToken:
      "pk.eyJ1IjoiZWthbW9lIiwiYSI6ImNqd283d3I3bjBsd2g0OHFwMzZmMmVzdDgifQ.GMRjUJnvLt1dZ86nIvMtqw"
  }
).addTo(mymap);

function renderMap(contributors) {
  for (var i = 0; i < contributors.length; i++) {
    var latLng = [contributors[i].latitude, contributors[i].longitude];
    var location = L.marker(latLng).addTo(mymap);
    var name = contributors[i].name;
    var birthplace = contributors[i].birthplace;
    var role = contributors[i].rolePub;
    var genre = contributors[i].genre;
    var formattedPopup =
      "<b>" +
      name +
      "<br>" +
      birthplace +
      "</b>" +
      "<br>" +
      role +
      "<br>" +
      genre;
    // console.log("Data to display: " + [name], [birthplace], [role], [latLng]);
    location.bindPopup(formattedPopup);
  }
}

// Prevent zoom on scroll credit: https://gostash.it/en/stashes/1473-disable-mapbox-or-leaflet-map-zooming-while-page-scrolling-but-still-allow-it
mymap.scrollWheelZoom.disable();
var zoomTimer;
mymap.on("mouseover", function() {
  zoomTimer = setTimeout(function() {
    mymap.scrollWheelZoom.enable();
  }, 5000);
});
mymap.on("mouseout", function() {
  clearTimeout(zoomTimer);
  mymap.scrollWheelZoom.disable();
});
