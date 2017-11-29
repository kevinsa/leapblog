import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BlogPostList from '../../components/BlogPostList';

const ActionRow = () => {
  return (
    <div className="row">
      <div className="col-md-12">
        <span className="pull-right">
          <Link to={'/blogpost/add'}>
            <button className="btn btn-sm btn-default"><i className="fa fa-plus" aria-hidden="true"></i>  Add Blog Post</button></Link>
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

HomePage.propTypes = {
  loggedInUser: PropTypes.object
};