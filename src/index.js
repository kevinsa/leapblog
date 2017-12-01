import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import registerServiceWorker from './registerServiceWorker';

import { HashRouter, Route, Switch } from 'react-router-dom';
import { HomePage } from './containers/home/HomePage';
import LoginPage from './containers/login/LoginPage';
import RegisterPage from './containers/register/RegisterPage';
import BlogPostAddPage from './containers/blogpost/BlogPostAddPage';
import BlogPostEditPage from './containers/blogpost/BlogPostEditPage';
import { BlogPostPage } from './containers/blogpost/BlogPostPage';
import { TopNav } from './components/TopNav';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';
import homebg from './home-bg.jpg';

var imageBg = {
  backgroundImage: `url(${homebg})`
}

const { getAuthUser, setAuthUser, clearAuthUser } = require('./api/Storage');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticatedUser: null,
      isAuthenitcated: false
    }

    this.setLoggedInState = this.setLoggedInState.bind(this);
    this.setLoggedOutState = this.setLoggedOutState.bind(this);
  }

  componentWillMount() {
    var authUser = getAuthUser();
    if(authUser) {
      this.setState({
        authenticatedUser: authUser,
        isAuthenitcated: true
      })
    }
  }

  setLoggedInState(loginResponse) {
    
    this.setState({ 
      authenticatedUser: {
        uid: loginResponse.uid,
        name: loginResponse.name, 
        token: loginResponse.token
      },
      isAuthenitcated: true
    });

    setAuthUser(this.state.authenticatedUser);
  }

  setLoggedOutState() {
    this.setState({ 
      authenticatedUser: null,
      isAuthenitcated: false
    });

    clearAuthUser(this.state.authenticatedUser);
  }

  render() {
    return(

      <div>
        <TopNav loggedInUser={this.state.authenticatedUser} authenticatedStateCallback={this.setLoggedOutState}/>
      
        <header className="intro-header" style={imageBg}>
          <div className="container">
              <div className="row">
                  <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                      <div className="site-heading">
                          <h1>leapblog</h1>
                          <hr className="small" />
                          <span className="subheading">interesting content by interesting people</span>
                      </div>
                  </div>
              </div>
          </div>
      </header>

        <div className="main-content">
          <div className="container">
            <HashRouter>
              <Switch>
                <Route exact path="/" render={() => ( <HomePage loggedInUser={this.state.authenticatedUser}/> )}/>
                <Route exact path="/login" render={() => ( <LoginPage authenticatedStateCallback={this.setLoggedInState}/> )} />
                <Route exact path="/register" component={RegisterPage} />
                <Route exact path="/blogpost/add" component={BlogPostAddPage} />
                <Route exact path="/blogpost/:id" render={(props) => ( <BlogPostPage loggedInUser={this.state.authenticatedUser} {...props}/> )} />
                <Route exact path="/blogpost/:id/edit" component={BlogPostEditPage} />
              </Switch>
            </HashRouter>
          </div>
      </div>

      <hr />

      <footer>
        <div className="container">
            <div className="row">
                <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                    <ul className="list-inline text-center">
                            <li>
                                <a>
                                    <span className="fa-stack fa-lg">
                                        <i className="fa fa-circle fa-stack-2x"></i>
                                        <i className="fa fa-bullhorn fa-stack-1x fa-inverse"></i>
                                    </span>
                                </a>
                            </li>
                    </ul>
                </div>
            </div>
        </div>
      </footer>
    </div>
    );
  }
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'));
registerServiceWorker();
