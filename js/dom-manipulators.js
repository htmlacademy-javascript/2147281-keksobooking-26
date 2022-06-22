const insertFragmentInDom = (selector, fragment, fragmentSelector, isSingle = false) => {
  const receivingSelector = document.querySelector(selector);
  if (isSingle) {
    const fragmentToInsert = fragment.querySelector(fragmentSelector);
    receivingSelector.append(fragmentToInsert);
  } else {
    receivingSelector.append(fragment);
  }
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

export {insertFragmentInDom, keepExistingFeatures, showDownloadedPhotos};
