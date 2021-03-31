export class FormValidator {

  constructor(settings, formSelector) {
      this._settings = settings;
      this._formSelector = document.querySelector(formSelector);
      this._inputList = Array.from(this._formSelector.querySelectorAll(this._settings.inputSelector));
      this._buttonElement = this._formSelector.querySelector(this._settings.submitButtonSelector);
  }

  _showInputError (formElement, inputElement, errorMessage, _settings) {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(this._settings.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._settings.errorClass);
  };

  _hideInputError (formElement, inputElement, _settings) {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this._settings.inputErrorClass);
      errorElement.classList.remove(this._settings.errorClass);
      errorElement.textContent = '';
  };

  _isValid (formElement, inputElement, _settings) {
      if (!inputElement.validity.valid) {
        this._showInputError(formElement, inputElement, inputElement.validationMessage, this._settings);
      } else {
        this._hideInputError(formElement, inputElement, this._settings);
      }
    };
    
    _hasInvalidInput (inputList) {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      })
    };
    
    _toggleButtonState (inputList, buttonElement, _settings) {
      if (this._hasInvalidInput(inputList, this._settings)) {
        buttonElement.classList.add(this._settings.inactiveButtonClass);
        buttonElement.setAttribute("disabled", "disabled");
      } else {
        buttonElement.classList.remove(this._settings.inactiveButtonClass);
        buttonElement.removeAttribute("disabled", "disabled");
      }
    };
    
    _setEventListeners (formElement, _settings) {
      formElement.addEventListener('reset', () => {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(formElement, inputElement, _settings)
            this._toggleButtonState(this._inputList, this._buttonElement, _settings);
        })
    });
      this._toggleButtonState(this._inputList, this._buttonElement, this._settings);
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._isValid(formElement, inputElement, this._settings)
          this._toggleButtonState(this._inputList, this._buttonElement, this._settings);
        });
      });
    };

    enableValidation () {
      this._formSelector.addEventListener('submit', (evt) => {
          evt.preventDefault();
        });
        this._setEventListeners(this._formSelector, this._settings);
  }
}