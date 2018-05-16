import React, { Component } from 'react';
import { PageHeader, Modal, Button} from 'react-bootstrap';
import * as firebase from 'firebase';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';

class AccountPage extends Component {
	
  constructor(props,context) {
    super(props,context);
    this.state = {
			modal: false,
      authUser: null,
			bugs: null,
			name: null
    };
		this.toggle = this.toggle.bind(this);
  }
	
	
	componentDidMount() {
		firebase.auth().onAuthStateChanged( (user) => {
			if(user) {
				const user = firebase.auth().currentUser;
				this.setState({name: user.displayName});
			}																	 
		})
	}
	
	toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
	
		
  render() {
		const { name } = this.state;
    return (
      <div className="App">
				<PageHeader> Hello: {name} </PageHeader>
				<br />
				<br />
				<br />
				<Button bsStyle="info" onClick={this.toggle}>Reset Password for { name }</Button>
				<Modal show={this.state.modal} onHide={this.toggle} >
     		<Modal.Body className="App">
				<PasswordChangeForm />
				</Modal.Body>
     		<Modal.Footer>
        	<Button bsStyle="danger" onClick={this.toggle}>Exit</Button>
      	</Modal.Footer>
				</Modal>			
      </div>
    );
  }
}

const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(AccountPage);