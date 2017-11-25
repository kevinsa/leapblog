import React from 'react';

export class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value} );
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value} );
  }

  handlePasswordChange(event) {
    this.setState( {password: event.target.value });
  }

  handleSubmit(event) {
    this.props.registrationCallback(this.state);
    event.preventDefault();
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">name</label>
          <input type="text" 
                 className="form-control"
                 id="name" 
                 placeholder="name" 
                 value={this.state.name}
                 onChange={this.handleNameChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input type="email" 
                 className="form-control" 
                 id="email" 
                 placeholder="example@example.com" 
                 value={this.state.email}
                 onChange={this.handleEmailChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">password</label>
          <input type="password" 
                 className="form-control" 
                 id="password" 
                 placeholder="password" 
                 value={this.state.password}
                 onChange={this.handlePasswordChange} />
        </div>
        <button type="submit" className="btn btn-default">Register</button>
      </form>
    );
  }

};