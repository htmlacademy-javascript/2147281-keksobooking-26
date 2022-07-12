import { filterElements} from './dom-elements.js';
import {  } from './api.js';
import { ADS_QUANTITY_MAX, FILTERS_DICTIONARY } from './data.js';
import { clearLayers, createAdMarker } from './map-data.js';
import { debounce } from './utils.js';

const findFilter = (filterId) => {
  for (const filter of filterElements) {
    if (filter.id === filterId) {
      return filter;
    }
  }
};

const filterPrice = (data, priceElement) => {
  const priceValue = priceElement.value;
  if (priceValue === FILTERS_DICTIONARY.middlePrice.text) {
    return data >= FILTERS_DICTIONARY.middlePrice.value.min && data <= FILTERS_DICTIONARY.middlePrice.value.max;
  } else if ((priceValue === FILTERS_DICTIONARY.lowPrice.text)) {
    return data <= FILTERS_DICTIONARY.lowPrice.value;
  } else if ((priceValue === FILTERS_DICTIONARY.highPrice.text)) {
    return data >= FILTERS_DICTIONARY.highPrice.value;
  }
};

const filterFeature = (data, featureElement) => {
  if (featureElement.checked) {
    if (data === undefined) {
      return false;
    }
    return data.includes(featureElement.value);
  }
  return true;
};

const filterData = (data, element) => {
  const nodeValue = FILTERS_DICTIONARY.isNumber.test(element.value) ? Number(element.value) : element.value;
  if (nodeValue === FILTERS_DICTIONARY.pluralWord) {
    return true;
  } else if (element.id === FILTERS_DICTIONARY.filtersId.price) {
    return filterPrice(data, element);
  } else if (element.name === FILTERS_DICTIONARY.featureElementsName) {
    return filterFeature(data, element);
  }
  return data === nodeValue;
};

const getMatchedAds = (data) => {
  const matchedAds = [];
  data.some((ad) => {
    if (
      filterData(ad.offer.type, findFilter(FILTERS_DICTIONARY.filtersId.type))
      && filterData(ad.offer.guests, findFilter(FILTERS_DICTIONARY.filtersId.guests))
      && filterData(ad.offer.rooms, findFilter(FILTERS_DICTIONARY.filtersId.rooms))
      && filterData(ad.offer.price, findFilter(FILTERS_DICTIONARY.filtersId.price))
      && filterData(ad.offer.features, findFilter(FILTERS_DICTIONARY.filtersId.wifi))
      && filterData(ad.offer.features, findFilter(FILTERS_DICTIONARY.filtersId.dishwasher))
      && filterData(ad.offer.features, findFilter(FILTERS_DICTIONARY.filtersId.parking))
      && filterData(ad.offer.features, findFilter(FILTERS_DICTIONARY.filtersId.washer))
      && filterData(ad.offer.features, findFilter(FILTERS_DICTIONARY.filtersId.elevator))
      && filterData(ad.offer.features, findFilter(FILTERS_DICTIONARY.filtersId.conditioner))
    ) {
      matchedAds.push(ad);
    }
    return matchedAds.length === ADS_QUANTITY_MAX;
  });
  return matchedAds;
};

const filterAdsData = (adsData) => {
  clearLayers();
  const dataFiltered = getMatchedAds(adsData);
  dataFiltered.forEach((ad) => {
    createAdMarker(ad);
  });
};

const onChangeFilterElementWithDebounce = debounce((adsData) => filterAdsData(adsData), 500);

export { filterAdsData, onChangeFilterElementWithDebounce };
