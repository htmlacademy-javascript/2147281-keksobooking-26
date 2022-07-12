import { REQUEST_LINKS } from './data.js';

const getAdsData = (onSucces, onFail) => {
  fetch(REQUEST_LINKS.adsData).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error();
  })
    .then((data) => {
      onSucces(data);
    }).catch((err) => {
      onFail(err);
    });
};

const postFormData = (formData, onSucces, onFail) => {
  fetch(REQUEST_LINKS.formData, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        onSucces();
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      onFail();
    });
};

export { getAdsData, postFormData };
