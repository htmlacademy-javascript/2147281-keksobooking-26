import { overwriteGuestString } from './utils.js';
import { TYPES_DICTIONARY } from './data.js';
import { adTemplate } from './dom-elements.js';

const keepExistingFeatures = (templateFeatures, existFeatures, modifier = '') => {
  if (existFeatures !== undefined) {
    templateFeatures.forEach((el) => {
      if (!existFeatures.some((item) =>
        el.classList.contains(modifier + item))) {
        el.remove();
      }});
  } else {
    templateFeatures.forEach((el) => {
      el.style.display = 'none';
    });
  }
};

const showDownloadedPhotos = (photoLinks, receivingContainer, receivingTemplate) => {
  if (photoLinks  !== undefined) {
    for (let i = 0; i < photoLinks.length; i++) {
      const photo = receivingContainer.querySelector(receivingTemplate).cloneNode(true);
      photo.src = photoLinks[i];
      receivingContainer.append(photo);
    }
    receivingContainer.children[0].remove();
  } else {
    receivingContainer.style.display = 'none';
  }
};

const createAdCard = (ad) => {
  const adClone = adTemplate.cloneNode(true);
  const title = adClone.querySelector('.popup__title');
  title.textContent = ad.offer.title;
  const adress = adClone.querySelector('.popup__text--address');
  adress.textContent = ad.offer.adress;
  const price = adClone.querySelector('.popup__text--price');
  price.textContent = `${ad.offer.price} ₽/ночь`;
  const type = adClone.querySelector('.popup__type');
  type.textContent = TYPES_DICTIONARY[ad.offer.type];
  const capacity = adClone.querySelector('.popup__text--capacity');
  capacity.textContent = `Количество комнат: ${ad.offer.rooms}. Рассчитано на ${ad.offer.guests} ${overwriteGuestString(ad.offer.guests)}.`;
  const checkingTime = adClone.querySelector('.popup__text--time');
  checkingTime.textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  const description = adClone.querySelector('.popup__description');
  if (ad.offer.description) {
    description.textContent = ad.offer.description;
  } else {
    description.style.display = 'none';
  }
  const avatar = adClone.querySelector('.popup__avatar');
  avatar.src = ad.author.avatar;
  const features = adClone.querySelectorAll('.popup__feature');
  keepExistingFeatures(features, ad.offer.features, 'popup__feature--');
  const photos = adClone.querySelector('.popup__photos');
  showDownloadedPhotos(ad.offer.photos, photos, '.popup__photo');
  return adClone;
};

export {createAdCard};
