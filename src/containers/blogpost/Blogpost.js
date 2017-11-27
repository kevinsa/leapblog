import React from "react";
import styled from 'styled-components';
import { BlogPostDetail } from '../../components/BlogPostDetail';
import { BlogPostCommentItem } from '../../components/BlogPostCommentItem';
const { getBlogPostById } = require('../../api/BlogPost');
const { getBlogComments, deleteBlogComment } = require('../../api/BlogComment');

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

    this.handleCommentDelete = this.handleCommentDelete.bind(this);
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
        //todo: do something here
        console.log(err);
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
          <div className="col-md-12">
          
            <div>
            <BlogPostDetail blogPost={this.state.blogPost} loggedInUser={this.props.loggedInUser}/>
            </div>

            { this.state.isLoading ? loadingContent : ''}

            <div>
              {this.state.blogComments.map((comment) => {
                return <BlogPostCommentItem blogComment={comment} deleteCommentCallback={this.handleCommentDelete} loggedInUser={this.props.loggedInUser}  />
              })}
            </div>
          </div>
        </div>
      );
    }
  }
}