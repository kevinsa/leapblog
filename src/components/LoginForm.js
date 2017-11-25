import React from 'react';

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ username: event.target.value} );
  }

  handlePasswordChange(event) {
    this.setState( {password: event.target.value });
  }


  handleSubmit(event) {
    this.props.loginCallback(this.state);
    event.preventDefault();
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input type="email" 
                 className="form-control" 
                 id="email"
                 name="email"
                 placeholder="example@example.com" 
                 value={this.state.email}
                 onChange={this.handleEmailChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">password</label>
          <input type="password" 
                 className="form-control" 
                 id="password" 
                 name="password"
                 placeholder="password" 
                 value={this.state.password}
                 onChange={this.handlePasswordChange} />
        </div>
        <button disabled={this.state.username.length === 0 || this.state.password.length === 0} type="submit" className="btn btn-default">Login</button>
      </form>
    );
  }
}