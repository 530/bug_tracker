import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { auth } from '../firebase';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { passwordOne } = this.state;

    auth.doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '';

    return (
			<div className="Login">
      <form onSubmit={this.onSubmit}>
        <FormGroup controlId="passwordOne" bsSize="large">
        	<ControlLabel>New Password</ControlLabel>
        	<FormControl
          	value={passwordOne}
          	onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          	type="password"
          	placeholder="New Password"
        	/>
				</FormGroup>
        <FormGroup controlId="password" bsSize="large">
        	<ControlLabel>Confirm New Password</ControlLabel>
         	<FormControl
						value={passwordTwo}
          	onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          	type="password"
          	placeholder="Confirm New Password"
        	/>
				</FormGroup>
        <Button bsSize="large" disabled={isInvalid} type="submit">
          Confirm New Password
        </Button>

        { error && <p>{error.message}</p> }
      </form>
			</div>
    );
  }
}

export default PasswordChangeForm;