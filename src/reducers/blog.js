import {
  GET_BLOGPOSTS_PENDING,
  GET_BLOGPOSTS_SUCCESS,
  GET_BLOGPOSTS_ERROR,
  DELETE_BLOGPOSTS_PENDING,
  DELETE_BLOGPOSTS_SUCCESS,
  DELETE_BLOGPOSTS_ERROR
} from '../constants/blog';

const initialState = {
  blogPosts: [],
  isLoading: false,
  hasLoadingError: false,
  loadingErrorMsg: ''
}

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_BLOGPOSTS_PENDING:
      return{
        ...state,
        isLoading: true
      }
    
    case GET_BLOGPOSTS_SUCCESS:
      return{
        ...state,
        isLoading: false,
        blogPosts: action.payload
      }

    case GET_BLOGPOSTS_ERROR:
      return {
        ...state,
        isLoading: false,
        hasLoadingError: true,
        loadingErrorMsg: action.payload
      }

    case DELETE_BLOGPOSTS_PENDING:
      return{
        ...state,
        isLoading: true
      }

    case DELETE_BLOGPOSTS_SUCCESS:
      let posts = state.blogPosts.filter((post) => {
        return post.key !== action.payload
      });
      return {
        ...state,
        isLoading: false,
        blogPosts: posts
      }

    case DELETE_BLOGPOSTS_ERROR:
      return {
        ...state,
        isLoading: false,
        hasLoadingError: true,
        loadingErrorMsg: action.payload
      }

    default:
      return state;
  }
}