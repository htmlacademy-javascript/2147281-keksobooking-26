import { overwriteGuestString } from './utils.js';

const form = document.querySelector('.ad-form');

const validator = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});

const maxGuests = {
  '1': [1],
  '2': [1, 2],
  '3': [1, 2, 3],
  '100': [0],
};

const validateCapacity = (value) => {
  const roomsSelectElement = document.querySelector('#room_number');
  const roomsAmountSelected = roomsSelectElement.querySelector('option:checked');
  value = Number(value);
  const availableNumbersOfGuests = maxGuests[roomsAmountSelected.value];
  return availableNumbersOfGuests.includes(value);
};

const getCapacityErrorMessage = () => {
  const roomsSelectElement = document.querySelector('#room_number');
  const roomsAmountSelected = roomsSelectElement.querySelector('option:checked');
  const availableNumbersOfGuests = maxGuests[roomsAmountSelected.value];
  if (availableNumbersOfGuests.includes(0)) {
    return 'Не предназначено для гостей!';
  }
  const maxGuestsAmount = Array.max(availableNumbersOfGuests);
  return `Не более ${maxGuestsAmount} ${overwriteGuestString(maxGuestsAmount)} на это количество комнат!` ;
};

validator.addValidator(
  form.querySelector('#capacity'),
  validateCapacity,
  getCapacityErrorMessage,
);

form.addEventListener('submit', (evt) => {
  const isValid = validator.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});

form.addEventListener('reset', () => {
  validator.reset();
});

