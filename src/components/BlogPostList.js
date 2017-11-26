import React from 'react';
import BlogPostItem from './BlogPostItem';

export default class BlogPostList extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      blogposts: []
    };
  }

  componentDidMount() {
    this.setState({
      blogposts: [
        {
          id: 1,
          title: 'One Great Blog Post'
        },
        {
          id: 2,
          title: 'Another Great Blog Post'
        }
      ]
    });
  }

  render() {
    return(
      <div>
        {this.state.blogposts.map((post) => {
          return <BlogPostItem blogPost={post}  />
        })}
      </div>
    );
  }

  
}
