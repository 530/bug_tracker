import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { auth } from '../firebase';

const PasswordForgetPage = () =>
  <div className="App">
    <h1>Reset Password</h1>
    <PasswordForgetForm />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    auth.doPasswordReset(email)
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
      email,
      error,
    } = this.state;

    const isInvalid = email === '';

    return (
			<div className="Login">
      <form onSubmit={this.onSubmit}>
      	<FormGroup controlId="email" bsSize="large">
				<ControlLabel>Email Address</ControlLabel>
				<FormControl
          value={this.state.email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
				</FormGroup>
        <Button bsSize="Large" disabled={isInvalid} type="submit">
          Reset My Password
        </Button>

        { error && <p>{error.message}</p> }
      </form>
			</div>
    );
  }
}

const PasswordForgetLink = () =>
  <p>
    <Link to="/pw-forget">Forgot Password?</Link>
  </p>

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink,
};