import axios from 'axios';

export default class Authenticate {
  constructor(userName, password, baseUrl) {
    this.userName = userName;
    this.password = password;
    this.baseUrl = baseUrl;
    this.loggedIn = false;
  }

  async login() {
    const getCustomerUrl = `${this.baseUrl}/customers/${this.userName}`;
    try {
      const result = axios.get(getCustomerUrl, {
        auth: {
          username: this.userName,
          password: this.password,
        },
      });
      this.loggedIn = true;
    } catch (e) {
      this.loggedIn = false;
    }
  }

  async logout() {
    const getCustomerUrl = `${this.baseUrl}/customers/${this.userName}`;
    try {
      const result = axios.get(getCustomerUrl, {
        auth: {
          username: this.userName,
          password: this.password,
        },
      });
      this.loggedIn = true;
    } catch (e) {
      this.loggedIn = false;
    }
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  setUserName(userName) {
    this.userName = userName;
  }

  setPassword(password) {
    this.password = password;
  }

  getUserName() {
    return this.userName;
  }

  getPassword() {
    return this.password;
  }
}
