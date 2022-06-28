import { activeFormState } from './active-form-state.js';
import { createAdsVariety } from './ads-generator.js';
import { mainPinMarker, markerGroup, createAdMarker } from './map-markers.js';
import { MAP_VIEW, MAP_ZOOM, DIGITS_LAT_LNG } from './ads-data.js';
import './form-validation.js';

activeFormState(false);

const map = L.map('map');

map.on('load', () => {
  const adressElement = document.querySelector('#address');
  const adsVariety = createAdsVariety();
  mainPinMarker.addTo(map);
  mainPinMarker.on('move', (evt) => {
    const lat = String(evt.target.getLatLng().lat.toFixed(DIGITS_LAT_LNG));
    const lng = String(evt.target.getLatLng().lng.toFixed(DIGITS_LAT_LNG));
    adressElement.value = `${lat}, ${lng}`;
  });
  markerGroup.addTo(map);

  adsVariety.forEach((ad) => {
    createAdMarker(ad);
  });
  activeFormState(true);
}).setView(MAP_VIEW, MAP_ZOOM);


L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);
