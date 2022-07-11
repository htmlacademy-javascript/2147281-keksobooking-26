import { housingTypeFilterElement, housingGuestsFilterElement, housingRoomsFilterElement, housingPriceFilterElement, wifiFilterElement, dishwasherFilterElement, parkingFilterElement, washerFilterElement, elevatorFilterElement, conditionerFilterElement } from './dom-elements.js';
import { adsData } from './web-api.js';
import { ADS_QUANTITY_MAX, FILTERS_DICTIONARY } from './data.js';
import { map, markerGroup, createAdMarker } from './map-data.js';
import { getRandomElementsFromArray, debounce } from './utils.js';

const testPriceFilter = (data, priceElement) => {
  const priceValue = priceElement.value;
  if (priceValue === FILTERS_DICTIONARY.middlePrice.text) {
    return data >= FILTERS_DICTIONARY.middlePrice.value.min && data <= FILTERS_DICTIONARY.middlePrice.value.max;
  } else if ((priceValue === FILTERS_DICTIONARY.lowPrice.text)) {
    return data <= FILTERS_DICTIONARY.lowPrice.value;
  } else if ((priceValue === FILTERS_DICTIONARY.highPrice.text)) {
    return data >= FILTERS_DICTIONARY.highPrice.value;
  }
};

const testFeatureFilter = (data, featureElement) => {
  if (featureElement.checked) {
    if (data === undefined) {
      return false;
    }
    return data.includes(featureElement.value);
  }
  return true;
};

const testFilters = (data, element) => {
  const nodeValue = FILTERS_DICTIONARY.isNumber.test(element.value) ? Number(element.value) : element.value;
  if (nodeValue === FILTERS_DICTIONARY.pluralWord) {
    return true;
  } else if (element.id === FILTERS_DICTIONARY.priceElementId) {
    return testPriceFilter(data, element);
  } else if (element.name === FILTERS_DICTIONARY.featureElementsName) {
    return testFeatureFilter(data, element);
  }
  return data === nodeValue;
};

const filterData = (data) => data
  .filter((el) => testFilters(el.offer.type, housingTypeFilterElement))
  .filter((el) => testFilters(el.offer.guests, housingGuestsFilterElement))
  .filter((el) => testFilters(el.offer.rooms, housingRoomsFilterElement))
  .filter((el) => testFilters(el.offer.price, housingPriceFilterElement))
  .filter((el) => testFilters(el.offer.features, wifiFilterElement))
  .filter((el) => testFilters(el.offer.features, dishwasherFilterElement))
  .filter((el) => testFilters(el.offer.features, parkingFilterElement))
  .filter((el) => testFilters(el.offer.features, washerFilterElement))
  .filter((el) => testFilters(el.offer.features, elevatorFilterElement))
  .filter((el) => testFilters(el.offer.features, conditionerFilterElement));

const onFilterElementChange = () => {
  map.closePopup();
  markerGroup.clearLayers();
  const dataFiltered = filterData(adsData);
  const adsVariety = getRandomElementsFromArray(dataFiltered, ADS_QUANTITY_MAX);
  adsVariety.forEach((ad) => {
    createAdMarker(ad);
  });
};

const onFilterElementChangeDebounce = debounce(() => onFilterElementChange(), 500);


export { onFilterElementChangeDebounce };
