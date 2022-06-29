import { activeFormState } from './active-form-state.js';
import { map, mainPinMarker} from './map-data.js';
import { validator } from './form-validation.js';
import { getAdsDataAndPushToMap } from './requests.js';
import { MAP_VIEW, MAP_ZOOM } from './data.js';
import { adressElement } from './dom-elements.js';
import { getCoordinatesFromMarker } from './utils.js';
import './form-validation.js';

activeFormState(false);

map.on('load', () => {
  activeFormState(true);
  mainPinMarker.addTo(map);
  adressElement.value = getCoordinatesFromMarker(mainPinMarker);
  mainPinMarker.on('move', (evt) => {
    adressElement.value = getCoordinatesFromMarker(evt.target);
    validator.validate(adressElement);
  });
  getAdsDataAndPushToMap('https://26.javascript.pages.academy/keksobooking/data');
}).setView(MAP_VIEW, MAP_ZOOM);


L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


