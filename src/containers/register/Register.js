import React from "react";
import { withRouter } from 'react-router-dom';
import { RegisterForm } from '../../components/RegisterForm';
const { registerUser } = require('../../api/Auth');

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegistered: false,
      hasError: false
    }
    this.handleRegister = this.handleRegister.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);
  }

  redirectToLogin() {
    this.props.history.push('/login');
  }

  handleRegister(userInformation) {
      
    registerUser(userInformation)
      .then((res) => {
        this.setState({ isRegistered: true, hasError: false });
      })
      .catch((err) => {
        this.setState({ isRegistered: false, hasError: true });
      });
      
  }

  render() {
    if(!this.state.isRegistered) {
      return(
        <div className="row">
          <div className="col-12-xs">
            <RegisterForm registrationCallback={this.handleRegister}/>
          </div>
        </div>
      );
    }
    else {
      return(
        <div className="row">
          <div className="col-12-xs">
            <h3>Registration Completed</h3>
            <button className="btn btn-default" onClick={this.redirectToLogin}>Login</button>
          </div>
        </div>
      );
    }
    
  }
}

export default withRouter(RegisterPage)