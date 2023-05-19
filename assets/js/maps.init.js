$(document).ready(function () {
  map()
})

function map () {
  if ($('#map').length) {
    var lat = parseFloat($('#map').data("latitude"));
    var lng = parseFloat($('#map').data("longitude"));

    var name = $('#map').data("name");
    var address = $('#map').data("address");
    var gPlaceId = $('#map').data("placeid");

    var map = L.map('map', {scrollWheelZoom: false, boxZoom: false, doubleClickZoom: false, touchZoom: false, dragging: false, keyboard: false}).setView([lat, lng], 15);

    // Theme URL format in XYZ PNG format; see our themes documentation for more options
    L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
      attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org">OpenMapTiles</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map);

    var gmapsUrl = address ? encodeURI(`https://www.google.com/maps/search/?api=1&query=${address}`) : "";
    if (gPlaceId) {
      gmapsUrl = gmapsUrl + `&query_place_id=${encodeURIComponent(gPlaceId)}`
    }
    
    var gLink = `<a href ="${gmapsUrl}">${address}</a>`
    var marker = L.marker([lat, lng], {title: name ? name : "Location Pin"}).addTo(map).bindPopup(address ? gLink : 'Address unknown');

    if (typeof mapPolygon !== "undefined") {
      var latLongObj = mapPolygon.map(x => { return [x.latitude, x.longitude]});
      var polygonOptions = {color:'green', weight:2};
      var polygon = L.polygon(latLongObj , polygonOptions);
      polygon.addTo(map);
    }

    respondToVisibility(document.getElementById("map"), visible => {
      if(visible) {
        map.invalidateSize();
       }
    });
  }
}

function respondToVisibility(element, callback) {
  var options = {
    root: null
  }

  var observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      callback(entry.intersectionRatio > 0);
    });
  }, options);

  observer.observe(element);
}