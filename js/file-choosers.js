import { avatarFileChooserElement, avatarPreviewElement, adImgFileChooserElement, adImgPreviewWrapperElement } from './dom-elements.js';
import { FILE_TYPES } from './data.js';

const addEventlistenerToAvatarChooserElement = () => {
  avatarFileChooserElement.addEventListener('change', () => {
    const file = avatarFileChooserElement.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.avatar.some((type) => fileName.endsWith(type));
    if (matches) {
      avatarPreviewElement.src = URL.createObjectURL(file);
    }
  });
};

const removePreviousAdImg = () => {
  if (adImgPreviewWrapperElement.children.length > 0) {
    const adImgPrevious = adImgPreviewWrapperElement.children[0];
    adImgPreviewWrapperElement.removeChild(adImgPrevious);
  }
};

const createAdImgElement = (file) => {
  removePreviousAdImg();
  const adImgElement = document.createElement('img');
  adImgElement.src = URL.createObjectURL(file);
  adImgElement.alt = 'Фотография жилья';
  adImgElement.style.width = '60%';
  adImgElement.style.height = '60%';
  adImgPreviewWrapperElement.style.display = 'flex';
  adImgPreviewWrapperElement.style.alignItems = 'center';
  adImgPreviewWrapperElement.style.justifyContent = 'center';  adImgPreviewWrapperElement.append(adImgElement);
};

const addEventlistenertoAdImgChooserElement = () => {
  adImgFileChooserElement.addEventListener('change', () => {
    const file = adImgFileChooserElement.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.adImg.some((type) => fileName.endsWith(type));
    if (matches) {
      createAdImgElement(file);
    }
  });
};

export { addEventlistenerToAvatarChooserElement, addEventlistenertoAdImgChooserElement, removePreviousAdImg };
