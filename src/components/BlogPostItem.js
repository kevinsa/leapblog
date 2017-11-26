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

const BlogPostItem = (props) => {
  return (
    <HashRouter>
    <BlogPostSection>
      <BlogPostHeader>
        <BlogPostTitle>
          <Link to={`/blogpost/${props.blogPost.id}`}>{props.blogPost.title}</Link>
        </BlogPostTitle>
        <BlogPostMeta>
          Posted on <a href="#">July 19, 2013</a> | By <a href="#">Paul Laros</a>
        </BlogPostMeta>
      </BlogPostHeader>
      <BlogPostSummary>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
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