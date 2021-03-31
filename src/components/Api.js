export default class Api {
  constructor(token, groupId) {
    this._token = token;
    this._groupId = groupId;
    }

    getInitialCards() {
      return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/cards`, {
          headers: {
          authorization: this._token,
          }
      })  
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((err) => {
      console.log(err);
    }); 
  }

  getUserInfo(){
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/users/me`, {
        headers: {
        authorization: this._token
        }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((err) => {
      console.log(err);
    }); 
}

  postCard(data) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/cards`, {
      method: 'POST',
      headers: {
      authorization: this._token,
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          name: data.name,
          link: data.link
      })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => {
        console.log(err);
      }); 
  }

  deleteCard(data) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/cards/${data}`, {
      method: 'DELETE',
      headers: {
      authorization: this._token
      },
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => {
        console.log(err);
      }); 
  }

  patchProfileInfo(data){
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/users/me`, {
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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((err) => {
      console.log(err);
    }); 
}

patchProfileAvatar(data){
  return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/users/me/avatar`, {
  method: 'PATCH',
  headers: {
  authorization: this._token,
  'Content-Type': 'application/json'
  },
  body: JSON.stringify({
      avatar: data.avatar
  })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  })
  .catch((err) => {
    console.log(err);
  }); 
}

putLike(cardId){
return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/cards/likes/${cardId}`, {
method: 'PUT',
headers: {
authorization: this._token,
},
})
.then(res => {
  if (res.ok) {
    return res.json();
  }
})
.catch((err) => {
  console.log(err);
}); 
}

deleteLike(cardId){
return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/cards/likes/${cardId}`, {
method: 'DELETE',
headers: {
authorization: this._token,
},
})
.then(res => {
  if (res.ok) {
    return res.json();
  }
})
.catch((err) => {
  console.log(err);
}); 
}
} 