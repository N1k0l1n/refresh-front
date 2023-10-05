import axios from "axios";

const BASE_URL = "http://localhost:7153/api/Users";

export class UserService {
  static getUser(userId) {
    return axios.get(`${BASE_URL}/${userId}`);
  }

  static getAllUsers() {
    return axios.get(BASE_URL);
  }

  static registration(user) {
    return axios.post(`${BASE_URL}/register`, user);
  }

  static login(user) {
    return axios.post(`${BASE_URL}/authenticate`, user);
  }

  static refreshToken() {
    return axios.post(`${BASE_URL}/refresh-token`);
  }

  static revokeToken() {
    return axios.post(`${BASE_URL}/revoke-token`);
  }
}
