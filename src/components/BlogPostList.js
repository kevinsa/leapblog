import React from 'react';
import BlogPostItem from './BlogPostItem';
import styled from 'styled-components';
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
      this.setState({ isLoading: false });
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
        { this.state.isLoading ? loadingContent : ''}

        {this.state.blogposts.map((post) => {
          return <BlogPostItem blogPost={post} deleteCallback={this.handleDelete} loggedInUser={this.props.loggedInUser}  />
        })}
      </div>
    );
  }
}
