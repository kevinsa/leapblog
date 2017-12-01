import React from 'react';
import PropTypes from 'prop-types';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      nameValid: false,
      emailValid: false,
      passwordValid: false,
      namePristine: true,
      emailPrisitine: true,
      passwordPristine: true,
      formValid: false
    }
  }

  handleNameChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ name: value, namePristine: false},
      () => this.validateField(name, value) );
  }

  handleEmailChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ email: value, emailPrisitine: false},
      () => this.validateField(name, value) );
  }

  handlePasswordChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ password: value, passwordPristine: false},
      () => this.validateField(name, value) );
  }

  handleSubmit = (event) => {
    this.props.registrationCallback({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    });
    event.preventDefault();
  }

  validateField = (name, value) => {
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let nameValid = this.state.nameValid;

    switch(name) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) || false;
        break;
      case 'password':
        passwordValid = value.length >= 6;
        break;
      case 'name':
        nameValid = value.length >= 3 && value.length <= 100;
        break
      default:
        break;
    }
    this.setState({
      emailValid: emailValid,
      passwordValid: passwordValid,
      nameValid: nameValid
    }, this.validateForm);
  }

  validateForm = () => {
    this.setState({
      formValid: this.state.emailValid && this.state.passwordValid && this.state.nameValid
    });
  }

  errorClass(isValid, isPristine) {
    return !isValid && !isPristine? 'has-error' : '';
  }

  render() {
    let loadingContent = <span><i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i></span>;
    
    return(
      <form onSubmit={this.handleSubmit}>
        <div className={`form-group ${this.errorClass(this.state.nameValid, this.state.namePristine )}`}>
          <label htmlFor="name">name</label>
          <input type="text" 
                 className="form-control"
                 id="name"
                 name="name"
                 placeholder="name" 
                 value={this.state.name}
                 onChange={this.handleNameChange} />
        </div>
        <div className={`form-group ${this.errorClass(this.state.emailValid, this.state.emailPrisitine )}`}>
          <label htmlFor="email">email</label>
          <input type="email" 
                 className="form-control" 
                 id="email" 
                 name="email"
                 placeholder="example@example.com" 
                 value={this.state.email}
                 onChange={this.handleEmailChange} />
        </div>
        <div className={`form-group ${this.errorClass(this.state.passwordValid, this.state.passwordPristine )}`}>
          <label htmlFor="password">password</label>
          <input type="password" 
                 className="form-control" 
                 id="password" 
                 name="password"
                 placeholder="password" 
                 value={this.state.password}
                 onChange={this.handlePasswordChange} />
        </div>
        <button disabled={this.state.name.length === 0 || this.state.email.length === 0 || this.state.password.length ===0} type="submit" className="btn btn-default">Register</button>
      
        { this.props.isSubmitting ? loadingContent : ''}
      </form>
    );
  }
};

RegisterForm.propTypes = {
  registrationCallback: PropTypes.func,
  isSubmitting: PropTypes.bool
};

export default RegisterForm