import React, { Component } from 'react';
import './Landing.css';
import Background from './bg1.jpg';
import icon from './Logo.png';


var backStyle = {
	width: "100%",
	height: "700px",
	backgroundImage: `url(${Background})`
};

class LandingPage extends Component {
	render() {
  	return (
			<section style={ backStyle }>
			<div className="App App-intro">
				<img alt='' src={icon} />
				<Header/>
				<Content/>
			</div>
			</section>
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
			<h4>Email Alerts</h4>
			<h4>Easy to use GUI</h4>
			<h4>Add/Complete tasks</h4>
			<h4>Assigning Bugs and Issues fast and efficiently</h4>

		</div>
	</div>

export default LandingPage;
