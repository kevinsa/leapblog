const axios = require('axios');
const { getAuthUser } = require('./Storage');
const baseUrl = 'http://localhost:8090';

const _getAuthHeader = () => {
  let token = getAuthUser().token || '';
  let headerValue = `Bearer ${token}`;

  return { headers: { Authorization: headerValue } };
}

const getBlogPosts = () => {
  return axios.get(`${baseUrl}/api/blogposts`);
}

const getBlogPostById = (key) => {
  return axios.get(`${baseUrl}/api/blogposts/${key}`);
}

const createBlogPost = (blogPostData) => {
  return axios.post(`${baseUrl}/api/blogposts`, blogPostData, _getAuthHeader() );
}

const updateBlogPost = (blogPostData, key) => {
  return axios.put(`${baseUrl}/api/blogposts/${key}`, blogPostData, _getAuthHeader() );
}

const deleteBlogPost = (key) => {
  return axios.delete(`${baseUrl}/api/blogposts/${key}`, _getAuthHeader() );
}

module.exports = {
  getBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
}