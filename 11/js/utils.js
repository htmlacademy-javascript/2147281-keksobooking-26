import { SHOW_ERROR_TIME, DIGITS_LAT_LNG } from './data.js';

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};

const getRandomElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const getRandomArray = (elements) => {
  const maxNumber = getRandomPositiveInteger(1, elements.length);
  const minNumber = getRandomPositiveInteger(0, maxNumber);
  const randomArray = elements.slice(minNumber, maxNumber);
  return randomArray;
};

const overwriteGuestString = (guestNumber) => {
  let guestString = 'гостей';
  if (guestNumber === 1) {
    guestString = 'гостя';
  }
  return guestString;
};

// Взял из интернета. Как было создано, не вникал, поскольку, я так понимаю, этого мы еще не проходили:

Array.max = function(array){
  return Math.max.apply(Math, array);
};

const getCoordinatesFromMarker = (marker) => {
  const lat = String(marker.getLatLng().lat.toFixed(DIGITS_LAT_LNG));
  const lng = String(marker.getLatLng().lng.toFixed(DIGITS_LAT_LNG));
  const adressValue = `${lat}, ${lng}`;
  return adressValue;
};

const showErrorMessage = (message) => {
  const errorContainer = document.createElement('div');
  errorContainer.style.zIndex = '100';
  errorContainer.style.position = 'absolute';
  errorContainer.style.left = '0';
  errorContainer.style.top = '0';
  errorContainer.style.right = '0';
  errorContainer.style.padding = '10px 3px';
  errorContainer.style.fontSize = '30px';
  errorContainer.style.textAlign = 'center';
  errorContainer.style.backgroundColor = 'red';

  errorContainer.textContent = message;

  document.body.append(errorContainer);

  setTimeout(() => {
    errorContainer.remove();
  }, SHOW_ERROR_TIME);
};

export { getRandomPositiveInteger, getRandomPositiveFloat, getRandomElement, getRandomArray, overwriteGuestString, showErrorMessage, getCoordinatesFromMarker };
