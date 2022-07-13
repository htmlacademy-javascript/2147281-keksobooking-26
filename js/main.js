import { activeFormState } from './active-form-state.js';
import { map, mainPinMarker, markerGroup } from './map-data.js';
import { validator, onSuccessAddEventlistenerToSubmitForm, onSuccessAddEventlistenerToResetForm } from './form-validation.js';
import { getAdsData } from './api.js';
import { MAP_VIEW, MAP_ZOOM } from './data.js';
import { adressElement } from './dom-elements.js';
import { onSuccessFilterAdsData, onFailGettingAdsData } from './filter-data.js';
import { getCoordinatesFromMarker } from './utils.js';
import './form-validation.js';

activeFormState(false);

map.on('load', () => {
  activeFormState(true);
  markerGroup.addTo(map);
  mainPinMarker.addTo(map);
  adressElement.value = getCoordinatesFromMarker(mainPinMarker);
  mainPinMarker.on('move', (evt) => {
    adressElement.value = getCoordinatesFromMarker(evt.target);
    validator.validate(adressElement);
  });
  getAdsData((data) => {
    onSuccessFilterAdsData(data);
    onSuccessAddEventlistenerToSubmitForm(data);
    onSuccessAddEventlistenerToResetForm(data);
  }, (err) => {
    onFailGettingAdsData(err);
  });
}).setView(MAP_VIEW, MAP_ZOOM);


L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);
