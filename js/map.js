var map = L.map('map').setView([60.00, 30.00], 9);
var layer1 = L.tileLayer("https://api.mapbox.com/styles/v1/443443414/ck2rz7yp21i1t1cp39rz58r7p/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiNDQzNDQzNDE0IiwiYSI6ImNrMjRmbGloaDB0anMzY21xcWM3dnVwYWQifQ.rQXgw2v8C1LR8MB2oUl0Ig").addTo(map);




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
}).addTo(map);

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