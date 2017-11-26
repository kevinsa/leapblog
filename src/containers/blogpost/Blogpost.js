import React from "react";
import { BlogPostDetail } from '../../components/BlogPostDetail';
const { getBlogPostById } = require('../../api/BlogPost');
const { getBlogComments } = require('../../api/BlogComment');


export class BlogPostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogPost: null,
      blogComments: []
    }
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

  render() {
    if (!this.state.blogPost || !this.state.blogComments.length === 0) {
      return null
    }
    else {
      return(
        <div className="row">
          <div className="col-md-12">
            <BlogPostDetail blogPost={this.state.blogPost} loggedInUser={this.props.loggedInUser}/>
          </div>
        </div>
      );
    }
  }
}