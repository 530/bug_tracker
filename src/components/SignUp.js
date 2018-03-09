import React, { Component } from 'react';
import './App.css';
import { Link, withRouter } from 'react-router-dom';
import { auth, db } from '../firebase';
import * as routes from '../constants/routes';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

const SignUpPage = ({ history }) =>
  <div className="App">
    <h1>Sign Up</h1>
    <SignUpForm history={history} />
  </div>

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});


class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;
		
    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.uid, username, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }
	
  render() {
	  const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;


    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';
		
    return (
			<div className="Login">
      <form onSubmit={this.onSubmit}>
				<FormGroup controlId="username" bsSize="large">
        <ControlLabel>Username</ControlLabel>
				<FormControl
         	value={username}
         	onChange={event => this.setState(byPropKey('username', event.target.value))}
         	type="text"
         	placeholder="Username"
       	/>
				</FormGroup>
				<FormGroup controlId="email" bsSize="large">
        <ControlLabel>Email</ControlLabel>
				<FormControl
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
				</FormGroup>
        <FormGroup controlId="passwordOne" bsSize="large">
				<ControlLabel>Password</ControlLabel>
				<FormControl
          value={passwordOne}
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          type="password"
          placeholder="Password"
        />
				</FormGroup>
        <FormGroup controlId="passwordTwo" bsSize="large">
				<ControlLabel>Confirm Password</ControlLabel>
				<FormControl
          value={passwordTwo}
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm Password"
        />
				</FormGroup>
        <Button bsSize="large" disabled={isInvalid} type="submit">
          Sign Up
        </Button>

        { error && <p>{error.message}</p> }
      </form>
			</div>
    );
  }
}

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};
