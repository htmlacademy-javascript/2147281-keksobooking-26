import { activeFormState } from './active-form-state.js';
import { map, mainPinMarker } from './map-data.js';
import { validator } from './form-validation.js';
import { getAdsDataAndPushToMap } from './web-api.js';
import { MAP_VIEW, MAP_ZOOM, REQUEST_LINKS } from './data.js';
import { adressElement } from './dom-elements.js';
import { getCoordinatesFromMarker } from './utils.js';
import './form-validation.js';
import './filters.js';

activeFormState(false);

map.on('load', () => {
  activeFormState(true);
  mainPinMarker.addTo(map);
  adressElement.value = getCoordinatesFromMarker(mainPinMarker);
  mainPinMarker.on('move', (evt) => {
    adressElement.value = getCoordinatesFromMarker(evt.target);
    validator.validate(adressElement);
  });
  getAdsDataAndPushToMap(REQUEST_LINKS.adsData);
}).setView(MAP_VIEW, MAP_ZOOM);


L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);
