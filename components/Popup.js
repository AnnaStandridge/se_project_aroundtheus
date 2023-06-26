export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = popupSelector;
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    this.setEventListeners();
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  _closeModalOnClick(e) {
    if (e.target.classList.contains("modal_opened") || e.target.classList.contains("modal__close")) {
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popupElement.addEventListener("click", this._closeModalOnClick);
  }
}
