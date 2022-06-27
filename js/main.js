import { createAdCard } from './ad-card.js';
import { createAdsVariety } from './ads-generator.js';
import { activeFormState } from './active-form-state.js';
import './form-validation.js';

activeFormState(false);

const adsVariety = createAdsVariety();

createAdCard(adsVariety[0]);

const map = L.map('map').on('load', () => {
  activeFormState(true);
}).setView({
  lat: 35.6895,
  lng: 139.692,
}, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const marker = L.marker(
  {
    lat: 35.6895,
    lng: 139.692,
  },
  {
    draggable: true,
  }
);

marker.addTo(map);


