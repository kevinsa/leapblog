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
            <button className="btn btn-sm btn-success"><i className="fa fa-plus" aria-hidden="true"></i>  Add Blog Post</button></Link>
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
          <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
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