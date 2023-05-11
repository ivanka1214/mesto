const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit-profile');
const editClose = document.querySelector('.popup__close_type-edit');
const editForm = document.querySelector('.popup__form_type-edit');
const editName = editForm.querySelector('#nameInput');
const editJob = editForm.querySelector('#jobs');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_add-profile');
const addClose = document.querySelector('.popup__close_type-add');
const addForm = document.querySelector('.popup__form_type-add');
const placeTemplate = document.getElementById('element_card');
const placesContainer = document.querySelector('.elements');
const closeImg = document.querySelector('.popup__close_type-image');
const popupImg = document.querySelector('.popup_type_image');
const urlImg = document.querySelector('.popup__img');
const textImg = document.querySelector('.popup__text');
const popupList = document.querySelectorAll('.popup');
const titleCard = document.querySelector('#title-card');
const srcCard = document.querySelector('#img-src');
const disabledButton = document.querySelector('#popup__button-add');
const clickEscape = 27;

function showEditProfilePopup() {
  openPopup(editPopup);
  editName.value = profileTitle.textContent;
  editJob.value = profileSubtitle.textContent;
}

function closeByEsc(evt) {
  if (evt.keyCode === clickEscape) {
    popupList.forEach((el) => {
      closePopup(el);
    });
  };
};

function closeByOverlayClick(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    popupList.forEach((el) => {
      closePopup(el);
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
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const valueName = editName.value;
  const valueJobs = editJob.value;
  profileTitle.textContent = valueName;
  profileSubtitle.textContent = valueJobs;
  closePopup(editPopup);
}

function addCard(evt) {
  evt.preventDefault();
  const copyCard = { name: titleCard.value, link: srcCard.value };
  const element = createCard(copyCard);
  placesContainer.prepend(element);
  closePopup(addPopup);
  addForm.reset();
  disabledButton.setAttribute("disabled", true);
  disabledButton.classList.add('popup__button_disabled');
}

const createCard = (cardData) => {
  const cardElement = placeTemplate.content.querySelector(".elements__element").cloneNode(true);
  const cardImage = cardElement.querySelector('.elements__img');
  const cardTitle = cardElement.querySelector('.elements__title');
  const deleteCards = cardElement.querySelector('.elements__delete');
  const like = cardElement.querySelector('.elements__love');
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  const deleteCard = () => {
    cardElement.remove();
  }

  const toggleLike = () => {
    like.classList.toggle('elements__love_active');
  }

  cardImage.addEventListener("click", () => {
    urlImg.src = cardImage.src;
    urlImg.alt = cardImage.alt;
    textImg.textContent = urlImg.alt;
    openPopup(popupImg);
  });

  deleteCards.addEventListener('click', deleteCard);
  like.addEventListener('click', toggleLike);
  return cardElement;
};
initialCards.forEach((card) => {
  const element = createCard(card);
  placesContainer.append(element);
});

addForm.addEventListener('submit', addCard);

addButton.addEventListener('click', () => {
  openPopup(addPopup);
});

addClose.addEventListener('click', () => {
  closePopup(addPopup)
});

closeImg.addEventListener('click', () => {
  closePopup(popupImg)
});


editClose.addEventListener('click', () => {
  closePopup(editPopup)
});

editButton.addEventListener('click', showEditProfilePopup);
editForm.addEventListener('submit', handleProfileFormSubmit);

