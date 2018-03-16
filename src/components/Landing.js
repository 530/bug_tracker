import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';
import './Landing.css';
import icon from './Logo.png';

const styledUp = {
	borderBottom: 'none',
	paddingBottom: '0px'
};

class LandingPage extends Component {
	render() {
  	return (
			<div className="App App-intro">
				<img src={icon} />
				<Header/>
				<Content/>
			</div>
		);
	}
}

const Header = () =>
  <div>
		<h2>An efficient issue tracking tool</h2>
  </div>

const Content = () =>
	<div className="element container">
		<div classname="featurePad">
			<h1><strong>Features</strong></h1>
			<h4>Email Alerts</h4>
			<h4>Easy to use GUI</h4>
			<h4>Add/Complete tasks</h4>
			<h4>Assigning Bugs and Issues fast and efficiently</h4>

		</div>
	</div>

export default LandingPage;
