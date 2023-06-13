import '../pages/index.css';
import { Card } from '../components/Сard.js';
import { FormValidator } from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
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
} from '../utils/constants.js';

const userInfo = new UserInfo(configInfo);
const popupImage = new PopupWithImage(popupImageSelector);
const formEditDataValidation = new FormValidator(dataValidation, formEditProfile);
formEditDataValidation.enableValidation();
const formAddDataValidation = new FormValidator(dataValidation, formAddCard);
formAddDataValidation.enableValidation();
// const section = new Section({
//   items: initialCards,
//   renderer: (element) => {
//     const card = new Card(element, placeTemplate, popupImage.open);
//     return card.createCard();
//   }
// }, listElementSelector);
// section.addCartArray();
const section = new Section({
  items: initialCards,
  renderer: (element) => {
    const card = handleNewCard(element);
    return card.createCard();
  }
}, listElementSelector);
section.addCartArray();

function handleNewCard(element) {
  const newCard = new Card(element, placeTemplate, popupImage.open);
  return newCard;
}
///////////////////////////////////////////////////////////////////....
function showEditProfilePopup() {
  formEditDataValidation.resetForm();
  popupProfile.setInputsValue(userInfo.getUserInfo())
  popupProfile.open();
}

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




