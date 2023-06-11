import { Card } from './js/components/Сard.js';
import { FormValidator } from './js/components/FormValidator.js';
import PopupWithImage from './js/components/PopupWithImage.js';
import Section from './js/components/Section.js';
import UserInfo from './js/components/UserInfo.js';
import PopupWithForm from './js/components/PopupWithForm.js';
import {
  initialCards,
  buttonOpenFormEditProfile,
  buttonOpenFormAddCard,
  formAddCard,
  formEditProfile,
  placeTemplate,
  popupProfileSelector,
  popupImageSelector,
  listElementSelector,
  popupAddCardSelector,
  configInfo,
  dataValidation
} from './js/utils/constants.js';

const userInfo = new UserInfo(configInfo);
const popupImage = new PopupWithImage(popupImageSelector);
const formEditDataValidation = new FormValidator(dataValidation, formEditProfile);
formEditDataValidation.enableValidation();
const formAddDataValidation = new FormValidator(dataValidation, formAddCard);
formAddDataValidation.enableValidation();

function showEditProfilePopup() {
  formEditDataValidation.resetForm();
  popupProfile.setInputsValue(userInfo.getUserIngo())
  popupProfile.open();
}

function addCard(container, card) {
  container.prepend(card);
}

const section = new Section({
  items: initialCards,
  renderer: (element) => {
    const card = new Card(element, placeTemplate, popupImage.open);
    return card.createCard();
  }
}, listElementSelector);
section.addCartArray();

const popupProfile = new PopupWithForm(popupProfileSelector, (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo(popupProfile.getInputsValue())
  popupProfile.close();
});

const popupAddCard = new PopupWithForm(popupAddCardSelector, (evt) => {
  evt.preventDefault();
  section.addItem(section.renderer(popupAddCard.getInputsValue()));
  popupAddCard.close();
})

popupImage.setEventListeners();
popupProfile.setEventListeners();
popupAddCard.setEventListeners();

buttonOpenFormAddCard.addEventListener('click', () => {
  formAddDataValidation.resetForm();
  popupAddCard.open();
});
buttonOpenFormEditProfile.addEventListener('click', showEditProfilePopup);
