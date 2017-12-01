const axios = require('axios');
const { getConfig } = require('../config/AppConfig');

const registerUser = (userData) => {
  return axios.post(`${getConfig().apiBaseUrl}/register`, userData);
}

const loginUser = (credentials) => {
  return axios.post(`${getConfig().apiBaseUrl}/login`, credentials)
}

module.exports = {
  registerUser,
  loginUser
}