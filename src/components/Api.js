export default class Api {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    _checkServerResponse(res) {
      return res.ok ? res.JSON() : Promise.reject(`Error: ${res.status}`);
    }

    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      }).then((res) => {
        return this._checkServerResponse(res);
      });
    }
      
      addNewCard(name, link) {
        fetch(`${this._baseUrl}/cards`, {
            method: "POST",
          headers: this._headers,
        body: JSON.stringify({
            name: name,
            link: link
        }),
      }).then((res) => {
        return this._checkServerResponse(res);
      });
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
          }).then((res) => {
            return this._checkServerResponse(res);
          });
    }

    likeCard(cardId, isLiked) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: isLiked ? "PUT" : "DELETE",
            headers: this._headers,
        }).then((res) => {
          return this._checkServerResponse(res);
        });
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
        headers: this._headers,
        }).then((res) => {
            return this._checkServerResponse(res);
        })
    }

      editUserInfo(name, description) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
            name: name,
            about: description,
        }),
        }).then((res) => {
            return this._checkServerResponse(res);
        })
      }

      editUserAvatar(data) {
        fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
              avatar: data.url
            }),
          }).then((res) => {
            return this._checkServerResponse(res);
          });
        }
      }