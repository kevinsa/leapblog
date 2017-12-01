import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, HashRouter } from 'react-router-dom';


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

const DeleteActionLink = styled.a`
  cursor: pointer;
  margin-left: 10px;
  color: #a94442;
`;

class BlogPostItem extends React.Component {
  
  deleteBlogPost = () => {
    this.props.deleteCallback(this.props.blogPost.key);
  }

  render() {
    let actionsContent = <BlogActions>
    <Link to={`/blogpost/${this.props.blogPost.key}/edit`}><i className="fa fa-pencil" aria-hidden="true"></i> edit</Link>
    <DeleteActionLink onClick={this.deleteBlogPost}><i className="fa fa-trash" aria-hidden="true"></i> delete</DeleteActionLink>
   </BlogActions>

    let contents = '';
    if(this.props.mode === 'summary') {
      contents = <div>
                    { (this.props.loggedInUser && this.props.loggedInUser.uid === this.props.blogPost.user.uid) ? actionsContent : '' }
                    <div className="post-preview">
                      <Link to={`/blogpost/${this.props.blogPost.key}`}>
                        <h2 className="post-title">
                          {this.props.blogPost.title}
                        </h2>
                      </Link>
                    
                
                      <p className="post-meta">
                      Posted on {new Date(this.props.blogPost.date).toString()} | by {this.props.blogPost.user.displayName}
                      </p>
                    </div>
                    <hr />
                  </div>
    }
    else {
      contents = <section>
                    <BlogPostHeader>
                      { (this.props.loggedInUser && this.props.loggedInUser.uid === this.props.blogPost.user.uid) ? actionsContent : '' }
                  
                      <BlogPostTitle>
                        <Link to={`/blogpost/${this.props.blogPost.key}`}>{this.props.blogPost.title}</Link>
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
                </section>
    }

    return (
        <HashRouter>
          {contents}
        </HashRouter>
    );
  }
}

BlogPostItem.propTypes = {
  blogPost: PropTypes.object,
  deleteCallback: PropTypes.func,
  loggedInUser: PropTypes.object
};

export default BlogPostItem