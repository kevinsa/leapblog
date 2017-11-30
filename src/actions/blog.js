import { getBlogPosts, deleteBlogPost } from '../api/BlogPost';

export const loadBlogPostsAction = () => {
  return dispatch => {
    dispatch({
      type: 'REQUESTED_BLOGPOSTS'
    });

    return getBlogPosts()
      .then((res) => {
        dispatch({
          type: 'LOADED_BLOGPOSTS',
          payload: res.data.blogposts
        })
      })
      .catch((err) => {
        dispatch({
          type: 'FAILED_BLOGPOSTS',
          payload: err.message
        })
      })
  }
}

export const deleteBlogPostAction = (key) => {
  return dispatch => {
    dispatch({
      type: 'REQUESTED_BLOGPOSTS_DELETE'
    });

    return deleteBlogPost(key)
      .then((res) => {
        dispatch({
          type: 'DELETED_BLOGPOSTS',
          payload: key
        })
      })
      .catch((err) => {
        dispatch({
          type: 'FAILED_BLOGPOSTS_DELETE',
          payload: err.message
        })
      })
  }
}