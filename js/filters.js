import { filterElements, housingTypeFilterElement, housingGuestsFilterElement, housingRoomsFilterElement, housingPriceFilterElement, wifiFilterElement, dishwasherFilterElement, parkingFilterElement, washerFilterElement, elevatorFilterElement, conditionerFilterElement } from './dom-elements.js';
import { adsData } from './web-api.js';
import { ADS_QUANTITY_MAX, FILTERS_DICTIONARY } from './data.js';
import { map, markerGroup, createAdMarker } from './map-data.js';
import { getRandomElementsFromArray, debounce } from './utils.js';


const filterData = (data) => data
  .slice()
  .filter((el) => {
    if (housingTypeFilterElement.value === FILTERS_DICTIONARY.pluralWord) {
      return true;
    }
    return el.offer.type === housingTypeFilterElement.value;
  })
  .filter((el) => {
    if (housingGuestsFilterElement.value === FILTERS_DICTIONARY.pluralWord) {
      return true;
    }
    return el.offer.guests === Number(housingGuestsFilterElement.value);
  })
  .filter((el) => {
    if (housingRoomsFilterElement.value === FILTERS_DICTIONARY.pluralWord) {
      return true;
    }
    return el.offer.rooms === Number(housingRoomsFilterElement.value);
  })
  .filter((el) => {
    if (housingPriceFilterElement.value === FILTERS_DICTIONARY.pluralWord) {
      return true;
    } else if (housingPriceFilterElement.value === FILTERS_DICTIONARY.middlePrice.text) {
      return el.offer.price >= FILTERS_DICTIONARY.middlePrice.value.min && el.offer.price <= FILTERS_DICTIONARY.middlePrice.value.max;
    } else if ((housingPriceFilterElement.value === FILTERS_DICTIONARY.lowPrice.text)) {
      return el.offer.price <= FILTERS_DICTIONARY.lowPrice.value;
    } else if ((housingPriceFilterElement.value === FILTERS_DICTIONARY.highPrice.text)) {
      return el.offer.price >= FILTERS_DICTIONARY.highPrice.value;
    }})
  .filter((el) => {
    if (wifiFilterElement.checked) {
      if (el.offer.features === undefined) {
        return false;
      }
      return el.offer.features.includes(wifiFilterElement.value);
    }
    return true;
  })
  .filter((el) => {
    if (dishwasherFilterElement.checked) {
      if (el.offer.features === undefined) {
        return false;
      }
      return el.offer.features.includes(dishwasherFilterElement.value);
    }
    return true;
  })
  .filter((el) => {
    if (parkingFilterElement.checked) {
      if (el.offer.features === undefined) {
        return false;
      }
      return el.offer.features.includes(parkingFilterElement.value);
    }
    return true;
  })
  .filter((el) => {
    if (washerFilterElement.checked) {
      if (el.offer.features === undefined) {
        return false;
      }
      return el.offer.features.includes(washerFilterElement.value);
    }
    return true;
  })
  .filter((el) => {
    if (elevatorFilterElement.checked) {
      if (el.offer.features === undefined) {
        return false;
      }
      return el.offer.features.includes(elevatorFilterElement.value);
    }
    return true;
  })
  .filter((el) => {
    if (conditionerFilterElement.checked) {
      if (el.offer.features === undefined) {
        return false;
      }
      return el.offer.features.includes(conditionerFilterElement.value);
    }
    return true;
  });

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

for (const filter of filterElements) {
  filter.addEventListener('change', onFilterElementChangeDebounce);
}

export { onFilterElementChangeDebounce };
