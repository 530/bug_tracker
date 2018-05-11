import React, { Component } from 'react';
import './Landing.css';
import icon from './Logo.png';

class LandingPage extends Component {
	render() {
  	return (
			<div className="App App-intro">
				<img alt='' src={icon} />
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
		<div className="featurePad">
			<h1><strong>Features</strong></h1>
			<h4>Easy to use GUI</h4>
			<h4>Add, Remove, Update Bugs</h4>
            <h4>Assign Bugs to users with corresponding priority</h4>
            <h4>Firebase user authentication for privileged views</h4>
			<h4>Assigning Bugs and Issues fast and efficiently</h4>

		</div>
	</div>

export default LandingPage;
