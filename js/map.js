var map = L.map('map').setView([60.00, 31.60], 7);
var layer1 = L.tileLayer("https://api.mapbox.com/styles/v1/443443414/ck2rz7yp21i1t1cp39rz58r7p/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiNDQzNDQzNDE0IiwiYSI6ImNrMjRmbGloaDB0anMzY21xcWM3dnVwYWQifQ.rQXgw2v8C1LR8MB2oUl0Ig").addTo(map);

var Fuckingicon = L.icon({
  iconUrl: '../assets/images/point_icon.png',

  iconSize: [20, 20], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
  popupAnchor: [0, 00] // point from which the popup should open relative to the iconAnchor
});


function setBasemap(basemap) {
  if (layer1) {
    map.removeLayer(layer1);
  }

  if (basemap === "Topographic") {
    layer1 = L.tileLayer("https://api.mapbox.com/styles/v1/443443414/ck2rz7yp21i1t1cp39rz58r7p/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiNDQzNDQzNDE0IiwiYSI6ImNrMjRmbGloaDB0anMzY21xcWM3dnVwYWQifQ.rQXgw2v8C1LR8MB2oUl0Ig")
  } else {
    layer1 = L.esri.basemapLayer(basemap);
  }

  map.addLayer(layer1);

  if (layerLabels) {
    map.removeLayer(layerLabels);
  }

  if (
    basemap === 'ShadedRelief' ||
    basemap === 'Oceans' ||
    basemap === 'Gray' ||
    basemap === 'DarkGray' ||
    basemap === 'Terrain'
  ) {
    layerLabels = L.esri.basemapLayer(basemap + 'Labels');
    map.addLayer(layerLabels);
  } else if (basemap.includes('Imagery')) {
    layerLabels = L.esri.basemapLayer('ImageryLabels');
    map.addLayer(layerLabels);
  }
}




/*условие кнопки*/
var my_layer = L.geoJSON(wind_data, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: Fuckingicon
    });
  },
  onEachFeature: function (feature, layer) {
    layer.bindPopup('<strong>Скорость ветра на высоте 10 м:</strong><br>' +
      'Январь ' + feature.properties.field_4 + '<br>' +
      'Февраль ' + feature.properties.field_5 + '<br>' +
      'Март ' + feature.properties.field_6 + '<br>' +
      'Апрель ' + feature.properties.field_7 + '<br>' +
      'Май ' + feature.properties.field_8 + '<br>' +
      'Июнь ' + feature.properties.field_9 + '<br>' +
      'Июль ' + feature.properties.field_10 + '<br>' +
      'Август ' + feature.properties.field_11 + '<br>' +
      'Сентябрь ' + feature.properties.field_12 + '<br>' +
      'Октябрь ' + feature.properties.field_13 + '<br>' +
      'Ноябрь ' + feature.properties.field_14 + '<br>' +
      'Декабрь ' + feature.properties.field_15 + '<br>'
    );
  }
});

var my_layershown = false;




function displayLayer() {
  if (my_layershown) {
    document.getElementById("layerbtn-title").innerHTML = "Show";
    my_layer.removeFrom(map);
  } else {
    document.getElementById("layerbtn-title").innerHTML = "Hide";
    my_layer.addTo(map);
  }
  my_layershown = !my_layershown;
};




document
  .querySelector('#basemaps')
  .addEventListener('change', function (e) {
    var basemap = e.target.value;
    setBasemap(basemap);
  });

/*запуск кнопки*/
document
  .addEventListener("DOMContentLoaded", function () {
    document.getElementById("layerbtn").addEventListener("click", function () {
      displayLayer();
    });
  });


/*my_json = L.geoJson(data, {
          pointToLayer: function(feature, latlng) {
              var smallIcon = L.Icon({
                  options: {
                      iconSize: [27, 27],
                      iconAnchor: [13, 27],
                      popupAnchor:  [1, -24],
                      iconUrl: 'icone/chapel-2.png'
                  }
              });
              return L.marker(latlng, {icon: smallIcon});
          },
         onEachFeature: function (feature, layer) {
                 layer.bindPopup(feature.properties.ATT1 + '<br />'
                                               + feature.properties.ATT2);
         }
       });*/