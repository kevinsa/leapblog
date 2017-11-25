import React from "react";

export class BlogPostPage extends React.Component {
  render() {
    return(
      <div>
        <h1>leapblog - Blog Post Detail</h1>
        <h3>ID: {this.props.match.params.id}</h3>
      </div>
    );
  }
}