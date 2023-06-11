import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__img');
    this._imagePopupCaption = this._popup.querySelector('.popup__text');
  }
  open = (cardData) => {
    this._popupImage.src = cardData.link;
    this._popupImage.alt = cardData.title;
    this._imagePopupCaption.textContent = cardData.title;
    super.open();
  }
}
