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
    this._likeButton.addEventListener("click", () => this._handleLikeIcon());

    this._deleteButton.addEventListener("click", (e) => {
      e.preventDefault();
      this._handleDeleteClick(this._id);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
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
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return this._cardElement;
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = `Photo of ${this._name}`;
    this._setEventListeners();
    return this._cardElement;
  }
}
