import React from 'react';

import { Link, HashRouter } from 'react-router-dom';

export class TopNav extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.authenticatedStateCallback();
  }

  render() {
    if(this.props.loggedInUser) {
      return(
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <HashRouter>
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">leapblog</Link>
          </div>
          
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li><a>Welcome, {this.props.loggedInUser.name}</a></li>
              <li><a onClick={this.handleLogout}>logout</a></li>
            </ul>
          </div>
        </div>
        </HashRouter>
      </nav>
      );
    }
    else {
      return (
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <HashRouter>
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">leapblog</Link>
          </div>
          
          <div id="navbar" className="collapse navbar-collapse">
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

