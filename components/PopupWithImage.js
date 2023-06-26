import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._previewImageEl = document.querySelector(".modal__image");
    this._previewImageCaption = document.querySelector(".modal__caption");
  }

  open({ name, link }) {
    this._previewImageEl.alt = name;
    this._previewImageCaption.textContent = name;
    this._previewImageEl.src = link;
    super.open();
  }
}
