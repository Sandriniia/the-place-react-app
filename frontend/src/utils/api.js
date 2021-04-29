class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка ${res.status}`));
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(this._getResponseData);
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(this._getResponseData);
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._getResponseData);
  }

  removeCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(this._getResponseData);
  }

  addCardLike(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(this._getResponseData);
  }

  deleteCardLike(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(this._getResponseData);
  }

  sentUserData(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._getResponseData);
  }

  sentUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._getResponseData);
  }
}

const api = new Api(
  'https://api.mesto.sandra.nomoredomains.icu',
);

export default api;
