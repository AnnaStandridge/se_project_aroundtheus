import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super({ popupSelector });
        this._popupForm = document.querySelector('.modal__form');
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

    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.addEventListener("submit", this._submitForm);
    }

    close() {
        this._popupForm.reset();
        super.close();
        this._popupSelector.removeEventListener("submit", this._handleFormSubmit);
    }
}
