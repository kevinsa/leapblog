import React from "react";
import styled from 'styled-components';
import { BlogPostDetail } from '../../components/BlogPostDetail';
import { BlogPostCommentItem } from '../../components/BlogPostCommentItem';
import { BlogPostCommentForm } from '../../components/BlogPostCommentForm';
const { getBlogPostById } = require('../../api/BlogPost');
const { getBlogComments, deleteBlogComment, createBlogComment, updateBlogComment } = require('../../api/BlogComment');

const LoadingDiv = styled.div`
  text-align: center;
`;

export class BlogPostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogPost: null,
      blogComments: [],
      isLoading: false
    }

    this.handleCommentAdd = this.handleCommentAdd.bind(this);
    this.handleCommentDelete = this.handleCommentDelete.bind(this);
    this.handleCommentEdit = this.handleCommentEdit.bind(this);
  }

  componentDidMount() {
    Promise.all([
      getBlogPostById(this.props.match.params.id),
      getBlogComments(this.props.match.params.id)
    ])
    .then((responses => {
      let blogPost = responses[0].data.blogposts;
      blogPost.key = this.props.match.params.id

      this.setState({
        blogPost: blogPost,
        blogComments: responses[1].data.comments
      });
    }))
    .catch((err) => {
      console.log(err);
    });
  }

  handleCommentDelete(comment) {
    let key = comment.key;

    this.setState({ isLoading: true });
    deleteBlogComment(this.state.blogPost.key, key)
      .then((res) => {
        var commentsState = this.state.blogComments.filter((c) => {
          return (c.key !== key);
        })

        this.setState({ blogComments: commentsState, isLoading: false })
      })
      .catch((err) => {
        this.setState({ isLoading: false })
        
      });
  }

  handleCommentAdd(commentText) {
    this.setState({ isLoading: true });

    createBlogComment(this.state.blogPost.key, commentText)
      .then((res) => {
        var commentState = this.state.blogComments;
        commentState.push(res.data.comment);
        this.setState({ isLoading: false, blogComments: commentState })
      })
      .catch((err) => {
        this.setState({ isLoading: false });

      });
  }

  handleCommentEdit(comment, updatedText) {
    this.setState({ isLoading: true });

    updateBlogComment(this.state.blogPost.key, comment.key, updatedText)
      .then((res) => {
        var commentState = this.state.blogComments;
        commentState.forEach((c) => {
          if(c.key === comment.key) {
            c.content = updatedText;
          }
        });
        this.setState({ blogComments: commentState, isLoading: false});
      })
      .catch((err) => {
        this.setState({ isLoading: false });
      })
    console.dir(comment);
    console.log(updatedText);
  }

  render() {
    let loadingContent = <LoadingDiv><span><i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i></span></LoadingDiv>
    
    if (!this.state.blogPost || !this.state.blogComments.length === 0) {
      return null
    }
    else {
      return(
        <div className="row">
          <div className="col-md-12">
          
            <div>
            <BlogPostDetail blogPost={this.state.blogPost} loggedInUser={this.props.loggedInUser}/>
            </div>

            { this.state.isLoading ? loadingContent : ''}

            <div>
              {this.state.blogComments.map((comment) => {
                return <BlogPostCommentItem blogComment={comment} editCommentCallback={this.handleCommentEdit} deleteCommentCallback={this.handleCommentDelete} loggedInUser={this.props.loggedInUser}  />
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