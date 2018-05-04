import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';
import * as firebase from 'firebase';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';

class AccountPage extends Component {
	
  constructor(props,context) {
    super(props,context);
    this.state = {
      authUser: null,
			bugs: null,
			name: null
    };
  }
	
	componentDidMount() {
		firebase.database().ref('bugs/').on('value', (snapshot) => {
				this.setState({ bugs: snapshot.val() })
		})
		firebase.auth().onAuthStateChanged( (user) => {
			if(user) {
				const user = firebase.auth().currentUser;
				this.setState({name: user.displayName});
			}																	 
		})
	}
	
  render() {
		const { name } = this.state;
    return (
      <div className="App">
				
				<PageHeader> Hello: {name} </PageHeader>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    );
  }
}

// under render, use if using BugList
/*
const { bugs, name } = this.state;
*/
/*const BugList = ({ bugs }) =>
	<div>
			{Object.keys(bugs).map(key =>
				<div key={key}> { bugs[key].bug } { bugs[key].desc } </div>
			)}
	</div>*/

const authCondition = (authUser) => !!authUser;
//{ !!bugs && <BugList bugs={bugs} /> }
export default withAuthorization(authCondition)(AccountPage);
//export default AccountPage;
