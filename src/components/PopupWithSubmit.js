import Popup from '../components/Popup.js'

export default class PopupWithSubmit extends Popup {

    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupDeleteButton = this._popup.querySelector('.popup__button');
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupDeleteButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this.data)
        })
    }
}