import React from "react";
import { BlogPostDetail } from '../../components/BlogPostDetail';
import { BlogPostCommentItem } from '../../components/BlogPostCommentItem';
const { getBlogPostById } = require('../../api/BlogPost');
const { getBlogComments } = require('../../api/BlogComment');



export class BlogPostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogPost: null,
      blogComments: []
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
    console.dir(comment);
  }

  render() {
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