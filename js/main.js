import { createAdsVariety } from './ads-generator.js';
import { activeFormState } from './active-form-state.js';
import { mainPinMarker, markerGroup, createAdMarker } from './map-markers.js';

import './form-validation.js';

activeFormState(false);

const map = L.map('map').on('load', () => {
  activeFormState(true);
}).setView({
  lat: 35.67500,
  lng: 139.75000,
}, 13);

const adressElement = document.querySelector('#address');

const adsVariety = createAdsVariety();

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const lat = String(evt.target.getLatLng().lat.toFixed(5));
  const lng = String(evt.target.getLatLng().lng.toFixed(5));
  adressElement.value = `${lat}, ${lng}`;
});

markerGroup.addTo(map);

adsVariety.forEach((ad) => {
  createAdMarker(ad);
});

