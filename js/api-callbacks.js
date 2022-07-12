import { showErrorMessage } from './utils.js';
import { ERROR_MESSAGE_GET_ADS_DATA } from './data.js';
import { filterAdsData } from './filter-data.js';
import { postFormData } from './api.js';
import { resetForms } from './reset-forms.js';
import { messageSuccesElement, messageErrorElement, formElement, resetButtonElement, filterElement } from './dom-elements.js';
import { getPopupMessage } from './get-popup-message.js';
import { validator } from './form-validation.js';
import { onChangeFilterElementWithDebounce } from './filter-data.js';

const tryOnSuccessSendingFormData = (adsData) => {
  resetForms(formElement, adsData);
  getPopupMessage(messageSuccesElement);
};

const tryOnFailSendingFormData = () => {
  getPopupMessage(messageErrorElement);
};

const addEventListenerOnSubmitElement = (adsData) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = validator.validate();
    if (isValid) {
      const formData = new FormData (evt.target);
      postFormData(formData, () => {
        tryOnSuccessSendingFormData(adsData);
      }, tryOnFailSendingFormData);
    }
  });
};

const addEventListenerOnResetElement = (adsData) => {
  resetButtonElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    validator.reset();
    resetForms(formElement, adsData);
  });
};

const addEventListenerOnChangeFilterFormElement = (adsData) => {
  filterElement.addEventListener('change', () => {
    onChangeFilterElementWithDebounce(adsData);
  });
};

const tryOnFailGettingAdsData = (err) => {
  err.message = ERROR_MESSAGE_GET_ADS_DATA;
  showErrorMessage(err.message);
  filterElement.classList.add('map__filters--disabled');
};

const tryOnSuccesGettingAdsData = (adsData) => {
  filterAdsData(adsData);
  addEventListenerOnSubmitElement(adsData);
  addEventListenerOnResetElement(adsData);
  addEventListenerOnChangeFilterFormElement(adsData);
};

export { tryOnSuccesGettingAdsData, tryOnFailGettingAdsData };
