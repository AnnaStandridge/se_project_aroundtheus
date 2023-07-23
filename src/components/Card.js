export default class Card {
  constructor(
    { name, link, likes, _id, userId },
    myId,
    cardSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._id = _id;
    this._myId - myId;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick - handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  getId() {
    return this._id;
  }

  _getData() {
    const data = {
      name: this._name,
      link: this._link,
    };
    return data;
  }

  isLiked() {
    return this._likes.some((like) => {
      return like._id === this._myId;
    });
  }

  likeCounter(likes) {
    this._likes = likes;
    this.updateLikeCounter();
  }

  updateLikeCounter() {
    this._cardElement.querySelector(".card__like-counter").textContent =
      this._likes.length;
  }

  _toggleLikeButton() {
    this._cardElement.querySelector(".card__like-counter").textContent =
      this._likes.length;
    if (this.isLiked()) {
      this._likeButton.classList.toggle("card__like-button_active");
    }
  }

  _setEventListeners() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => this._handleLikeIcon());

    const deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    deleteButton.addEventListener("click", (e) => {
      e.preventDefault();
      this._handleDeleteClick(this._id);
    });

    const cardImage = this._cardElement.querySelector(".card__image");
    cardImage.addEventListener("click", () => {
      this._handleCardClick(this._getData());
    });
  }

  _handleLikeIcon() {
    this._handleLikeClick({ _id: this._id, likes: this._likes });
    this.updateLikeCounter();
    this._toggleLikeButton();
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _fillCardTemplate() {
    const cardImage = this._cardElement.querySelector(".card__image");
    cardImage.alt = `Photo of ${this._name}`;
    cardImage.src = this._link;
    this._cardElement.id = this.imageId;
    this._cardElement.querySelector(".card__title").textContent = this._name;
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._fillCardTemplate();
    this._setEventListeners();
    this.updateLikeCounter();
    this._toggleLikeButton();
    return this._cardElement;
  }
}
