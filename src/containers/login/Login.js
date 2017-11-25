import React from "react";
import { withRouter } from 'react-router-dom';
import { LoginForm } from '../../components/LoginForm';
import { Alert } from '../../components/Alert';
const { loginUser } = require('../../api/Auth');


class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.setInitialState();
    
    this.handleLogin = this.handleLogin.bind(this);
  }

  setInitialState() {
    this.state = {
      hasAuthErrors: false,
      error: ''
    }
  }

  handleLogin(loginData) {
    
    loginUser(loginData)
    .then((res) => {
      this.props.authenticatedStateCallback(res.data);
      this.props.history.push('/');
    })
    .catch((err) => {
      if(err.response) {
        const message = `${err.response.status} ${err.response.statusText}`;
        this.setState({ hasAuthErrors: true, error: message });
      }
      else {
        const message = err.message;
        this.setState({ hasAuthErrors: true, error: message });
      }
    });
    
}
  render() {
    return(
      <div className="row">
        <div className="col-md-12">
          { this.state.hasAuthErrors ? <Alert message={this.state.error} alertStyle={"alert alert-danger"}/> : ''}
          <LoginForm loginCallback={this.handleLogin}/>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginPage)