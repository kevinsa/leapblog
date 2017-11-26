import React from "react";
import { Link } from 'react-router-dom';
import BlogPostList from '../../components/BlogPostList';

const ActionRow = () => {
  return (
    <div className="row">
      <div className="col-md-12">
        <span className="pull-right">
          <Link to={'/blogpost/add'}>Add Blog Post</Link>
        </span>
      </div>
    </div>
  );
}

export class HomePage extends React.Component {
  render() {
    return(
      <div>
        { this.props.loggedInUser ? <ActionRow /> : '' }

        <div className="row">
          <div className="col-md-12">
            <BlogPostList loggedInUser={this.props.loggedInUser}/>
          </div>
        </div>
      </div>
    );
  }
}