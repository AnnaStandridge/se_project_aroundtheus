import { openModal } from "../utils/utils.js";

class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", (evt) => {
        this._handleImagePreviewModal(evt);
      });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle(".card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleImagePreviewModal(evt) {
    this._previewImageModal = document.querySelector("#preview-image-modal");
    this._modalImageEl = this._previewImageModal.querySelector(".modal__image");
    this._modalCaption =
      this._previewImageModal.querySelector(".modal__caption");
    this._modalImageEl.src = evt.target.src;
    this._modalImageEl.alt = evt.target.alt;
    this._modalCaption.textContent = evt.target.alt;
    openModal(this._previewImageModal);
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

export default Card;
