
const showInputError = (formElement, inputElement, errorMessage, enableConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(enableConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(enableConfig.errorClass);
};

const hideInputError = (formElement, inputElement, enableConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(enableConfig.inputErrorClass);
  errorElement.classList.remove('popup__error');
  errorElement.textContent = '';
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function toggleButtonState(inputList, buttonElement, enableConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add(enableConfig.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute("disabled", false);
    buttonElement.classList.remove(enableConfig.inactiveButtonClass);
  }
};

const checkInputValidity = (formElement, inputElement, enableConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, enableConfig);
  } else {
    hideInputError(formElement, inputElement, enableConfig);
  }
};

const setEventListeners = (formElement, enableConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(enableConfig.inputSelector));
  const buttonElement = formElement.querySelector(enableConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, enableConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, enableConfig);
      toggleButtonState(inputList, buttonElement, enableConfig);
    });
  });
};

const enableValidation = (enableConfig) => {
  const formList = Array.from(document.querySelectorAll(enableConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, enableConfig);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});









































// const showInputError = (formElement, inputElement, errorMessage, enableConfig) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(enableConfig.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(enableConfig.errorClass);
// };

// const hideInputError = (formElement, inputElement, enableConfig) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(enableConfig.inputErrorClass);
//   errorElement.classList.remove('popup__error');
//   errorElement.textContent = '';
// };

// function hasInvalidInput(inputList) {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// };

// function toggleButtonState(inputList, buttonElement, enableConfig) {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.setAttribute("disabled", true);
//     buttonElement.classList.add(enableConfig.inactiveButtonClass);
//   } else {
//     buttonElement.removeAttribute("disabled", false);
//     buttonElement.classList.remove(enableConfig.inactiveButtonClass);
//   }
// };

// const checkInputValidity = (formElement, inputElement, enableConfig) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage, enableConfig);
//   } else {
//     hideInputError(formElement, inputElement, enableConfig);
//   }
// };

// const setEventListeners = (formElement, enableConfig) => {
//   const inputList = Array.from(formElement.querySelectorAll(enableConfig.inputSelector));
//   const buttonElement = formElement.querySelector(enableConfig.submitButtonSelector);
//   toggleButtonState(inputList, buttonElement, enableConfig);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function () {
//       checkInputValidity(formElement, inputElement, enableConfig);
//       toggleButtonState(inputList, buttonElement, enableConfig);
//     });
//   });
// };

// const enableValidation = (enableConfig) => {
//   const formList = Array.from(document.querySelectorAll(enableConfig.formSelector));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', function (evt) {
//       evt.preventDefault();
//     });
//     setEventListeners(formElement, enableConfig);
//   });
// };

// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// });
