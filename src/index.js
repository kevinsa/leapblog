import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import { HashRouter, Route, Switch } from 'react-router-dom';
import { HomePage } from './containers/home/Home';
import LoginPage from './containers/login/Login';
import RegisterPage from './containers/register/Register';
import BlogPostAddPage from './containers/blogpost/Blogpost-add';
import BlogPostEditPage from './containers/blogpost/Blogpost-edit';
import { BlogPostPage } from './containers/blogpost/Blogpost';
import { TopNav } from './components/TopNav';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';

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
      
        <div className="main-content">
          <div className="container">
            <HashRouter>
              <Switch>
                <Route exact path="/" render={() => ( <HomePage loggedInUser={this.state.authenticatedUser}/> )}/>
                <Route exact path="/login" render={() => ( <LoginPage authenticatedStateCallback={this.setLoggedInState}/> )} />
                <Route exact path="/register" component={RegisterPage} />
                <Route exact path="/blogpost/add" component={BlogPostAddPage} />
                <Route exact path="/blogpost/:id" component={BlogPostPage} />
                <Route exact path="/blogpost/:id/edit" component={BlogPostEditPage} />
              </Switch>
            </HashRouter>
          </div>
      </div>
    </div>

      
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
registerServiceWorker();
