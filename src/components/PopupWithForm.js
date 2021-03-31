import Popup from '../components/Popup.js'

export default class PopupWithForm extends Popup {

    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._formSubmit = this._formSubmit.bind(this);
        this._form = this._popup.querySelector('.popup__form');
        this._inputList  = this._form.querySelectorAll('.popup__info');
        this._submitButton = this._form.querySelector('.popup__button');
    }

    _formSubmit(evt) {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues(), this._submitButton);
        this.close();
      }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.id] = input.value;
        })
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._formSubmit);
    }

    close() {
        super.close();
        this._form.reset();
    }
}