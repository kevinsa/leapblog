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
  render() {
    return(

      <div>
        <TopNav />
      
        <div className="main-content">

        <HashRouter hashType="slash">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/blogpost/:id" component={BlogPostPage} />
          </Switch>
        </HashRouter>
      </div>
    </div>

      
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
registerServiceWorker();
