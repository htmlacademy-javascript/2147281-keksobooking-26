import { overwriteGuestString } from './utils.js';

const cardTemplate = document.querySelector('#card').content;

const adTemplate = cardTemplate.querySelector('.popup');

const typesDictionary = {
  flat: 'Квартира',
  palace: 'Дворец',
  bungalow: 'Бунгало',
  hotel: 'Отель',
  house: 'Дом'
};

const keepExistingFeatures = (templateFeatures, existFeatures, modifier = '') => {
  if (existFeatures.length > 0) {
    templateFeatures.forEach((el) => {
      if (!existFeatures.some((item) =>
        el.classList.contains(modifier + item))) {
        el.remove();
      }});
  } else {
    templateFeatures[0].parentElement.style.display = 'none';
  }
};

const showDownloadedPhotos = (photoLinks, receivingContainer, receivingTemplate) => {
  if (photoLinks.length > 0) {
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

const createAdCard = (adsVariety, index) => {
  const singleAd = adsVariety[index];
  const adClone = adTemplate.cloneNode(true);
  const title = adClone.querySelector('.popup__title');
  title.textContent = singleAd.offer.title;
  const adress = adClone.querySelector('.popup__text--address');
  adress.textContent = singleAd.offer.adress;
  const price = adClone.querySelector('.popup__text--price');
  price.textContent = `${singleAd.offer.price} ₽/ночь`;
  const type = adClone.querySelector('.popup__type');
  type.textContent = typesDictionary[singleAd.offer.type];
  const capacity = adClone.querySelector('.popup__text--capacity');
  capacity.textContent = `Количество комнат: ${singleAd.offer.rooms}. Рассчитано на ${singleAd.offer.guests} ${overwriteGuestString(singleAd.offer.guests)}.`;
  const checkingTime = adClone.querySelector('.popup__text--time');
  checkingTime.textContent = `Заезд после ${singleAd.offer.checkin}, выезд до ${singleAd.offer.checkout}`;
  const description = adClone.querySelector('.popup__description');
  if (singleAd.offer.description) {
    description.textContent = singleAd.offer.description;
  } else {
    description.style.display = 'none';
  }
  const avatar = adClone.querySelector('.popup__avatar');
  avatar.src = singleAd.author.avatar;
  const features = adClone.querySelectorAll('.popup__feature');
  keepExistingFeatures(features, singleAd.offer.features, 'popup__feature--');
  const photos = adClone.querySelector('.popup__photos');
  showDownloadedPhotos(singleAd.offer.photos, photos, '.popup__photo');
  return adClone;
};

export {createAdCard};
