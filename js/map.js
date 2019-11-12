var map = L.map('map').setView([60.00, 30.00], 9);
var layer1 = L.tileLayer("https://api.mapbox.com/styles/v1/443443414/ck2rz7yp21i1t1cp39rz58r7p/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiNDQzNDQzNDE0IiwiYSI6ImNrMjRmbGloaDB0anMzY21xcWM3dnVwYWQifQ.rQXgw2v8C1LR8MB2oUl0Ig").addTo(map);

var Myicon = L.icon({
  iconUrl: '../assets/images/point_icon.png',
  iconSize: [27, 31],
  iconAnchor: [13.5, 17.5],
  popupAnchor: [0, -11]
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
var my_layer = L.geoJSON (wind_data,{icon: Myicon});
my_layer.bindPopup(function () {
  return L.Util.template("Я буду очень благодарен, если Дмитрий Сергеевич поможет мне научиться добавлять всплывающие окна с атрибутами слоя");
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