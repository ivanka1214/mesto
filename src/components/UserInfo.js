export default class UserInfo {
  constructor(configInfo) {
    this._profileName = document.querySelector(configInfo.profileNameSelector);
    this._profileJob = document.querySelector(configInfo.profileJobSelector);
  }
  getUserInfo(){
    return {name: this._profileName.textContent, jobs: this._profileJob.textContent}
  }
  setUserInfo(dataUser) {
    this._profileName.textContent = dataUser.name;
    this._profileJob.textContent = dataUser.jobs;
  }
}
