import { ADS_QUANTITY, MAXIMUM_PRICE, MAXIMUM_ROOMS, MAXIMUM_GEUSTS, LAT, LNG, TITLES, TYPES, CHECKINS, CHECKOUTS, FEATURES, PHOTOS, DESCRIPTIONS } from './ads-data';
import { getRandomPositiveFloat, getRandomPositiveInteger, getRandomElement, getRandomArray } from './utils';
import { getNonrepeatingAvatar } from './ads-avatar';

const buildAd = () => {
  const lat = getRandomPositiveFloat(LAT.min, LAT.max, LAT.decimals);
  const lng = getRandomPositiveFloat(LNG.min, LNG.max, LNG.decimals);
  return {
    author: getNonrepeatingAvatar(),
    offer: {
      title: getRandomElement(TITLES),
      adress: `${lat}, ${lng}`,
      price: getRandomPositiveInteger(1, MAXIMUM_PRICE),
      type: getRandomElement(TYPES),
      rooms: getRandomPositiveInteger(1, MAXIMUM_ROOMS),
      guests: getRandomPositiveInteger(1, MAXIMUM_GEUSTS),
      checkin: getRandomElement(CHECKINS),
      checkout: getRandomElement(CHECKOUTS),
      features: getRandomArray(FEATURES),
      description: getRandomElement(DESCRIPTIONS),
      photos: getRandomArray(PHOTOS)
    },
    location: {
      lat: lat,
      lng: lng,
    }
  };
};

const createAdsVariety = () => {
  const adsVariety = Array.from({length: ADS_QUANTITY}, buildAd);
  return adsVariety;
};

export {createAdsVariety};

