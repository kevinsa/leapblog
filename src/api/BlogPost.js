const axios = require('axios');
const { getAuthUser, getAuthHeader } = require('./Storage');
const { getConfig } = require('../config/AppConfig');

const _getAuthHeader = () => {
  return getAuthHeader();
}

const getBlogPosts = () => {
  return axios.get(`${getConfig().apiBaseUrl}/blogposts`);
}

const getBlogPostById = (key) => {
  return axios.get(`${getConfig().apiBaseUrl}/blogposts/${key}`);
}

const createBlogPost = (blogPostData) => {
  return axios.post(`${getConfig().apiBaseUrl}/blogposts`, blogPostData, _getAuthHeader() );
}

const updateBlogPost = (blogPostData, key) => {
  return axios.put(`${getConfig().apiBaseUrl}/blogposts/${key}`, blogPostData, _getAuthHeader() );
}

const deleteBlogPost = (key) => {
  return axios.delete(`${getConfig().apiBaseUrl}/blogposts/${key}`, _getAuthHeader() );
}

module.exports = {
  getBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
}