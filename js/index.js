import { initialCards } from './constants.js';
import { Card } from './Сard.js';
import { FormValidator } from './FormValidator.js';

const buttonOpenFormEditProfile = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit-profile');
const buttonCloseFormEditProfile = document.querySelector('.popup__close_type-edit');
const formAddCard = document.forms.addData;
const formEditProfile = document.forms.editData;
const editName = formEditProfile.querySelector('#nameInput');
const editJob = formEditProfile.querySelector('#jobs');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const buttonOpenFormAddCard = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_add-profile');
const buttonCloseFormAddCard = document.querySelector('.popup__close_type-add');
const placesContainer = document.querySelector('.elements');
const buttonClosePopupImage = document.querySelector('.popup__close_type-image');
const popupImg = document.querySelector('.popup_type_image');
const urlImg = document.querySelector('.popup__img');
const textImg = document.querySelector('.popup__text');
const popupList = Array.from(document.querySelectorAll('.popup'));
const titleCard = document.querySelector('#title-card');
const srcCard = document.querySelector('#img-src');
const placeTemplate = '#element_card';
const clickEscape = 27;

const dataValidation = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  errorTemplate: 'popup__error_type_',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
};


const formEditDataValidation = new FormValidator(dataValidation, formEditProfile);
formEditDataValidation.enableValidation();

const formAddDataValidation = new FormValidator(dataValidation, formAddCard);
formAddDataValidation.enableValidation();

function showEditProfilePopup() {
  formEditDataValidation.resetForm();
  openPopup(editPopup);
  editName.value = profileTitle.textContent;
  editJob.value = profileSubtitle.textContent;
}

function closeByEsc(evt) {
  if (evt.keyCode === clickEscape) {
    const activePopup = document.querySelector('.popup_opened');
        closePopup(activePopup);
  };
};

function closeByOverlayClick(evt) {
  if (evt.target.classList.contains('popup_opened')) {
        closePopup(evt.target);
  };
};


function openPopup(el) {
  el.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

popupList.forEach((popup) => { // итерируем массив. объявляя каждый попап в переменную popup
  popup.addEventListener('mouseup', (event) => { // на каждый попап устанавливаем слушателя события
    const targetClassList = event.target.classList; // запишем в переменную класс элемента, на котором произошло событие
    if (targetClassList.contains('popup') || targetClassList.contains('popup__close')) { // проверяем наличие класса попапа ИЛИ кнопки закрытия
      closePopup(popup); // если один из классов присутствует, то закрываем попап
    }
  })
})

function closePopup(el) {
  el.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
  document.removeEventListener('mousedown', closeByOverlayClick);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = editName.value;
  profileSubtitle.textContent = editJob.value;
  closePopup(editPopup);
}

function openPopupImg(CardData) {
  urlImg.src = CardData.link;
  urlImg.alt = CardData.name;
  textImg.textContent = CardData.name;
  openPopup(popupImg);
}

function createCardNew(element) {
  const card = new Card(element, placeTemplate, openPopupImg);
  const elementCard = card.createCard();
  return elementCard;
}

function addCard(container, card) {
  container.prepend(card);
}

initialCards.forEach(element => {
  addCard(placesContainer, createCardNew(element));
});

formAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const dataCard = { name: titleCard.value, link: srcCard.value };
  addCard(placesContainer, createCardNew(dataCard));
  closePopup(addPopup);
});

buttonOpenFormAddCard.addEventListener('click', () => {
  formAddCard.reset();
  formAddDataValidation.resetForm();
  openPopup(addPopup);
});

buttonCloseFormAddCard.addEventListener('click', () => {
  closePopup(addPopup)
});

buttonClosePopupImage.addEventListener('click', () => {
  closePopup(popupImg)
});

buttonCloseFormEditProfile.addEventListener('click', () => {
  closePopup(editPopup)
});

buttonOpenFormEditProfile.addEventListener('click', showEditProfilePopup);
formEditProfile.addEventListener('submit', handleProfileFormSubmit);
