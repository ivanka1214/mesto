export class FormValidator {
  constructor(enableConfig, form) {
    this._form = form;
    this._inputSelector = enableConfig.inputSelector;
    this._submitButtonSelector = enableConfig.submitButtonSelector;
    this._inactiveButtonClass = enableConfig.inactiveButtonClass;
    this._errorTemplate = enableConfig.errorTemplate;
    this._inputErrorClass = enableConfig.inputErrorClass;
    this._button = form.querySelector(this._submitButtonSelector);
    this._listInputs = form.querySelectorAll(this._inputSelector);
  }

  _showInputError(errorText, input) {
    input.classList.add(this._inputErrorClass);
    errorText.textContent = input.validationMessage;
  }

  _hideInputError(errorText, input) {
    input.classList.remove(this._inputErrorClass);
    errorText.textContent = '';
  }

  _disableButton() {
    this._button.classList.add(this._inactiveButtonClass);
    this._button.disabled = true;
  }

  _enableButton() {
    this._button.classList.remove(this._inactiveButtonClass);
    this._button.disabled = false;
  }

  _hasValidInput() {
    return Array.from(this._listInputs).every(input => input.validity.valid);
  }

  _toggleButtonState() {
    this._hasValidInput() ? this._enableButton() : this._disableButton();
  }

  _checkInputValidity(input) {
    const errorText = this._form.querySelector(`.${this._errorTemplate}${input.name}`);
    input.validity.valid ? this._hideInputError(errorText, input) : this._showInputError(errorText, input);
  }

  _setEventListeners() {
    this._listInputs.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      })
    })
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetForm() {
    this._listInputs.forEach(input => {
      const errorReset = this._form.querySelector(`.${this._errorTemplate}${input.name}`);
      if (!input.validity.valid) {
        this._hideInputError(errorReset, input);
      }
    })
    this._disableButton();
  }
}
