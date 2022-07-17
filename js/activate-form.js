import { filterElements, formElements, formElement, filterFormElement } from './dom-elements.js';


const deactivateForms = () => {
  formElement.classList.add('ad-form--disabled');
  filterFormElement.classList.add('map__filters--disabled');
  filterElements.forEach((element) => {element.disabled = true;});
  formElements.forEach((element) => {element.disabled = true;});
};

const activateForm = () => {
  formElement.classList.remove('ad-form--disabled');
  formElements.forEach((element) => {element.disabled = false;});
};

const activateFilterForm = () => {
  filterFormElement.classList.remove('map__filters--disabled');
  filterElements.forEach((element) => {element.disabled = false;});
};

export { deactivateForms, activateForm, activateFilterForm };
