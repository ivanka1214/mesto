import '../pages/index.css';
import Card from '../components/Сard.js';
import { FormValidator } from '../components/FormValidator.js';
import PopupWithDeleteForm from '../components/PopupWithDeleteForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Api from '../components/Api.js';
import {
  buttonOpenFormEditProfile,
  buttonOpenFormAddCard,
  formAddCard,
  formEditProfile,
  placeTemplate,
  popupProfileSelector,
  popupImageSelector,
  listElementSelector,
  popupAddCardSelector,
  avatarImageElement,
  popupEditAvatarSelector,
  formAvatar,
  configInfo,
  popupDeleteSelector,
  dataValidation
} from '../utils/constants.js';

const userInfo = new UserInfo(configInfo);
const popupImage = new PopupWithImage(popupImageSelector);
const formAvatarValidation = new FormValidator(dataValidation, formAvatar);
formAvatarValidation.enableValidation();
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

const popupDelete = new PopupWithDeleteForm(popupDeleteSelector, ({ card, cardId }) => {
  api.deleteCard(cardId)
    .then(res => {
      card.removeCardElement()
      popupDelete.close()
    })
    .catch((error => console.log(`ошибка ${error}`)))
    .finally(() => popupDelete.setupDefaultText())
});



popupDelete.setEventListeners();

function createNEWCard(element) {
  const card = new Card(element, placeTemplate, popupImage.open, popupDelete.open, (likeElement, cardId) => {
    if (likeElement.classList.contains('elements__love_active')) {
      api.deleteLike(cardId)
        .then(res => {
          card.toggleLike(res.likes)
        })
        .catch((error => console.log(`ошибка ${error}`)))
    } else {
      api.addLike(cardId)
        .then(res => {
          card.toggleLike(res.likes)
        })
        .catch((error => console.log(`ошибка ${error}`)))
    }
  })
  return card.createCard()
}

const section = new Section((element) => {
  section.addItem(createNEWCard(element))
}, listElementSelector
);

const popupProfile = new PopupWithForm(popupProfileSelector, (data) => {

  api.setUserInfo(data)
    .then(res => {
      userInfo.setUserInfo({ username: res.name, job: res.about, avatar: res.avatar })
      popupProfile.close()
    })
    .catch((error => console.log(`ошибка ${error}`)))
    .finally(() => popupProfile.setupDefaultText())
});
const popupAddCard = new PopupWithForm(popupAddCardSelector, (data) => {
  Promise.all([api.getInfo(), api.addCard(data)])
    .then(([dataUser, dataCard]) => {
      dataCard.myid = dataUser._id;
      section.addItem(createNEWCard(dataCard))
      popupAddCard.close()
    })
    .catch((error => console.log(`ошибка ${error}`)))
    .finally(() => popupAddCard.setupDefaultText())
});


const popupAvatar = new PopupWithForm(popupEditAvatarSelector, (data) => {
  api.setNewAvatar(data)
    .then(res => {
      console.log(res)
      userInfo.setUserInfo({ username: res.name, job: res.about, avatar: res.avatar })
      popupAvatar.close()
    })
    .catch((error => console.error(`ошибка ${error}`)))
    .finally(() => popupAvatar.setupDefaultText())
});




popupAvatar.setEventListeners();
popupImage.setEventListeners();
popupProfile.setEventListeners();
popupAddCard.setEventListeners();

buttonOpenFormAddCard.addEventListener('click', () => {
  formAddDataValidation.resetForm();
  popupAddCard.open();
});
buttonOpenFormEditProfile.addEventListener('click', () => {
  formEditDataValidation.resetForm();
  popupProfile.setInputsValue(userInfo.getUserInfo())
  popupProfile.open();
});
avatarImageElement.addEventListener('click', () => {
  formAvatarValidation.resetForm();
  popupAvatar.open();
});


Promise.all([api.getInfo(), api.getCards()])
  .then(([dataUser, dataCard]) => {

    dataCard.forEach(element => element.myid = dataUser._id);
    userInfo.setUserInfo({ username: dataUser.name, job: dataUser.about, avatar: dataUser.avatar })
    section.addCartArray(dataCard);
  })
  .catch((error) => console.error(`ошибка ${error}`))

