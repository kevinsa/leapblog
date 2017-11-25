const axios = require('axios');
const baseUrl = 'http://localhost:8090';

const registerUser = (userData) => {
  return axios.post(`${baseUrl}/api/register`, userData);
}

const loginUser = (credentials) => {
  return axios.post(`${baseUrl}/api/login`, credentials)
}

module.exports = {
  registerUser,
  loginUser
}