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

const createNEWCard = (cardData) => {
  const card = new Card(cardData, placeTemplate, popupImage.open);
  return card.createCard();
}

const section = new Section({
  items: initialCards,
  renderer: (cardData) => {
    const cardElement = createNEWCard(cardData);
    section.addItem(cardElement);
    },
  },
  listElementSelector
);

section.addCartArray();

const handleEditPopupSubmit = (formData) => {
  userInfo.setUserInfo(popupProfile._getInputsValue())
};

const handleAddPopupSubmit = (formData) => {
  const title = formData.title;
  const link = formData.link;

  const cardData = {
    title,
    link,
  }
  const cardElement = createNEWCard(cardData);
  section.addItem(cardElement);

};

const popupProfile = new PopupWithForm(popupProfileSelector, handleEditPopupSubmit);
const popupAddCard = new PopupWithForm(popupAddCardSelector, handleAddPopupSubmit);

popupImage.setEventListeners();
popupProfile.setEventListeners();
popupAddCard.setEventListeners();

buttonOpenFormAddCard.addEventListener('click', () => {
  formAddDataValidation.resetForm();
  popupAddCard.open();
});
buttonOpenFormEditProfile.addEventListener('click', () => {
  formEditDataValidation.resetForm();
  popupProfile.open();
});




