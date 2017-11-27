import React from 'react';
import BlogPostItem from './BlogPostItem';


export class BlogPostDetail extends React.Component {
  render() {
    return (
      <div>
        <BlogPostItem blogPost={this.props.blogPost} loggedInUser={this.props.loggedInUser}  />
      </div>
    );
  }
}