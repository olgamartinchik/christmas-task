let markerCoordinates = {
  marker: [2.3364, 48.86091],
  marker: [2.3333, 48.8602],
  marker: [2.3397, 48.8607],
  marker: [2.333, 48.8619],
  marker: [2.3365, 48.8625],
};
const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [2.3364, 48.86091],
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [2.3333, 48.8602],
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [2.3397, 48.8607],
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [2.333, 48.8619],
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [2.3365, 48.8625],
      },
    },
  ],
};
mapboxgl.accessToken =
  "pk.eyJ1Ijoic2ludGNlcm92YSIsImEiOiJja3Vpbnk4NnYwYmp2Mm9wZXB6dWplNHRrIn0.aEsQRdt7YBn4q3WrrfcqSw";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/light-v10", // style URL
  center: [2.3364, 48.86091], // starting position [lng, lat]
  zoom: 15, // starting zoom
});
let nav = new mapboxgl.NavigationControl({
  showCompass: true,
  showZoom: true,
});

map.addControl(nav, "top-right");

for (const { geometry, properties } of geojson.features) {
  // create a HTML element for each feature
  const el = document.createElement("div");
  el.className = "marker";

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el).setLngLat(geometry.coordinates).addTo(map);
}
