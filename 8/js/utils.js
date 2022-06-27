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

Array.min = function(array){
  return Math.min.apply(Math, array);
};

export {getRandomPositiveInteger, getRandomPositiveFloat, getRandomElement, getRandomArray, overwriteGuestString};