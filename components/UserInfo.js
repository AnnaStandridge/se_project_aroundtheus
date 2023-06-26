export default class UserInfo {
    constructor(nameElement, jobElement) {
      this._nameElement = nameElement;
      this._jobElement = jobElement;
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
  }