import { appConfig } from '../utils/config';

const axios = require('axios');

const getBlogComments = (blogKey) => {
  return axios.get(`${appConfig.apiBaseUrl}/api/blogposts/${blogKey}/comments`);
}

module.exports = {
  getBlogComments
}