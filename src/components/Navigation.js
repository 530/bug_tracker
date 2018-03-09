import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import SignOutButton from './SignOut';
import * as routes from '../constants/routes';
import withAuthorization from './withAuthorization';

const Navigation = (props, context) =>
	<div>
		{context.authUser ? <NavigationAuth /> : <NavigationNonAuth />}
	</div>

Navigation.contextTypes = {
	authUser: PropTypes.object,
};

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
