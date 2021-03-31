export default class UserInfo {

    constructor({ name, job, avatar }) {
        this._name = name;
        this._job = job;
        this._avatar = avatar;
    }

    getUserInfo() {
        const userInfo = {
            name: this._name.textContent,
            job: this._job.textContent
          };
          return userInfo;
    }

    setUserInfo(data) {
        this._name.textContent = data.name; 
        this._job.textContent = data.about;
    }

    setUserAvatar(data) {
        this._avatar.src = data.avatar;
    }
}