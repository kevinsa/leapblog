import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BlogPostItem from './BlogPostItem';
import styled from 'styled-components';
import Alert from './Alert';
import { loadBlogPostsAction, deleteBlogPostAction } from '../actions/blog';

const CenteredDiv = styled.div`
  text-align: center;
`;

const PagerLink = styled.li`
  cursor: pointer;
`;

class BlogPostList extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentPage: 1,
      pageSize: 1,
    };

    this.loadBlogPosts = this.loadBlogPosts.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    this.loadBlogPosts();
  }

  loadBlogPosts() {
    this.props.loadBlogPostsAction();
  }

  handleDelete(key) {
    this.props.deleteBlogPostAction(key);
    this.setState({ currentPage: 1 });
  }

  handlePageChange(event) {
    this.setState({ currentPage: Number(event.target.id) });
  }

  render() {
    let loadingContent = <CenteredDiv>
        <span><i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i></span>
      </CenteredDiv>

    if(this.props.isLoading) {
      return loadingContent;
    }
    else {
      const pageNumbers = [];
      const { currentPage, pageSize } = this.state;
      const lastBlogPost = currentPage * pageSize;
      const firstBlogPost = lastBlogPost - pageSize;

      
      const viewablePosts = this.props.blogposts.slice(firstBlogPost, lastBlogPost);
      for(let i = 1; i <= Math.ceil(this.props.blogposts.length / pageSize); i++){
        pageNumbers.push(i);
      }
      
      const pageNumberLinks = pageNumbers.map((num) => {
        return (
          <PagerLink className={num === this.state.currentPage ? 'active' : ''} key={num}><a id={num} onClick={this.handlePageChange}>{num}</a></PagerLink>
        )
      })

      const pager = <nav aria-label="Page navigation">
          <ul className="pagination">
            <PagerLink>
              <a id="1" onClick={this.handlePageChange}>
              &laquo;
              </a>
            </PagerLink>
            {pageNumberLinks}
            <PagerLink>
              <a id={pageNumbers[pageNumbers.length -1]} onClick={this.handlePageChange}>
              &raquo;
              </a>
            </PagerLink>
          </ul>
        </nav>

      return(
        <div>
          { this.props.hasLoadingError ? <Alert message={this.props.loadingErrorMsg} alertStyle={"alert alert-danger"}/> : ''}
  
          {viewablePosts.map((post) => {
            return <BlogPostItem key={post.key} blogPost={post} deleteCallback={this.handleDelete} loggedInUser={this.props.loggedInUser}  />
          })}

          <div className="pull-right">
            { pageNumbers.length > 1 ? pager : '' }
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    blogposts: state.blogReducer.blogPosts,
    isLoading: state.blogReducer.isLoading,
    hasLoadingError: state.blogReducer.hasLoadingError,
    loadingErrorMsg: state.blogReducer.loadingErrorMsg
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadBlogPostsAction,
  deleteBlogPostAction
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogPostList);


BlogPostList.propTypes = {
  loggedInUser: PropTypes.object,
  blogposts: PropTypes.array,
  isLoading: PropTypes.bool,
  hasLoadingError: PropTypes.bool,
  loadingErrorMsg: PropTypes.string
};

