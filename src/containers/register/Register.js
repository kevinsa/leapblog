import React from "react";
import { RegisterForm } from '../../components/RegisterForm';
const { registerUser } = require('../../api/Auth');

export class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegistered: false
    }
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister(userInformation) {
      
    registerUser(userInformation)
      .then((res) => {
        this.setState({ isRegistered: true });
      })
      .catch((err) => {
        this.setState({ isRegistered: false });
      });
      
  }

  render() {
    return(
      <div className="row">
        <div className="col-12-xs">
          <RegisterForm registrationCallback={this.handleRegister}/>
        </div>
      </div>
    );
  }
}