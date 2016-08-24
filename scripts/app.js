// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var $quakesList;
var map;
var template;

$(document).on("ready", function() {

  $.ajax({
      method: 'GET',
      url: weekly_quakes_endpoint,
      dataType: 'json',
      success: onSuccess
  });

  function onSuccess(json) {
    console.log(json);

    var source = $('#earthquake-template').html();
    var earthquakeTemplate = Handlebars.compile(source);
    for(var i=0; i<json.features.length; i++){
      var earthquakeHtml = earthquakeTemplate({
        earthquakeTitle: json.features[i].properties.title
      });
      $('#info').append(earthquakeHtml);
    };

    initMap();

    function initMap() {
        var mapDiv = document.getElementById('map');
        var myLatLng = {lat: 37.78, lng: -122.44};
        var map = new google.maps.Map(mapDiv, {
            center: myLatLng,
            zoom: 8
        });
        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'Hello World!'
        });
        for(var i=0; i<json.features.length; i++){
          var marker = new google.maps.Marker({
            position: {lat: json.features[i].geometry.coordinates[1], lng: json.features[i].geometry.coordinates[0]},
            map: map,
            title: 'Hello World!'
          });
        }
    }

  };


});
