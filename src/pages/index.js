import '../pages/index.css';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithSubmit from '../components/PopupWithSubmit';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import {
  denomination,
  link,
  nameInput,
  jobInput,
  iconEdit,
  iconAdd,
  updateButton,
  profileName,
  profileJob,
  profileAvatar,
  settings
} from '../utils/constants.js'

const api = new Api('7528a356-9b85-4344-aeef-7ef3cdf96739', 'https://mesto.nomoreparties.co/v1/cohort-21/');

let userId;

const userInfo = new UserInfo({
  name: profileName,
  job: profileJob,
  avatar: profileAvatar,
});

const photoClick = new PopupWithImage('#photo');
photoClick.setEventListeners();

function createCard(data) {
  const card = new Card({
    data: data,
    userId: userId,
    cardSelector: '.template',
    handleCardClick: (name, link) => {
      photoClick.open(name, link);
    },
    handleCardLike: (data) => {
      return api.putLike(data);
    },
    handleCardLikeDelete: (data) => {
      return api.deleteLike(data);
    },
    handleCardDelete: (data) => {
      deleteCard.data = data;
      deleteCard.open();
    }
  });
  return card.generateCard();
};

const deleteCard = new PopupWithSubmit({
  popupSelector: '#delete',
  handleFormSubmit: (data) => {
    api.deleteCard(data.cardId)
      .then(() => {
        data.card.remove();
        deleteCard.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
})
deleteCard.setEventListeners();

const defaultCardList = new Section({
  renderer: (data) => {
    defaultCardList.addItem(createCard(data));
  }
},
'.elements'
);

const updatePopup = new PopupWithForm({
  popupSelector: '#update',
  handleFormSubmit: (data, button) => {
    button.textContent = 'Сохранение...'
    api.patchProfileAvatar(data)
    .then((res) => {
      userInfo.setUserAvatar(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = 'Сохранение'
    });
  }
})

updatePopup.setEventListeners();

updateButton.addEventListener('click', () =>{
  updatePopup.open();
})

const profilePopup = new PopupWithForm({
  popupSelector: '#profile-popup',
  handleFormSubmit: (data, button) => {
    button.textContent = 'Сохранение...'
    api.patchProfileInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = 'Сохранение'
    });
  }
});

profilePopup.setEventListeners();

iconEdit.addEventListener('click', ()=> {
  const inputData = userInfo.getUserInfo();
  nameInput.value = inputData.name;
  jobInput.value = inputData.job;
  profilePopup.open();
})

const windowPopup = new PopupWithForm({
  popupSelector: '#window',
  handleFormSubmit: (data, button) => {
    button.textContent = 'Сохранение...'
    console.log(data)
    api.postCard(data)
    .then((res) => {
      defaultCardList.prependItem(createCard(res));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = 'Сохранение'
    });
  }
})

windowPopup.setEventListeners();

iconAdd.addEventListener('click', () =>{
  windowPopup.open();
})

function createForm(settings, formSelector) {
  const validator = new FormValidator(settings, formSelector);
  return validator.enableValidation();
}

createForm(settings, '#window-form')

createForm(settings, '#profile-form')

createForm(settings, '#update-form')

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    defaultCardList.renderItems(cards.reverse());
  })
  .catch((err) => {
    console.log(err);
  })