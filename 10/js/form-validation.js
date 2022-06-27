import { overwriteGuestString } from './utils.js';
import { MAX_GUESTS, MIN_PRICES } from './ads-data.js';

const form = document.querySelector('.ad-form');

const validator = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});

const typeSelectElement = form.querySelector('#type');
const typeOptionSelectedElement = typeSelectElement.querySelector('option:checked');

const roomsSelectElement = form.querySelector('#room_number');
const roomsOptionSelected = roomsSelectElement.querySelector('option:checked');

const capacitySelectElement = form.querySelector('#capacity');

const priceElement = form.querySelector('#price');
const priceSliderElement = form.querySelector('.ad-form__slider');

const timeinSelectElement = form.querySelector('#timein');
const timeoutSelectElement = form.querySelector('#timeout');

let availableNumbersOfGuests = MAX_GUESTS[roomsOptionSelected.value];

priceElement.placeholder = MIN_PRICES[typeOptionSelectedElement.value];
priceElement.min = MIN_PRICES[typeOptionSelectedElement.value];


// Валидация на минимальную цену относительно типа жилья:

const getStartPriceForSlider = (minPrice) => {
  if (minPrice > priceElement.value) {
    return minPrice;
  }
  return Number(priceElement.value);
};

const onChangeTypeSetMinPrice = (evt) => {
  const minPrice = MIN_PRICES[evt.target.value];
  priceElement.placeholder = minPrice;
  priceElement.min = minPrice;
  validator.validate(priceElement);
  priceSliderElement.noUiSlider.updateOptions({
    range: {
      min: minPrice,
      max: Number(priceElement.max),
    },
    start: getStartPriceForSlider(minPrice),
  });
};

typeSelectElement.addEventListener('change', onChangeTypeSetMinPrice);

const validateMinPrice = (value) =>
  value >= Number(priceElement.min);

const getMinPriceError = () =>
  `Минимальная цена ${priceElement.min}₽ для данного типа жилья!`;

validator.addValidator(
  priceElement,
  validateMinPrice,
  getMinPriceError,
);

// Подключение noUISlider и синхронизируем его с ценой:

noUiSlider.create(priceSliderElement, {
  range: {
    min: Number(priceElement.min),
    max: Number(priceElement.max),
  },
  start: Number(priceElement.min),
  step: 10,
  connect: 'lower'
});

priceSliderElement.noUiSlider.on('update', () => {
  const priceSliderValue = Number(priceSliderElement.noUiSlider.get());
  priceElement.value = priceSliderValue.toFixed(0);
  validator.validate(priceElement);
});

priceElement.addEventListener('change', (evt) => {
  priceSliderElement.noUiSlider.set(Number(evt.target.value));
});

// Валидация на количество гостей относительно количества комнат:

const validateCapacity = (value) => {
  value = Number(value);
  return availableNumbersOfGuests.includes(value);
};

const onChangeRoomsGetNumbersOfGuests = (evt) => {
  availableNumbersOfGuests = MAX_GUESTS[evt.target.value];
  validator.validate(capacitySelectElement);
};

roomsSelectElement.addEventListener('change', onChangeRoomsGetNumbersOfGuests);

const getCapacityErrorMessage = () => {
  if (availableNumbersOfGuests.includes(0)) {
    return 'Не предназначено для гостей!';
  }
  const maxGuestsAmount = Array.max(availableNumbersOfGuests);
  return `Не более ${maxGuestsAmount} ${overwriteGuestString(maxGuestsAmount)} на это количество комнат!` ;
};

validator.addValidator(
  capacitySelectElement,
  validateCapacity,
  getCapacityErrorMessage,
);

// Валидация на время заезда/выезда:

const onChangeTimeinSwitchTimeout = (evt) => {
  timeoutSelectElement.value = evt.target.value;
};

timeinSelectElement.addEventListener('change', onChangeTimeinSwitchTimeout);

const onChangeTimeoutSwitchTimein = (evt) => {
  timeinSelectElement.value = evt.target.value;
};

timeoutSelectElement.addEventListener('change', onChangeTimeoutSwitchTimein);

// Рабочая валидация по кнопке и обнуление формы:

form.addEventListener('submit', (evt) => {
  const isValid = validator.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});

form.addEventListener('reset', () => {
  validator.reset();
});

