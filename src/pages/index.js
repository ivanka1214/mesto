import '../pages/index.css';
import { Card } from '../components/Сard.js';
import { FormValidator } from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Api from '../components/Api.js';
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


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
  headers: {
    authorization: 'da89fcad-7e9d-4775-a7fd-3518c1b2637c',
    'Content-Type': 'application/json'
  }
});





function createNEWCard(element) {
  const card = new Card(element, placeTemplate, popupImage.open);
  return card.createCard();
}

const section = new Section((element) => {
  section.addItem(createNEWCard(element))
},listElementSelector
  // items: initialCards,
  // renderer: (cardData) => {
  //   const cardElement = createNEWCard(cardData);
  //   section.addItem(cardElement);
  //   },
  // },
  // listElementSelector
);

// section.addCartArray();

// const handleEditPopupSubmit = (formData) => {
//   userInfo.setUserInfo(popupProfile._getInputsValue())
// };


const popupProfile = new PopupWithForm(popupProfileSelector, (data) => {
  userInfo.setUserInfo(data);
});
const popupAddCard = new PopupWithForm(popupAddCardSelector, (data) => {
  section.addItem(createNEWCard(data))
});


// const handleAddPopupSubmit = (formData) => {
//   const title = formData.title;
//   const link = formData.link;

//   const cardData = {
//     title,
//     link,
//   }
//   const cardElement = createNEWCard(cardData);
//   section.addItem(cardElement);

// };

// const popupProfile = new PopupWithForm(popupProfileSelector, handleEditPopupSubmit);
// const popupAddCard = new PopupWithForm(popupAddCardSelector, handleAddPopupSubmit);

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


Promise.all([api.getInfo(),api.getCards()])
.then(([dataUser, dataCard])=>{
  console.log(dataCard);

  dataCard.forEach(element => element.myid = dataUser._id);
userInfo.setUserInfo({username: dataUser.name, job: dataUser.about, avatar:dataUser.avatar})
section.addCartArray(dataCard);
});

