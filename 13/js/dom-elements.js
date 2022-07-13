const cardTemplate = document.querySelector('#card').content;

const adTemplate = cardTemplate.querySelector('.popup');

const messageSuccesTemplate = document.querySelector('#success').content;

const messageSuccesElement = messageSuccesTemplate.querySelector('.success');

const messageErrorTemplate = document.querySelector('#error').content;

const messageErrorElement = messageErrorTemplate.querySelector('.error');

const filterFormElement = document.querySelector('.map__filters');

const formElement = document.querySelector('.ad-form');

const resetButtonElement = formElement.querySelector('.ad-form__reset');

const typeSelectElement = formElement.querySelector('#type');
const typeOptionSelectedElement = typeSelectElement.querySelector('option:checked');

const roomsSelectElement = formElement.querySelector('#room_number');
const roomsOptionSelected = roomsSelectElement.querySelector('option:checked');

const capacitySelectElement = formElement.querySelector('#capacity');

const priceElement = formElement.querySelector('#price');
const priceSliderElement = formElement.querySelector('.ad-form__slider');

const timeinSelectElement = formElement.querySelector('#timein');
const timeoutSelectElement = formElement.querySelector('#timeout');

const adressElement = formElement.querySelector('#address');

const filterElements = filterFormElement.querySelectorAll('.map__checkbox, .map__filter');

const avatarFileChooserElement = formElement.querySelector('#avatar');
const avatarPreviewElement = formElement.querySelector('#preview');

const adImgFileChooserElement = formElement.querySelector('#images');
const adImgPreviewWrapperElement = formElement.querySelector('.ad-form__photo');

export { adTemplate, formElement, resetButtonElement, typeSelectElement, typeOptionSelectedElement, roomsOptionSelected, roomsSelectElement, capacitySelectElement, priceElement, priceSliderElement, timeinSelectElement, timeoutSelectElement, adressElement, filterFormElement, messageSuccesElement, messageErrorElement, filterElements, avatarFileChooserElement, avatarPreviewElement, adImgFileChooserElement, adImgPreviewWrapperElement };
