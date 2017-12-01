import { getBlogPosts, deleteBlogPost } from '../api/BlogPost';
import {
  GET_BLOGPOSTS_PENDING,
  GET_BLOGPOSTS_SUCCESS,
  GET_BLOGPOSTS_ERROR,
  DELETE_BLOGPOSTS_PENDING,
  DELETE_BLOGPOSTS_SUCCESS,
  DELETE_BLOGPOSTS_ERROR
} from '../constants/blog';

export const loadBlogPostsAction = () => {
  return dispatch => {
    dispatch({
      type: GET_BLOGPOSTS_PENDING
    });

    return getBlogPosts()
      .then((res) => {
        dispatch({
          type: GET_BLOGPOSTS_SUCCESS,
          payload: res.data.blogposts
        })
      })
      .catch((err) => {
        dispatch({
          type: GET_BLOGPOSTS_ERROR,
          payload: err.message
        })
      })
  }
}

export const deleteBlogPostAction = (key) => {
  return dispatch => {
    dispatch({
      type: DELETE_BLOGPOSTS_PENDING
    });

    return deleteBlogPost(key)
      .then((res) => {
        dispatch({
          type: DELETE_BLOGPOSTS_SUCCESS,
          payload: key
        })
      })
      .catch((err) => {
        dispatch({
          type: DELETE_BLOGPOSTS_ERROR,
          payload: err.message
        })
      })
  }
}