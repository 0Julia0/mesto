export default class Api {
  constructor(token, baseUrl) {
    this._token = token;
    this._baseUrl = baseUrl;
    }

    _checkResponse(res) {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
  }

    getInitialCards() {
      return fetch(`${this._baseUrl}cards`, {
          headers: {
          authorization: this._token,
          }
      })  
      .then(this._checkResponse)
  }

  getUserInfo(){
    return fetch(`${this._baseUrl}users/me`, {
        headers: {
        authorization: this._token
        }
    })
    .then(this._checkResponse)
}

  postCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: {
      authorization: this._token,
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          name: data.denomination,
          link: data.link
      })
      })
      .then(this._checkResponse)
  }

  deleteCard(data) {
    return fetch(`${this._baseUrl}cards/${data}`, {
      method: 'DELETE',
      headers: {
      authorization: this._token
      },
      })
      .then(this._checkResponse)
  }

  patchProfileInfo(data){
    return fetch(`${this._baseUrl}users/me`, {
    method: 'PATCH',
    headers: {
    authorization: this._token,
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: data.name,
        about: data.job
    })
    })
    .then(this._checkResponse)
}

patchProfileAvatar(data){
  return fetch(`${this._baseUrl}users/me/avatar`, {
    method: 'PATCH',
    headers: {
    authorization: this._token,
    'Content-Type': 'application/json'
      },
    body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then(this._checkResponse)
}

putLike(cardId){
  return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
  method: 'PUT',
  headers: {
  authorization: this._token,
    },
  })
  .then(this._checkResponse)
}

deleteLike(cardId){
  return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
  method: 'DELETE',
  headers: {
  authorization: this._token,
   },
  })
  .then(this._checkResponse)
  }
} 