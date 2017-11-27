const _authUserKey = 'authUser';

const _setObject = (key, obj) => {
  localStorage.setItem(key, JSON.stringify(obj));
}

const _getObject = (key) => {
  var json = localStorage.getItem(key);
  return json != null ? JSON.parse(json) : null;
}

const setAuthUser = (user) => {
  if(user) {
    _setObject(_authUserKey, user);
  }
}

const getAuthUser = () => {
  return _getObject(_authUserKey);
}

const clearAuthUser = () => {
  localStorage.removeItem(_authUserKey);
}

const getAuthHeader = () => {
  let user = getAuthUser();
  if(user && user.token) {
    return { headers: { Authorization: `Bearer ${user.token}` } }
  }
  return {};
}

module.exports = {
  setAuthUser,
  getAuthUser,
  clearAuthUser,
  getAuthHeader
}