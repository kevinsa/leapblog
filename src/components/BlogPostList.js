import React from 'react';
import PropTypes from 'prop-types';
import BlogPostItem from './BlogPostItem';
import styled from 'styled-components';
import Alert from './Alert';
const { getBlogPosts, deleteBlogPost } = require('../api/BlogPost');

const CenteredDiv = styled.div`
  text-align: center;
`;

const PagerLink = styled.li`
  cursor: pointer;
`;

export default class BlogPostList extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      blogposts: [],
      isLoading: false,
      hasLoadingError: false,
      loadingErrorMsg: '',
      currentPage: 1,
      pageSize: 5
    };

    this.loadBlogPosts = this.loadBlogPosts.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    this.loadBlogPosts();
  }

  loadBlogPosts() {
    this.setState({ isLoading: true });
    
    getBlogPosts()
    .then((res) => {
      this.setState({ isLoading: false, blogposts: res.data.blogposts });
    })
    .catch((err) => {
      if(err.response) {
        const message = `${err.response.status} ${err.response.statusText}`;
        this.setState({ isLoading: false, hasLoadingError: true, loadingErrorMsg: message });
      }
      else {
        const message = err.message;
        this.setState({ isLoading: false, hasLoadingError: true, loadingErrorMsg: message });
      }
    });
  }

  handleDelete(key) {
    this.setState({ isLoading: true });

    deleteBlogPost(key)
    .then((res) => {
      this.loadBlogPosts();
    })
    .catch((err) => {
      this.setState({ isLoading: false });
    });
  }

  handlePageChange(event) {
    this.setState({ currentPage: Number(event.target.id) });
  }

  render() {
    let loadingContent = <CenteredDiv>
        <span><i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i></span>
      </CenteredDiv>

    if(this.state.isLoading) {
      return loadingContent;
    }
    else {
      const pageNumbers = [];
      const { currentPage, pageSize } = this.state;
      const lastBlogPost = currentPage * pageSize;
      const firstBlogPost = lastBlogPost - pageSize;

      const viewablePosts = this.state.blogposts.slice(firstBlogPost, lastBlogPost);
      for(let i = 1; i <= Math.ceil(this.state.blogposts.length / pageSize); i++){
        pageNumbers.push(i);
      }

      const pageNumberLinks = pageNumbers.map((num) => {
        return (
          <PagerLink className={num === currentPage ? 'active' : ''} key={num}><a id={num} onClick={this.handlePageChange}>{num}</a></PagerLink>
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
          { this.state.hasLoadingError ? <Alert message={this.state.loadingErrorMsg} alertStyle={"alert alert-danger"}/> : ''}
  
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

BlogPostList.propTypes = {
  loggedInUser: PropTypes.object
};
