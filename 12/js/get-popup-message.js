const getPopupMessage = (popupElement) => {
  const messageSuccesClone = popupElement.cloneNode(true);
  const onClickCloseMessagePopup = () => {
    messageSuccesClone.remove();
  };
  const onKeydownCloseMessagePopup = (evt) => {
    if (evt.key === 'Escape') {
      messageSuccesClone.remove();
      window.removeEventListener('keydown', onKeydownCloseMessagePopup);
    }
  };
  messageSuccesClone.addEventListener('click', onClickCloseMessagePopup);
  window.addEventListener('keydown', onKeydownCloseMessagePopup);
  document.body.append(messageSuccesClone);
};

export {getPopupMessage};
