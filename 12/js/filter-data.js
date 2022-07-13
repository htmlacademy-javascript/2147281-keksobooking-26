import { filterElements, filterFormElement } from './dom-elements.js';
import { ADS_QUANTITY_MAX, FILTERS_DICTIONARY, ERROR_MESSAGE_GET_ADS_DATA } from './data.js';
import { clearLayers, createAdMarker } from './map-data.js';
import { debounce, showErrorMessage } from './utils.js';

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
  } else if (element.id === 'housing-price') {
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
      filterData(ad.offer.type, findFilter('housing-type'))
      && filterData(ad.offer.guests, findFilter('housing-guests'))
      && filterData(ad.offer.rooms, findFilter('housing-rooms'))
      && filterData(ad.offer.price, findFilter('housing-price'))
      && filterData(ad.offer.features, findFilter('filter-wifi'))
      && filterData(ad.offer.features, findFilter('filter-dishwasher'))
      && filterData(ad.offer.features, findFilter('filter-parking'))
      && filterData(ad.offer.features, findFilter('filter-washer'))
      && filterData(ad.offer.features, findFilter('filter-elevator'))
      && filterData(ad.offer.features, findFilter('filter-conditioner'))
    ) {
      matchedAds.push(ad);
    }
    return matchedAds.length === ADS_QUANTITY_MAX;
  });
  return matchedAds;
};

const showAdsData = (adsData) => {
  clearLayers();
  const dataFiltered = getMatchedAds(adsData);
  dataFiltered.forEach((ad) => {
    createAdMarker(ad);
  });
};

const onChangeFilterElementWithDebounce = debounce((adsData) => showAdsData(adsData), 500);

const addEventListenerOnChangeFilterFormElement = (adsData) => {
  filterFormElement.addEventListener('change', () => {
    onChangeFilterElementWithDebounce(adsData);
  });
};

const onFailGettingAdsData = (err) => {
  err.message = ERROR_MESSAGE_GET_ADS_DATA;
  showErrorMessage(err.message);
  filterFormElement.classList.add('map__filters--disabled');
};

const onSuccessFilterAdsData = (adsData) => {
  showAdsData(adsData);
  addEventListenerOnChangeFilterFormElement(adsData);
};

export { onChangeFilterElementWithDebounce, onFailGettingAdsData, onSuccessFilterAdsData };
