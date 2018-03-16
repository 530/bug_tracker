import React, { Component } from 'react';
import { firebase } from '../firebase';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';

class AccountPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
  }
	
  render() {
		
    return (
      <div className="App">
	
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    );
  }
	
}

export default withAuthorization()(AccountPage);
