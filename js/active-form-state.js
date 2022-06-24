const activeFormState = (isMapInit) => {
  const adForm = document.querySelector('.ad-form');
  const mapFilters = document.querySelector('.map__filters');
  const formElements = document.querySelectorAll('.ad-form__element, .map__filter, #housing-features');
  if (!isMapInit) {
    adForm.classList.add('ad-form--disabled');
    mapFilters.classList.add('map__filters--disabled');
    formElements.forEach((element) => {element.disabled = true;});
  } else {
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
    formElements.forEach((element) => {element.disabled = false;});
  }
};

export {activeFormState};
