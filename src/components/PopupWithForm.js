import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = document.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputObj = {};
    this._inputList = document.querySelectorAll(".modal__form-input");
    this._inputList.forEach((input) => {
      if (input.value !== "") {
        inputObj[input.name] = input.value;
      }
    });
    return inputObj;
  }

  _handleSubmit = () => {
    const inputValues = this._getInputValues();
    this._handleFormSubmit(inputValues);
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._handleSubmit);
  }

  close() {
    this._popupForm.reset();
    super.close();
    this._popupForm.removeEventListener("submit", this._handleFormSubmit);
  }
}
