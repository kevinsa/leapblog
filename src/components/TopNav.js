import React from 'react';
import PropTypes from 'prop-types';
import { Link, HashRouter } from 'react-router-dom';

export class TopNav extends React.Component {

  handleLogout = () => {
    this.props.authenticatedStateCallback();
  }

  render() {
    if(this.props.loggedInUser) {
      return(
        <nav className="navbar navbar-default navbar-custom navbar-fixed-top">
          <HashRouter>
            <div className="container-fluid">
                <div className="navbar-header page-scroll">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <Link className="navbar-brand" to="/">leapblog</Link>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-right">
                    <li><a>Welcome, {this.props.loggedInUser.name}</a></li>
                    <li><a href="#" onClick={this.handleLogout}>logout</a></li>
                    </ul>
                </div>
            </div>
          </HashRouter>
        </nav>
      );
    }
    else {
      return (

        <nav className="navbar navbar-default navbar-custom navbar-fixed-top">
          <HashRouter>
            <div className="container-fluid">
                <div className="navbar-header page-scroll">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <Link className="navbar-brand" to="/">leapblog</Link>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-right">
                      <li><Link to="/login">login</Link></li>
                      <li><Link to="/register">sign up</Link></li>
                    </ul>
                </div>
            </div>
          </HashRouter>
        </nav>
      );
    }
  }
}

TopNav.propTypes = {
  authenticatedStateCallback: PropTypes.func,
  loggedInUser: PropTypes.object
};

