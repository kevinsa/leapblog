const initialState = {
  blogPosts: [],
  isLoading: false,
  hasLoadingError: false,
  loadingErrorMsg: ''
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'REQUESTED_BLOGPOSTS':
      return{
        ...state,
        isLoading: true
      }
    
    case 'LOADED_BLOGPOSTS':
      return{
        ...state,
        isLoading: false,
        blogPosts: action.payload
      }

    case 'FAILED_BLOGPOSTS':
      return {
        ...state,
        isLoading: false,
        hasLoadingError: true,
        loadingErrorMsg: action.payload
      }

    case 'REQUESTED_BLOGPOSTS_DELETE':
      return{
        ...state,
        isLoading: true
      }

    case 'DELETED_BLOGPOSTS':
      let posts = state.blogPosts.filter((post) => {
        return post.key !== action.payload
      });
      return {
        ...state,
        isLoading: false,
        blogPosts: posts
      }

    case 'FAILED_BLOGPOSTS_DELETE':
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