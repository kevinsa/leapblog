import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import BlogPostItem from './BlogPostItem';
import { deleteBlogPostAction } from '../actions/blog';


class BlogPostDetail extends React.Component {

  handleDelete = (key) => {
    this.props.deleteBlogPostAction(key);
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <BlogPostItem blogPost={this.props.blogPost} deleteCallback={this.handleDelete} loggedInUser={this.props.loggedInUser} mode={'full'} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  deleteBlogPostAction
}, dispatch)

export default withRouter(connect(null, mapDispatchToProps)(BlogPostDetail));

BlogPostDetail.propTypes = {
  blogPost: PropTypes.object,
  loggedInUser: PropTypes.object
};