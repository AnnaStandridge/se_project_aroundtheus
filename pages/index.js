import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { openModal, closeModal } from "../utils/utils.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/*Wrappers*/
const cardList = document.querySelector(".cards__list");

/*Elements*/
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardButton = document.querySelector("#add-card-button");
const addCardModal = document.querySelector("#add-card-modal");
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardForm = addCardModal.querySelector(".modal__form");
const modalCloseButtons = document.querySelectorAll(".modal__close");

/*Validation*/
const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(options, profileEditForm);
editFormValidator.enableValidation();

const addCardValidator = new FormValidator(options, addCardForm);
addCardValidator.enableValidation();

/*Render Card*/
function renderCard(cardData) {
  const card = new Card(cardData, "#card-template").getView();
  return card;
}

initialCards.forEach((card) => {
  cardList.append(renderCard(card));
});

/*Form Data*/
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTitleInput = addCardForm.querySelector("#card-title-input");
const cardUrlInput = addCardForm.querySelector("#card-url-input");

/*Functions*/
function fillProfileEditForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function openEditProfileModal() {
  fillProfileEditForm();
  openModal(profileEditModal);
}

/*Handlers*/
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  profileEditForm.reset();
  editFormValidator.enableValidation();
  closeModal(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const cardData = { name: cardTitleInput.value, link: cardUrlInput.value };
  const newCard = renderCard(cardData);
  cardList.prepend(newCard);
  addCardForm.reset();
  addCardValidator.enableValidation();
  closeModal(addCardModal);
}

/*Event Listeners*/
profileEditButton.addEventListener("click", openEditProfileModal);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardButton.addEventListener("click", () => openModal(addCardModal));
addCardForm.addEventListener("submit", handleAddCardSubmit);

modalCloseButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", () => {
    const modal = closeButton.closest(".modal");
    closeModal(modal);
  });
});