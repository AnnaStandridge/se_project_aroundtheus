export default class Popup {
  constructor({ popupSelector }) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add("modal_opened");
    this.setEventListeners();
  }

  close() {
    this._popupSelector.classList.remove("modal_opened");
    this._popupSelector.removeEventListener("click", this._closeModalOnClick);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  };

  _closeModalOnClick = (e) => {
    if (
      e.target.classList.contains("modal_opened") ||
      e.target.classList.contains("modal__close")
    ) {
      this.close();
    }
  };

  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popupSelector.addEventListener("click", this._closeModalOnClick);
  }
}
