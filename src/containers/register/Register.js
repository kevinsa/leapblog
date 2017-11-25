import React from "react";
import { withRouter } from 'react-router-dom';
import { RegisterForm } from '../../components/RegisterForm';
import { Alert } from '../../components/Alert';
const { registerUser } = require('../../api/Auth');

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegistered: false,
      hasError: false,
      error: ''
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
        if(err.response) {
          const message = `${err.response.status} ${err.response.statusText}`;
          this.setState({ isRegistered: false, hasError: true, error: message });
        }
        else {
          const message = err.message
          this.setState({ isRegistered: false, hasError: true, error: message });
        }
      });
      
  }

  render() {
    if(!this.state.isRegistered) {
      return(
        <div className="row">
          <div className="col-md-12">
          { this.state.hasError ? <Alert message={this.state.error} alertStyle={"alert alert-danger"}/> : ''}
            <RegisterForm registrationCallback={this.handleRegister}/>
          </div>
        </div>
      );
    }
    else {
      return(
        <div className="row">
          <div className="col-md-12">
            <h3>Registration Completed</h3>
            <button className="btn btn-default" onClick={this.redirectToLogin}>Login</button>
          </div>
        </div>
      );
    }
    
  }
}

export default withRouter(RegisterPage)