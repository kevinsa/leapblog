import React from "react";
import { LoginForm } from '../../components/LoginForm';
const { loginUser } = require('../../api/Auth');

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasAuthErrors: false,
      error: ''
    }
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(loginData) {
    
    loginUser(loginData)
    .then((res) => {
      this.props.authenticatedStateCallback(res.data);
      
    })
    .catch((err) => {
      this.setState({ hasAuthErrors: true, error: err });
    });
    
}
  render() {
    return(
      <div className="row">
        <div className="col-12-xs">
          <LoginForm loginCallback={this.handleLogin}/>
        </div>
      </div>
    );
  }
}