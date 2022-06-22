import { createAdsVariety } from './ads-generator.js';
import { translateAccomodationTypes, overwriteGuestString} from './string-manipulators.js';
import { keepExistingFeatures, showDownloadedPhotos } from './dom-manipulators.js';

const cardTemplate = document.querySelector('#card').content;
const adTemplate = cardTemplate.querySelector('.popup');
const adsVariety = createAdsVariety();
const adsFragment = document.createDocumentFragment();

adsVariety.forEach(({author, offer}) => {
  const adClone = adTemplate.cloneNode(true);
  const title = adClone.querySelector('.popup__title');
  title.textContent = offer.title;
  const adress = adClone.querySelector('.popup__text--address');
  adress.textContent = offer.adress;
  const price = adClone.querySelector('.popup__text--price');
  price.textContent = `${offer.price} ₽/ночь`;
  const type = adClone.querySelector('.popup__type');
  type.textContent = translateAccomodationTypes(offer.type);
  const capacity = adClone.querySelector('.popup__text--capacity');
  capacity.textContent = `Количество комнат: ${offer.rooms}. Рассчитано на ${offer.guests} ${overwriteGuestString(offer.guests)}.`;
  const checkingTime = adClone.querySelector('.popup__text--time');
  checkingTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  const description = adClone.querySelector('.popup__description');
  if (offer.description) {
    description.textContent = offer.description;
  } else {
    description.style.display = 'none';
  }
  const avatar = adClone.querySelector('.popup__avatar');
  avatar.src = author.avatar;
  const features = adClone.querySelectorAll('.popup__feature');
  keepExistingFeatures(features, offer.features, 'popup__feature--');
  const photos = adClone.querySelector('.popup__photos');
  showDownloadedPhotos(offer.photos, photos, '.popup__photo');
  adsFragment.append(adClone);
});

export {adsFragment};
