import React from 'react';
import PropTypes from 'prop-types';
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

BlogPostDetail.propTypes = {
  blogPost: PropTypes.object,
  loggedInUser: PropTypes.object
};