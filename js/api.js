import { REQUEST_LINKS } from './data.js';

const getAdsData = (onSuccess, onFail) => {
  fetch(REQUEST_LINKS.adsData).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error();
  })
    .then((data) => {
      onSuccess(data);
    }).catch((err) => {
      onFail(err);
    });
};

const postFormData = (formData, onSuccess, onFail) => {
  fetch(REQUEST_LINKS.formData, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      onFail();
    });
};

export { getAdsData, postFormData };
