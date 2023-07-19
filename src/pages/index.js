import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  profileEditButton,
  addCardButton,
  profileTitle,
  profileDescription,
  profileEditForm,
  addCardForm,
  profileTitleInput,
  profileDescriptionInput,
  options,
  profileAvatarEditButton,
  profileAvatarEditForm,
  profileAvatar,
  deleteCardForm,
  cardList,
  cardTemplate,
} from "../utils/constants.js";
import Api from "../components/Api.js";

/*Api Base Info*/
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "f6e170a8-377b-4f8a-8e96-e659e2db8a91",
    "Content-Type": "application/json",
  },
});

/*Constants*/
const editProfileModal = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileEditSubmit,
});
const imagePreviewModal = new PopupWithImage({
  popupSelector: "#preview-image-modal",
});
const newCardModal = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: handleCardSubmit,
});
const cardDeleteModal = new PopupWithForm({
  popupSelector: "#delete-card-modal",
});
const avatarEditModal = new PopupWithForm({
  popupSelector: "#edit-avatar-modal",
  handleFormSubmit: handleProfileAvatarSubmit,
});

/*Validation*/
const editFormValidator = new FormValidator(options, profileEditForm);
editFormValidator.enableValidation();

const addCardValidator = new FormValidator(options, addCardForm);
addCardValidator.enableValidation();

const profileAvatarEditValidator = new FormValidator(
  options,
  profileAvatarEditForm
);
profileAvatarEditValidator.enableValidation();

const deleteCardValidator = new FormValidator(options, deleteCardForm);
deleteCardValidator.enableValidation();

/*Api Promise*/
let userId;
let cardListSection;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setProfileAvatar(userData.avatar);
    cardListSection = new Section(
      {
        items: initialCards,
        renderer: (data) => {
          const newCard = createCard(data);
          cardListSection.addItem(newCard);
        },
      },
      cardList
    );
    cardListSection.renderItems();
  })
  .catch((err) => console.log(err));

/*Profile Edit*/
const userInfo = new UserInfo(profileTitle, profileDescription, profileAvatar);

function openEditProfileModal() {
  const { profileName, description } = userInfo.getUserInfo();
  profileTitleInput.value = profileName;
  profileDescriptionInput.value = description;
  editFormValidator.toggleButtonState();
  editProfileModal.open();
}

function handleProfileEditSubmit({ title, description }) {
  editProfileModal.setLoading(true);
  api
    .editUserInfo(title, description)
    .then(() => {
      userInfo.setUserInfo(title, description);
      editProfileModal.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editProfileModal.setLoading(false, "Save");
    });
}

function handleProfileAvatarSubmit({ url }) {
  avatarEditModal.setLoading(true);
  api
    .editUserAvatar(url)
    .then((userData) => {
      userInfo.editUserAvatar(userData.avatar);
      avatarEditModal.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      avatarEditModal.setLoading(false, "Save");
    });
}

/*Card Edit*/
function handleCardSubmit({ title, url }) {
  newCardModal.setLoading(true);
  api
    .addNewCard(title, url)
    .then((card) => {
      const newCard = createCard(card);
      cardListSection.prependItem(newCard);
      newCardModal.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      newCardModal.setLoading(false, "Create");
    });
}

function handleDeleteCard() {
  cardDeleteModal.setSubmitAction(() => {
    cardDeleteModal.setLoading(true);
    api
      .deleteCard(data._id)
      .then((res) => {
        newCard.remove(res._id);
        cardDeleteModal.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        cardDeleteModal.setLoading(false, "Yes");
      });
  });
}

function handleLikeClick(data) {
  api
    .changeLikeCardStatus(data._id, newCard.isLiked())
    .then((res) => {
      const likes = res.likes || [];
      newCard.setLikes(likes);
      newCard.toggleLikes();
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleCardClick() {
  imagePreviewModal.open(data);
}

function createCard(data) {
  const newCard = new Card(
    data,
    userId,
    cardTemplate,
    handleCardClick,
    handleDeleteCard,
    handleLikeClick(data)
  );
  return newCard.generateCard();
}

/*Event Listeners*/
profileEditButton.addEventListener("click", openEditProfileModal);

profileAvatarEditButton.addEventListener("click", () => {
  profileAvatarEditValidator.toggleButtonState();
  avatarEditModal.open();
});

addCardButton.addEventListener("click", () => {
  addCardValidator.toggleButtonState();
  newCardModal.open();
});
