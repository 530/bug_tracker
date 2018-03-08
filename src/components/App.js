import React, { Component } from 'react';
import './App.css';

import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import HomePage from './Home';
import AccountPage from './Account';
import { firebase } from '../firebase';
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
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }
	
	render() {
	return (
  <Router>
    <div>
			<header>
      <Navigation authUser={this.state.authUser} />
      <hr/>
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

/*
class App extends Component {
  render() {
    return (
      <div className="App">
				<Navbar>
  				<Navbar.Header>
    			<Navbar.Brand>
      			<a href="/">Bug Tracker</a>
    			</Navbar.Brand>
  				</Navbar.Header>
  				<Nav>
    			<NavDropdown eventKey={3} title="More" id="basic-nav-dropdown">
      			<MenuItem eventKey={3.1}>Report Bug</MenuItem>
      			<MenuItem eventKey={3.2}>View Bugs</MenuItem>
      			<MenuItem eventKey={3.3}>Contact</MenuItem>
      			<MenuItem divider />
      			<MenuItem eventKey={3.4}>Separated link</MenuItem>
    			</NavDropdown>
    			<NavItem eventKey={1} href="#">Login</NavItem>
  				</Nav>
				</Navbar>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
			
				<Table striped bordered condensed hover>
  			<thead>
    		<tr>
      		<th>#</th>
      		<th>Bug</th>
      		<th>Description</th>
      		<th>Reported</th>
    		</tr>
  			</thead>
  			<tbody>
    		<tr>
      		<td>1</td>
      		<td>PC</td>
      		<td>It broken</td>
      		<td>@mdo</td>
    		</tr>
    		<tr>
      		<td>2</td>
      		<td>Jacob</td>
      		<td>Thornton</td>
      		<td>@fat</td>
    		</tr>
    		<tr>
      		<td>3</td>
      		<td colSpan="2">Larry the Bird</td>
      		<td>@twitter</td>
    		</tr>
  			</tbody>
				</Table>
			</div>
    );
  }
}
*/
export default App;
