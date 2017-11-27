import React from 'react';
import BlogPostItem from './BlogPostItem';
import styled from 'styled-components';
import Alert from './Alert';
const { getBlogPosts, deleteBlogPost } = require('../api/BlogPost');

const CenteredDiv = styled.div`
  text-align: center;
`;

export default class BlogPostList extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      blogposts: [],
      isLoading: false,
      hasLoadingError: false,
      loadingErrorMsg: '',
    };

    this.loadBlogPosts = this.loadBlogPosts.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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

  render() {
    let loadingContent = <CenteredDiv>
        <span><i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i></span>
      </CenteredDiv>

    return(
      <div>
        { this.state.hasLoadingError ? <Alert message={this.state.loadingErrorMsg} alertStyle={"alert alert-danger"}/> : ''}

        { this.state.isLoading ? loadingContent : ''}

        {this.state.blogposts.map((post) => {
          return <BlogPostItem blogPost={post} deleteCallback={this.handleDelete} loggedInUser={this.props.loggedInUser}  />
        })}
      </div>
    );
  }
}
