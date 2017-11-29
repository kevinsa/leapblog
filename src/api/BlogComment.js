const axios = require('axios');
const { getAuthHeader } = require('./Storage');
const { getConfig } = require('../config/AppConfig');

const _getAuthHeader = () => {
  return getAuthHeader();
}

const getBlogComments = (blogKey) => {
  return axios.get(`${getConfig().apiBaseUrl}/blogposts/${blogKey}/comments`);
}

const createBlogComment = (blogKey, commentText) => {
  return axios.post(`${getConfig().apiBaseUrl}/blogposts/${blogKey}/comments`,
    { content: commentText },
    _getAuthHeader()
  );
}

const updateBlogComment = (blogKey, commentKey, commentText) => {
  return axios.put(`${getConfig().apiBaseUrl}/blogposts/${blogKey}/comments/${commentKey}`,
    { content: commentText },
    _getAuthHeader()
  );
}

const deleteBlogComment = (blogKey, commentKey) => {
  return axios.delete(`${getConfig().apiBaseUrl}/blogposts/${blogKey}/comments/${commentKey}`, _getAuthHeader() );
}

module.exports = {
  getBlogComments,
  createBlogComment,
  updateBlogComment,
  deleteBlogComment
}