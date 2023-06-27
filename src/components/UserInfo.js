export default class UserInfo {
  constructor(configInfo) {
    this._profileName = document.querySelector(configInfo.profileNameSelector);
    this._profileJob = document.querySelector(configInfo.profileJobSelector);
    this._profileAvatar = document.querySelector(configInfo.profileAvatar);
  }
  getUserInfo(){
    return {name: this._profileName.textContent, jobs: this._profileJob.textContent}
  }
  setUserInfo({avatar,username,job}) {
    this._profileAvatar.src = avatar;
    this._profileName.textContent = username;
    this._profileJob.textContent = job;
  }
}
