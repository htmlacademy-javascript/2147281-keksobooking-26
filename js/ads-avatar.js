import { ADS_QUANTITY, BOUNDARY_NUMBER } from './ads-data';
import { getRandomPositiveInteger } from './utils';

const getUserAvatar = (min = 1, max = ADS_QUANTITY) => {
  const adsNumber = ADS_QUANTITY;
  const boundaryName = BOUNDARY_NUMBER;
  const checkingArray = [];
  return function () {
    if (checkingArray.length >= (max - min + 1)) {
      (max += adsNumber);
    }
    let randomNumber = getRandomPositiveInteger(min, max);
    while (checkingArray.includes(randomNumber)) {
      randomNumber = getRandomPositiveInteger(min, max);
    }
    checkingArray.push(randomNumber);
    if (randomNumber < boundaryName) {
      randomNumber = '0'.concat(randomNumber);
    }
    return {avatar: `img/avatars/user${randomNumber}.png`};
  };
};

const getNonrepeatingAvatar = getUserAvatar();

export {getNonrepeatingAvatar};
