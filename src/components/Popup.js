export default class Popup {

    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);

        this._handleEscClose = this._handleEscClose.bind(this);
        this._closeBackground = this._closeBackground.bind(this);
    }

    open () {
        this._popup.classList.add('popup_opened');
        this._popup.addEventListener('click', this._closeBackground);
        document.addEventListener('keydown', this._handleEscClose);
    }

    close () {
        this._popup.classList.remove('popup_opened');
        this._popup.removeEventListener('click', this._closeBackground);
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
          }
    }

    _closeBackground(event) {
        if (event.target === event.currentTarget) {
          this.close();
        }
    }

    setEventListeners() {
        this._popup.querySelector('.popup__close-button').addEventListener('click', () => {
            this.close();
        });
}

}