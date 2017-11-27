const axios = require('axios');
const { getAuthUser } = require('./Storage');
const baseUrl = 'http://localhost:8090';

const _getAuthHeader = () => {
  let token = getAuthUser().token || '';
  let headerValue = `Bearer ${token}`;

  return { headers: { Authorization: headerValue } };
}

const getBlogComments = (blogKey) => {
  return axios.get(`${baseUrl}/api/blogposts/${blogKey}/comments`);
}

const deleteBlogComment = (blogKey, commentKey) => {
  return axios.delete(`${baseUrl}/api/blogposts/${blogKey}/comments/${commentKey}`, _getAuthHeader() );
}

module.exports = {
  getBlogComments,
  deleteBlogComment
}