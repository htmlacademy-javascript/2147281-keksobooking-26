import { mainPinMarker, map } from './map-data.js';
import { MAP_VIEW, AVATAR_DEFAULT_LINK } from './data.js';
import { filterFormElement, priceElement, priceSliderElement, avatarPreviewElement } from './dom-elements.js';
import { minPriceDefault } from './form-validation.js';
import { removePreviousAdImg } from './file-choosers.js';
import { onChangeFilterElementWithDebounce } from './filter-data.js';

const resetForms = (form, adsData) => {
  filterFormElement.reset();
  onChangeFilterElementWithDebounce(adsData);
  form.reset();
  removePreviousAdImg();
  avatarPreviewElement.src = AVATAR_DEFAULT_LINK;
  map.closePopup();
  mainPinMarker.setLatLng(MAP_VIEW);
  priceElement.min = minPriceDefault;
  priceElement.placeholder = minPriceDefault;
  priceSliderElement.noUiSlider.updateOptions({
    range: {
      min: minPriceDefault,
      max: Number(priceElement.max),
    },
    start: minPriceDefault,
  });
};

export { resetForms };
