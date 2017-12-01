import React from "react";
import styled from 'styled-components';
import BlogPostDetail from '../../components/BlogPostDetail';
import BlogPostCommentItem from '../../components/BlogPostCommentItem';
import BlogPostCommentForm from '../../components/BlogPostCommentForm';
import { base } from '../../config/Database';
const { getBlogPostById } = require('../../api/BlogPost');
const { deleteBlogComment, createBlogComment, updateBlogComment } = require('../../api/BlogComment');

const LoadingDiv = styled.div`
  text-align: center;
`;

export class BlogPostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogPost: null,
      blogComments: [],
      liveComments: [],
      isLoading: false
    }
  }

  componentDidMount() {
    base.bindToState(`comments/${this.props.match.params.id}`, {
      context: this,
      state: 'blogComments',
      asArray: true
    });

    getBlogPostById(this.props.match.params.id)
      .then((res) => {
        let blogPost = res.data.blogposts;
        blogPost.key = this.props.match.params.id

        this.setState({ blogPost: blogPost });
      })
      .catch((err) => {

      });
  }

  handleCommentDelete = (comment) => {
    let key = comment.key;

    this.setState({ isLoading: true });
    deleteBlogComment(this.state.blogPost.key, key)
      .then((res) => {
        
        this.setState({ isLoading: false })
      })
      .catch((err) => {
        this.setState({ isLoading: false })
        
      });
  }

  handleCommentAdd = (commentText) => {
    this.setState({ isLoading: true });

    createBlogComment(this.state.blogPost.key, commentText)
      .then((res) => {

        this.setState({ isLoading: false })
      })
      .catch((err) => {

        this.setState({ isLoading: false });
      });
  }

  handleCommentEdit = (comment, updatedText) => {
    this.setState({ isLoading: true });

    updateBlogComment(this.state.blogPost.key, comment.key, updatedText)
      .then((res) => {

        this.setState({ isLoading: false});
      })
      .catch((err) => {

        this.setState({ isLoading: false });
      });
  }

  render() {
    let loadingContent = <LoadingDiv><span><i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i></span></LoadingDiv>
    
    if (!this.state.blogPost || !this.state.blogComments.length === 0) {
      return null
    }
    else {
      return(
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
          
            <div>
            <BlogPostDetail blogPost={this.state.blogPost} loggedInUser={this.props.loggedInUser}/>
            </div>

            { this.state.isLoading ? loadingContent : ''}

            <div>
              {this.state.blogComments.map((comment) => {
                return <BlogPostCommentItem key={comment.key} blogComment={comment} editCommentCallback={this.handleCommentEdit} deleteCommentCallback={this.handleCommentDelete} loggedInUser={this.props.loggedInUser}  />
              })}
            </div>
            <div>
              <BlogPostCommentForm addCommentCallback={this.handleCommentAdd} loggedInUser={this.props.loggedInUser} />
            </div>
          </div>
        </div>
      );
    }
  }
}