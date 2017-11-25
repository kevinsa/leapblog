import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { HashRouter, Route, Switch } from 'react-router-dom';
import { HomePage } from './containers/home/Home';
import { LoginPage } from './containers/login/Login';
import { RegisterPage } from './containers/register/Register';
import { BlogPostPage } from './containers/blogpost/Blogpost';
import { TopNav } from './components/TopNav';

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

  setLoggedInState(loginResponse) {
    
    this.setState({ 
      authenticatedUser: {
        uid: loginResponse.uid,
        token: loginResponse.token
      },
      isAuthenitcated: true
    });
    
  }

  setLoggedOutState() {
    this.setState({ 
      authenticatedUser: null,
      isAuthenitcated: false
    });
  }

  render() {
    return(

      <div>
        <TopNav loggedInUser={this.state.authenticatedUser} authenticatedStateCallback={this.setLoggedOutState}/>
      
        <div className="main-content">
          <div className="container">
            <HashRouter>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/login" render={() => ( <LoginPage authenticatedStateCallback={this.setLoggedInState}/> )} />
                <Route exact path="/register" component={RegisterPage} />
                <Route exact path="/blogpost/:id" component={BlogPostPage} />
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
