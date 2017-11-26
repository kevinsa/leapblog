import React from "react";

import BlogPostList from '../../components/BlogPostList';

export class HomePage extends React.Component {
  render() {
    return(
      <div className="row">
        <div className="col-md-12">
          <BlogPostList />
        </div>
      </div>
    );
  }
}