/* eslint-disable */

export const displayMap = function(locations) {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibHVjaTk5MSIsImEiOiJjbGx1eWNrNG4xOHc4M2duemp4c3Y0M2kzIn0._BEuUJlOKPvUl42XUxeSoQ';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/luci991/clluwm86w00dy01pb6yqu2fn3',
    scrollZoom: false
    //   center: [-118.113491, 34.111745],
    //   zoom: 4
    //   interactive: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Create marker
    const el = document.createElement('div');

    // Add the marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day} : ${loc.description}</p>`)
      .addTo(map);

    // Extends map boundsto include current location
    bounds.extend(loc.coordinates);
    el.classList.add('marker');
  });

  map.fitBounds(bounds, {
    padding: { top: 200, bottom: 150, left: 100, right: 100 }
  });
};
