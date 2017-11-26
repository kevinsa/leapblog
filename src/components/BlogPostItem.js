import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, HashRouter } from 'react-router-dom';

const BlogPostSection = styled.section`
  background: #fff;
  border-radius: 3px;
  box-shadow: 0px 1px 1px #aaa;
  padding: 3em;
  margin: 2em auto;
  font-family: "Droid Serif", sans-serif;
`;

const BlogPostHeader = styled.header`
  display: block;
`;

const BlogPostTitle = styled.h2`
  color: #222;
  font-size: 1.8em;
  margin: 0 0 0.2em;
`;

const BlogPostMeta = styled.p`
  color: #999;
  font-size: 90%;
  margin: 0 0 1.8em;
`;

const BlogPostSummary = styled.div`
  color: #344151;
  font-family: "Source Sans Pro",sans-serif;
  font-size: 1.15em;
  font-weight: 400;
  letter-spacing: 0.01em;
  line-height: 1.5em;
`;

const BlogActions = styled.span`
  float: right;
  margin-left: 1em;
`;

export default class BlogPostItem extends React.Component {
  constructor(props) {
    super(props);

    this.deleteBlogPost = this.deleteBlogPost.bind(this);
  }

  deleteBlogPost() {
    this.props.deleteCallback(this.props.blogPost.key);
  }

  render() {
    let actionsContent = <BlogActions>
    <button class="btn btn-xs btn-default"><i className="fa fa-pencil" aria-hidden="true"></i></button>
    <button class="btn btn-xs btn-default" onClick={this.deleteBlogPost}><i className="fa fa-trash" aria-hidden="true"></i></button>
  </BlogActions>

    return (
      <HashRouter>
      <BlogPostSection>
        <BlogPostHeader>
          { (this.props.loggedInUser && this.props.loggedInUser.uid === this.props.blogPost.user.uid) ? actionsContent : '' }
       
          <BlogPostTitle>
            <Link to={`/blogpost/${this.props.blogPost.id}`}>{this.props.blogPost.title}</Link>
          </BlogPostTitle>
          <BlogPostMeta>
            Posted on {new Date(this.props.blogPost.date).toString()} | by {this.props.blogPost.user.displayName}
          </BlogPostMeta>
        </BlogPostHeader>
        <BlogPostSummary>
          <p>
            {this.props.blogPost.content}
          </p>
        </BlogPostSummary>
      </BlogPostSection>
      </HashRouter>
    );
  }
}

BlogPostItem.propTypes = {
  blogPost: PropTypes.object
};


/*
const BlogPostItem = (props) => {
  return (
    <HashRouter>
    <BlogPostSection>
      <BlogPostHeader>
        <BlogActions>
          <button class="btn btn-xs btn-default"><i className="fa fa-pencil" aria-hidden="true"></i></button>
          <button class="btn btn-xs btn-default" onClick={props.deleteCallback(props.blogPost.id)}><i className="fa fa-trash" aria-hidden="true"></i></button>
        </BlogActions>
        <BlogPostTitle>
          <Link to={`/blogpost/${props.blogPost.id}`}>{props.blogPost.title}</Link>
        </BlogPostTitle>
        <BlogPostMeta>
          Posted on {new Date(props.blogPost.date).toString()} | by {props.blogPost.user.displayName}
        </BlogPostMeta>
      </BlogPostHeader>
      <BlogPostSummary>
        <p>
          {props.blogPost.content}
        </p>
      </BlogPostSummary>
    </BlogPostSection>
    </HashRouter>
  );
}

BlogPostItem.propTypes = {
  blogPost: PropTypes.object
};

export default BlogPostItem;
*/