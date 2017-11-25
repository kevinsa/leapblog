import React from "react";
import { withRouter } from 'react-router-dom';
import { LoginForm } from '../../components/LoginForm';
const { loginUser } = require('../../api/Auth');

class LoginPage extends React.Component {
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
      this.props.history.push('/');
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

export default withRouter(LoginPage)