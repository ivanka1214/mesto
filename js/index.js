
import initialCards from './constants.js';
import Card from './card.js';
import FormValidator from './FormValidator.js';

const buttonOpenFormEditProfile = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit-profile');
const buttonCloseFormEditProfile = document.querySelector('.popup__close_type-edit');
const formEditProfile = document.forms.editData;
const editName = formEditProfile.querySelector('#nameInput');
const editJob = formEditProfile.querySelector('#jobs');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const buttonOpenFormAddCard = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_add-profile');
const buttonCloseFormAddCard = document.querySelector('.popup__close_type-add');
const formAddCard = document.forms.addData;
const placesContainer = document.querySelector('.elements');
const buttonClosePopupImage = document.querySelector('.popup__close_type-image');
const popupImg = document.querySelector('.popup_type_image');
const urlImg = document.querySelector('.popup__img');
const textImg = document.querySelector('.popup__text');
const popupList = document.querySelectorAll('.popup');
const titleCard = document.querySelector('#title-card');
const srcCard = document.querySelector('#img-src');
const disabledButton = document.querySelector('#popup__button-add');
const placeTemplate = '#element_card';
const clickEscape = 27;







const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  errorTemplate: 'popup__error_'
};




const FormEditDataValidation = new FormValidator(validationConfig,formEditProfile);
FormEditDataValidation.enableValidation();

const FormAddDataValidation = new FormValidator(validationConfig,formAddCard);
FormAddDataValidation.enableValidation();





function showEditProfilePopup() {
  FormEditDataValidation.resetForm();
  openPopup(editPopup);
  editName.value = profileTitle.textContent;
  editJob.value = profileSubtitle.textContent;
}

function closeByEsc(evt) {
  if (evt.keyCode === clickEscape) {
    popupList.forEach((el) => {
      if (el.classList.contains('popup_opened')) {
        closePopup(el);
      }
    });
  };
};

function closeByOverlayClick(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    popupList.forEach((el) => {
      if (el.classList.contains('popup_opened')) {
        closePopup(el);
      }
    });
  };
};

function openPopup(el) {
  el.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
  document.addEventListener('mousedown', closeByOverlayClick);
}

function closePopup(el) {
  el.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
  document.removeEventListener('mousedown', closeByOverlayClick);
  disabledButton.setAttribute("disabled", true);
  disabledButton.classList.add('popup__button_disabled');
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const valueName = editName.value;
  const valueJobs = editJob.value;
  profileTitle.textContent = valueName;
  profileSubtitle.textContent = valueJobs;
  closePopup(editPopup);
}

function openImagePopup(CardData) {
  urlImg.src = CardData.link;
  urlImg.alt = CardData.name;
  textImg.textContent = CardData.name;
  openPopup(popupImg);
}

function addCard(container, card) {
  container.prepend(card);
}

initialCards.forEach(element => {
  const card = new Card(element, placeTemplate, openImagePopup);
  addCard(placesContainer, card.createCard());

});

formAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const dataCard = { name: titleCard.value, link: srcCard.value };
  const card = new Card(dataCard, placeTemplate, openImagePopup);
  addCard(placesContainer, card.createCard());
  closePopup(addPopup);
});

