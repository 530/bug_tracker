import React, { Component } from 'react';
import { db } from '../firebase';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';

class AccountPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: null,
    };
  }

  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    );
  }
	
  render() {
		const users = this.state.users;
		
    return (
      <div className="App">
        { !!users && <UserList users={ users } /> }
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    );
  }
	
}

const UserList = ({ users }) =>
  <div>
    {Object.keys(users).map(key =>
      <div key={key}> <strong>Username:</strong> {users[key].username} <strong>Email:</strong> {users[key].email}</div>
    )}
  </div>

export default withAuthorization()(AccountPage);
