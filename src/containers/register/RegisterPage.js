import React from "react";
import { withRouter } from 'react-router-dom';
import RegisterForm from '../../components/RegisterForm';
import Alert from '../../components/Alert';
const { registerUser } = require('../../api/Auth');

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegistered: false,
      hasError: false,
      error: '',
      isSubmitting: false
    }
  }

  redirectToLogin = () => {
    this.props.history.push('/login');
  }

  handleRegister = (userInformation) => {
    this.setState({ isSubmitting: true });

    registerUser(userInformation)
      .then((res) => {
        this.setState({ isRegistered: true, hasError: false, isSubmitting: false });
      })
      .catch((err) => {
        if(err.response) {
          const message = `${err.response.status} ${err.response.statusText}`;
          this.setState({ isRegistered: false, hasError: true, error: message, isSubmitting: false });
        }
        else {
          const message = err.message
          this.setState({ isRegistered: false, hasError: true, error: message, isSubmitting: false });
        }
      });
      
  }

  render() {
    if(!this.state.isRegistered) {
      return(
        <div className="row">
          <div className="col-md-12">
          { this.state.hasError ? <Alert message={this.state.error} alertStyle={"alert alert-danger"}/> : ''}
            <RegisterForm registrationCallback={this.handleRegister} isSubmitting={this.state.isSubmitting}/>
          </div>
        </div>
      );
    }
    else {
      return(
        <div className="row">
          <div className="col-md-12">
            <div className="alert alert-success" role="alert">
              <i className="fa fa-check-circle" aria-hidden="true"></i>  
              <strong>  Success!</strong> Thanks for signing up, you can now proceed to <a onClick={this.redirectToLogin} className="alert-link">login</a>.
            </div>
          </div>
        </div>
      );
    }
    
  }
}

export default withRouter(RegisterPage)