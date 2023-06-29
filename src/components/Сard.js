export default class Card {
  constructor(cardData, placeTemplate, openPopupImg, openDelete, changeLike) {
    this._link = cardData.link;
    this._name = cardData.name;
    this._myId = cardData.myid;
    this._likes = cardData.likes;
    this._likesLength = cardData.likes.length;
    this._ownerId = cardData.owner._id;
    this._cardId = cardData._id;
    this._openDelete = openDelete;
    this._changeLike = changeLike;
    this._placeTemplate = placeTemplate;
    this._openPopupImg = openPopupImg;
    this._elementClone = document.querySelector(this._placeTemplate).content.querySelector('.elements__element').cloneNode(true);
    this._counter = this._elementClone.querySelector('.elements__count');
    this._like = this._elementClone.querySelector('.elements__love');
    this._cardImage = this._elementClone.querySelector('.elements__img');
    this._deleteCards = this._elementClone.querySelector('.elements__delete');
    this._cardTitle = this._elementClone.querySelector('.elements__title');
  }

  _handleLike = () => {
    this._changeLike(this._like, this._cardId)
  }

  _handleDeleteElement = () => {
    this._openDelete({ card: this, cardId: this._cardId });
  }

  _handleOpenImg = () => {
    this._openPopupImg({ title: this._name, link: this._link });
  }

  _setEventListeners() {
    this._like.addEventListener('click', this._handleLike);
    this._deleteCards.addEventListener('click', this._handleDeleteElement);
    this._cardImage.addEventListener('click', this._handleOpenImg);
  }

  removeCardElement() {
    this._elementClone.remove();
    this._elementClone = null;
  }

  _changeVisibleForTrashButton() {
    this._myId === this._ownerId ? this._deleteCards.style.display = 'block' : this._deleteCards.style.display = 'none';
  }

  _checkLikesStatus() {
    this._likes.forEach(item => {
      if (item._id === this._myId) {
        this._like.classList.add('elements__love_active')
        return
      }
    })
    this._counter.textContent = this._likesLength;
  }

  toggleLike(likes) {
    this._like.classList.toggle('elements__love_active');
    this._counter.textContent = likes.length;
  }

  createCard() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._checkLikesStatus();
    this._changeVisibleForTrashButton();
    this._setEventListeners();
    return this._elementClone;
  }
}
