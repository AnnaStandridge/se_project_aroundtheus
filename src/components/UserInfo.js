export default class UserInfo {
    constructor(nameElement, jobElement, profileAvatar) {
      this._nameElement = nameElement;
      this._jobElement = jobElement;
      this._avatarElement = profileAvatar;
    }
  
    getUserInfo() {
      const userObject = {};
      userObject["profileName"] = this._nameElement.textContent;
      userObject["description"] = this._jobElement.textContent;
      return userObject;
    }
  
    setUserInfo(nameInput, jobInput) {
      this._nameElement.textContent = nameInput;
      this._jobElement.textContent = jobInput;
    }

    setProfileAvatar(avatar) {
      this._avatarElement.src = avatar;
    }  }