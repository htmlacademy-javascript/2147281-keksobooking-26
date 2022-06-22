const translateAccomodationTypes = (type) => {
  let accomodationType;
  switch (type) {
    case 'flat':
      accomodationType = 'Квартира';
      break;
    case 'palace':
      accomodationType = 'Дворец';
      break;
    case 'bungalow':
      accomodationType = 'Бунгало';
      break;
    case 'hotel':
      accomodationType = 'Отель';
      break;
    case 'house':
      accomodationType = 'Дом';
      break;
    default:
      accomodationType = 'Тип жилья не указан';
  }
  return accomodationType;
};

const overwriteGuestString = (guestNumber) => {
  let guestString = 'гостей';
  if (guestNumber === 1) {
    guestString = 'гостя';
  }
  return guestString;
};

export {translateAccomodationTypes, overwriteGuestString};

