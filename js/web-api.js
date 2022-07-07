import { map, createAdMarker, markerGroup } from './map-data.js';
import { showErrorMessage } from './utils.js';
import { ERROR_MESSAGE_GET_ADS_DATA } from './data.js';
import { resetForms } from './reset-forms.js';
import { messageSuccesElement, messageErrorElement } from './dom-elements.js';
import { getPopupMessage } from './get-popup-message.js';

const getAdsDataAndPushToMap = (url) => {
  fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error();
  })
    .then((data) => {
      const adsVariety = data;
      adsVariety.forEach((ad) => {
        createAdMarker(ad);
      });
      markerGroup.addTo(map);
    }).catch((err) => {
      err.message = ERROR_MESSAGE_GET_ADS_DATA;
      showErrorMessage(err.message);
      const mapFilters = document.querySelector('.map__filters');
      mapFilters.classList.add('map__filters--disabled');
    });
};

const postFormData = (url, formData, form) => {
  fetch(url, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        resetForms(form);
        getPopupMessage(messageSuccesElement);
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      getPopupMessage(messageErrorElement);
    });
};

export { getAdsDataAndPushToMap, postFormData };
