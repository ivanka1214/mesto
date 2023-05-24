export class Card {
  constructor(cardData, placeTemplate, openPopupImg) {
    this._cardData = cardData;
    this._link = cardData.link;
    this._name = cardData.name;
    this._placeTemplate = placeTemplate;
    this._openPopupImg = openPopupImg;
    this._elementClone = document.querySelector(this._placeTemplate).content.querySelector('.elements__element').cloneNode(true);
  }

  _handleLike = () => {
    this._like.classList.toggle('elements__love_active');
  }
  _handleDeleteCard = () => {
    this._elementClone.remove();
    this._elementClone = null;
  }
  _handleOpenImg = () => {
    this._openPopupImg(this._cardData);
  }
  _setEventListeners(){
    this._like.addEventListener('click',this._handleLike);
    this._deleteCards.addEventListener('click',this._handleDeleteCard);
    this._cardImage.addEventListener('click',this._handleOpenImg);
  }

   createCard() {
    this._cardImage = this._elementClone.querySelector('.elements__img');
    this._like = this._elementClone.querySelector('.elements__love');
    this._deleteCards = this._elementClone.querySelector('.elements__delete');
    this._cardTitle = this._elementClone.querySelector('.elements__title');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._setEventListeners();
    return this._elementClone;
   }
}
