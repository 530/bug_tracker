import React, { Component } from 'react';
import './App.css';

import { firebase } from '../firebase';
import PropTypes from 'prop-types';

import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import HomePage from './Home';
import AccountPage from './Account';
import * as routes from '../constants/routes';
import Navigation from './Navigation';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      this.setState({authUser: (authUser ? authUser : null)});
    });
  }

  getChildContext() {
    return {
      authUser: this.state.authUser,
    };
  }

  render() {
    return (
      <Router>
        <div>
          <header>
            <Navigation />
            <hr />
            <Route
              exact path={routes.LANDING}
              component={() => <LandingPage />}
            />
            <Route
              exact path={routes.SIGN_UP}
              component={() => <SignUpPage />}
            />
            <Route
              exact path={routes.SIGN_IN}
              component={() => <SignInPage />}
            />
            <Route
              exact path={routes.PASSWORD_FORGET}
              component={() => <PasswordForgetPage />}
            />
            <Route
              exact path={routes.HOME}
              component={() => <HomePage />}
            />
            <Route
              exact path={routes.ACCOUNT}
              component={() => <AccountPage />}
            />
          </header>
        </div>
      </Router>
    );
  }
}

App.childContextTypes = {
  authUser: PropTypes.object,
};

export default App;
