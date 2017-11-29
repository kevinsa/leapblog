import React from "react";
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginForm from '../../components/LoginForm';
import Alert from '../../components/Alert';
const { loginUser } = require('../../api/Auth');


class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasAuthErrors: false,
      error: '',
      isSubmitting: false
    }
    
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(loginData) {
    this.setState({ isSubmitting: true });

    loginUser(loginData)
    .then((res) => {
      this.setState({ isSubmitting: false });
      this.props.authenticatedStateCallback(res.data);
      this.props.history.push('/');
    })
    .catch((err) => {
      this.setState({ isSubmitting: false });

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
          <LoginForm loginCallback={this.handleLogin} isSubmitting={this.state.isSubmitting}/>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  authenticatedStateCallback: PropTypes.func
};

export default withRouter(LoginPage)

