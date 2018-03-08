import React from 'react';
import './App.css';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

const Navigation = ({ authUser }) =>
	<div>
		{authUser
			? <NavigationAuth />
			: <NavigationNonAuth />
		}
	</div>

const NavigationAuth = () =>
	<div>
		<Navbar inverse fluid>
			<Navbar.Header>
				<Navbar.Brand>
					<a href="/"> Bug Tracker </a>
				</Navbar.Brand>
			</Navbar.Header>
			<Nav pullRight>
				<NavItem eventKey={1} href={routes.LANDING}>Landing</NavItem>
				<NavItem eventKey={2} href={routes.HOME}>Home</NavItem>
				<NavItem eventKey={3} href={routes.ACCOUNT}>Account</NavItem>
				<NavItem>
					<SignOutButton />
				</NavItem>
			</Nav>
		</Navbar>
	</div>

const NavigationNonAuth = () =>
	<div>
		<Navbar inverse fluid>
			<Navbar.Header>
				<Navbar.Brand>
					<a href="/"> Bug Tracker </a>
				</Navbar.Brand>
			</Navbar.Header>
			<Nav pullRight>
				<NavItem eventKey={1} href={routes.SIGN_UP}>Sign Up</NavItem>
				<NavItem eventKey={2} href={routes.SIGN_IN}>Sign In</NavItem>
			</Nav>
		</Navbar>
	</div>


export default Navigation;

/*
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
*/