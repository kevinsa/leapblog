import React from 'react';

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      emailValid: false,
      passwordValid: false,
      formValid: false,
      emailPrisitine: true,
      passwordPristine: true,
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateField = this.validateField.bind(this);
  }

  handleEmailChange(event) {
    const name = event.target.name;
    const value = event.target.value
    this.setState({ username: value, emailPrisitine: false},
      () => this.validateField(name, value) );
  }

  handlePasswordChange(event) {
    const name = event.target.name;
    const value = event.target.value
    this.setState( {password: value, passwordPristine: false },
      () => this.validateField(name, value) );
  }


  handleSubmit(event) {
    this.props.loginCallback(this.state);
    event.preventDefault();
  }

  validateField(name, value) {
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(name) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) || false;
        break;
      case 'password':
        passwordValid = value.length >= 6;
        break;
      default:
        break;
    }
    this.setState({
      emailValid: emailValid,
      passwordValid: passwordValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }

  errorClass(isValid, isPristine) {
    return !isValid && !isPristine? 'has-error' : '';
  }

  render() {
    let loadingContent = <span><i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i></span>;

    return(
      <form onSubmit={this.handleSubmit}>
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
        <button disabled={!this.state.formValid} type="submit" className="btn btn-default">Login</button>
        
        { this.props.isSubmitting ? loadingContent : ''}
      </form>
    );
  }
}