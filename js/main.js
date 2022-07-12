import { activeFormState } from './active-form-state.js';
import { map, mainPinMarker, markerGroup } from './map-data.js';
import { tryOnSuccesGettingAdsData, tryOnFailGettingAdsData } from './api-callbacks.js';
import { validator } from './form-validation.js';
import { getAdsData } from './api.js';
import { MAP_VIEW, MAP_ZOOM } from './data.js';
import { adressElement } from './dom-elements.js';
import { getCoordinatesFromMarker } from './utils.js';
import './form-validation.js';

activeFormState(false);

map.on('load', () => {
  activeFormState(true);
  mainPinMarker.addTo(map);
  markerGroup.addTo(map);
  adressElement.value = getCoordinatesFromMarker(mainPinMarker);
  mainPinMarker.on('move', (evt) => {
    adressElement.value = getCoordinatesFromMarker(evt.target);
    validator.validate(adressElement);
  });
  getAdsData((data) => {
    tryOnSuccesGettingAdsData(data);
  }, (err) => {
    tryOnFailGettingAdsData(err);
  });
}).setView(MAP_VIEW, MAP_ZOOM);


L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);
