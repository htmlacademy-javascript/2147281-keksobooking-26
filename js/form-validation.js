import { postFormData } from './api.js';
import { getPopupMessage } from './get-popup-message.js';
import { resetForms } from './reset-forms.js';
import { overwriteGuestString } from './utils.js';
import { MAX_GUESTS, MIN_PRICES, PRICE_SLIDER_STEP } from './data.js';
import { formElement, typeSelectElement, typeOptionSelectedElement, roomsSelectElement, roomsOptionSelected, capacitySelectElement, priceElement, priceSliderElement, timeinSelectElement, timeoutSelectElement, messageSuccesElement, messageErrorElement, resetButtonElement, submitButtonElement, titleInputElement } from './dom-elements.js';

const validator = new Pristine(formElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});

const minPriceDefault = MIN_PRICES[typeOptionSelectedElement.value];
priceElement.placeholder = minPriceDefault;
priceElement.min = minPriceDefault;

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

// Подключение noUISlider и его синхронизация с ценой:

noUiSlider.create(priceSliderElement, {
  range: {
    min: Number(priceElement.min),
    max: Number(priceElement.max),
  },
  start: Number(priceElement.min),
  step: PRICE_SLIDER_STEP,
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

let availableNumbersOfGuests = MAX_GUESTS[roomsOptionSelected.value];

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

// Валидация заголовка:

const validateTitle = () => {
  const titleTrimmed = titleInputElement.value.trim();
  return titleTrimmed.length >= 30 && titleTrimmed.length <= 100;
};

const getTitleSpacedErrorMessage = () => 'Введите от 30 до 100 символов, не включая пробелы в начале и в конце';

validator.addValidator(
  titleInputElement,
  validateTitle,
  getTitleSpacedErrorMessage,
  2,
  true
);

// Реализация событий на форме и коллбэки:

const onSuccessSendingFormData = (adsData) => {
  submitButtonElement.disabled = false;
  resetForms(formElement, adsData);
  getPopupMessage(messageSuccesElement);
};

const onFailSendingFormData = () => {
  submitButtonElement.disabled = false;
  getPopupMessage(messageErrorElement);
};

const onSuccessAddEventlistenerToSubmitForm = (adsData) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = validator.validate();
    if (isValid) {
      submitButtonElement.disabled = true;
      const formData = new FormData (evt.target);
      postFormData(formData, () => {
        onSuccessSendingFormData(adsData);
      }, onFailSendingFormData);
    }
  });
};

const onSuccessAddEventlistenerToResetForm = (adsData) => {
  resetButtonElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    validator.reset();
    resetForms(formElement, adsData);
  });
};

export { validator, minPriceDefault, onSuccessAddEventlistenerToSubmitForm, onSuccessAddEventlistenerToResetForm };
