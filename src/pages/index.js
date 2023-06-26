import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  profileEditButton,
  profileEditModal,
  addCardButton,
  addCardModal,
  previewImageModal,
  profileTitle,
  profileDescription,
  profileEditForm,
  addCardForm,
  profileTitleInput,
  profileDescriptionInput,
  cardList,
  options,
} from "../utils/constants.js";

/*Validation*/
const editFormValidator = new FormValidator(options, profileEditForm);
editFormValidator.enableValidation();

const addCardValidator = new FormValidator(options, addCardForm);
addCardValidator.enableValidation();

/*Render Card*/
const cardListSection = new Section(
  {
    items: initialCards,
    renderer: ({ name, link }) => {
      const newCard = createCard({ name, link });
      cardListSection.addItem(newCard);
    },
  },
  cardList
);

cardListSection.renderItems();

/*Form Data*/
const userInfo = new UserInfo(profileTitle, profileDescription);

const editProfileModal = new PopupWithForm({
  popupSelector: profileEditModal,
  handleFormSubmit: (inputObj) => {
    userInfo.setUserInfo(inputObj.title, inputObj.description);
    editProfileModal.close();
  },
});

function openEditProfileModal() {
  const { profileName, description } = userInfo.getUserInfo();
  profileTitleInput.value = profileName;
  profileDescriptionInput.value = description;
  editFormValidator.toggleButtonState();
  editProfileModal.open();
}

const newCardModal = new PopupWithForm({
  popupSelector: addCardModal,
  handleFormSubmit: submitCard,
});
const imageModal = new PopupWithImage({ popupSelector: previewImageModal });

/*Functions*/
function createCard({ name, link }) {
  const cardElement = new Card(
    { name, link },
    "#card-template",
    ({ name, link }) => {
      imageModal.open({ name, link });
    }
  );
  return cardElement.getView();
}

function submitCard({ title, url }) {
  const newCardData = { name: title, link: url };
  const newCard = createCard(newCardData);
  cardListSection.prependItem(newCard);
  newCardModal.close();
}

/*Event Listeners*/
profileEditButton.addEventListener("click", openEditProfileModal);

addCardButton.addEventListener("click", () => {
  addCardValidator.toggleButtonState();
  newCardModal.open();
});
