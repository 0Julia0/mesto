export class Card {
    
    constructor({ data, userId , cardSelector, handleCardClick, handleCardLike, handleCardLikeDelete, handleCardDelete }) {
        this._data = data;
        this._cardId = data._id;
        this._cardOwner = data.owner._id;
        this._userId  = userId;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardLike = handleCardLike;
        this._handleCardLikeDelete = handleCardLikeDelete;
        this._handleCardDelete = handleCardDelete;
        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector('.element__heart');
        this._deleteButton = this._element.querySelector('.element__remove');
        this._amount = this._element.querySelector('.element__number');
    }
  
    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
  
        return cardElement;
    }

    _isLiked() {
        if (this._data.likes.some(item => item._id === this._userId)) {
            this._likeButton.classList.add('element__heart-active');
        }
    }
  
    generateCard() {
        this._setEventListeners();
        this._cardImage = this._element.querySelector('.element__photo');
        this._cardImage.src = this._data.link;
        this._cardImage.alt = this._data.name;
        this._element.querySelector('.element__text').textContent = this._data.name;
        this._amount.textContent = this._data.likes.length;
        this._isLiked();

        return this._element;
    }

    _deleteButtonClick() {
        const data = {
            card: this._element,
            cardId: this._cardId
        };
        this._handleCardDelete(data)
    }

    _likeToggler() {
        if (!this._likeButton.classList.contains('element__heart-active')) {
            this._handleCardLike(this._cardId)
              .then((res) => {
                  this._data = res;
                  this._amount.textContent = res.likes.length;
                  this._likeButton.classList.add('element__heart-active')
              })
              .catch((err) => {
                console.log(err);
              }); 
        } else {
            this._handleCardLikeDelete(this._cardId)
            .then((res) => {
                this._data = res;
                this._amount.textContent = res.likes.length;
                this._likeButton.classList.remove('element__heart-active')
            })
            .catch((err) => {
                console.log(err);
              }); 
        }
    }
  
    _setEventListeners() {
        if (this._cardOwner === this._userId) {
            this._deleteButton.classList.add('element__remove-active')
            this._deleteButton.classList.remove('element__remove')
            this._deleteButton.addEventListener('click', () => {
                this._deleteButtonClick()
            });
        }
        this._likeButton.addEventListener('click', () => {
            this._likeToggler()
        });
  
        this._element.querySelector('.element__photo').addEventListener('click', () => {
            this._handleCardClick(this._data.name, this._data.link)
        });
      }
  }