buttonOpenFormAddCard.addEventListener('click', () => {
  formAddCard.reset();
  FormAddDataValidation.resetForm();
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



























// import initialCards from './constants.js'

// const buttonOpenFormEditProfile = document.querySelector('.profile__edit-button');
// const editPopup = document.querySelector('.popup_type_edit-profile');
// const buttonCloseFormEditProfile = document.querySelector('.popup__close_type-edit');
// const formEditProfile = document.querySelector('.popup__form_type-edit');
// const editName = formEditProfile.querySelector('#nameInput');
// const editJob = formEditProfile.querySelector('#jobs');
// const profileTitle = document.querySelector('.profile__title');
// const profileSubtitle = document.querySelector('.profile__subtitle');
// const buttonOpenFormAddCard = document.querySelector('.profile__add-button');
// const addPopup = document.querySelector('.popup_type_add-profile');
// const buttonCloseFormAddCard = document.querySelector('.popup__close_type-add');
// const formAddCard = document.querySelector('.popup__form_type-add');
// const placeTemplate = document.getElementById('element_card');
// const placesContainer = document.querySelector('.elements');
// const buttonClosePopupImage = document.querySelector('.popup__close_type-image');
// const popupImg = document.querySelector('.popup_type_image');
// const urlImg = document.querySelector('.popup__img');
// const textImg = document.querySelector('.popup__text');
// const popupList = document.querySelectorAll('.popup');
// const titleCard = document.querySelector('#title-card');
// const srcCard = document.querySelector('#img-src');
// const disabledButton = document.querySelector('#popup__button-add');
// const clickEscape = 27;

// function showEditProfilePopup() {
//   openPopup(editPopup);
//   editName.value = profileTitle.textContent;
//   editJob.value = profileSubtitle.textContent;
// }

// function closeByEsc(evt) {
//   if (evt.keyCode === clickEscape) {
//     popupList.forEach((el) => {
//       if (el.classList.contains('popup_opened')) {
//         closePopup(el);
//       }
//     });
//   };
// };

// function closeByOverlayClick(evt) {
//   if (evt.target.classList.contains('popup_opened')) {
//     popupList.forEach((el) => {
//       if (el.classList.contains('popup_opened')) {
//         closePopup(el);
//       }
//     });
//   };
// };

// function openPopup(el) {
//   el.classList.add('popup_opened');
//   document.addEventListener('keydown', closeByEsc);
//   document.addEventListener('mousedown', closeByOverlayClick);
// }

// function closePopup(el) {
//   el.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closeByEsc);
//   document.removeEventListener('mousedown', closeByOverlayClick);
//   disabledButton.setAttribute("disabled", true);
//   disabledButton.classList.add('popup__button_disabled');
// }

// function handleProfileFormSubmit(evt) {
//   evt.preventDefault();
//   const valueName = editName.value;
//   const valueJobs = editJob.value;
//   profileTitle.textContent = valueName;
//   profileSubtitle.textContent = valueJobs;
//   closePopup(editPopup);
// }

// function addCard(evt) {
//   evt.preventDefault();
//   const copyCard = { name: titleCard.value, link: srcCard.value };
//   const element = createCard(copyCard);
//   placesContainer.prepend(element);
//   closePopup(addPopup);
//   formAddCard.reset();
// }

// const createCard = (cardData) => {
//   const cardElement = placeTemplate.content.querySelector(".elements__element").cloneNode(true);
//   const cardImage = cardElement.querySelector('.elements__img');
//   const cardTitle = cardElement.querySelector('.elements__title');
//   const deleteCards = cardElement.querySelector('.elements__delete');
//   const like = cardElement.querySelector('.elements__love');
//   cardTitle.textContent = cardData.name;
//   cardImage.src = cardData.link;
//   cardImage.alt = cardData.name;
//   const deleteCard = () => {
//   cardElement.remove();
//   }

//   const toggleLike = () => {
//     like.classList.toggle('elements__love_active');
//   }

//   cardImage.addEventListener("click", () => {
//     urlImg.src = cardImage.src;
//     urlImg.alt = cardImage.alt;
//     textImg.textContent = urlImg.alt;
//     openPopup(popupImg);
//   });

//   deleteCards.addEventListener('click', deleteCard);
//   like.addEventListener('click', toggleLike);
//   return cardElement;
// };
// initialCards.forEach((card) => {
//   const element = createCard(card);
//   placesContainer.append(element);
// });

// formAddCard.addEventListener('submit', addCard);

// buttonOpenFormAddCard.addEventListener('click', () => {
//   openPopup(addPopup);
// });

// buttonCloseFormAddCard.addEventListener('click', () => {
//   closePopup(addPopup)
// });

// buttonClosePopupImage.addEventListener('click', () => {
//   closePopup(popupImg)
// });


// buttonCloseFormEditProfile.addEventListener('click', () => {
//   closePopup(editPopup)
// });

// buttonOpenFormEditProfile.addEventListener('click', showEditProfilePopup);
// formEditProfile.addEventListener('submit', handleProfileFormSubmit);

