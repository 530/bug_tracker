import React, { Component } from 'react';
import { PageHeader, Jumbotron } from 'react-bootstrap';
import './Landing.css';

const styledUp = {
	borderBottom: 'none',
	paddingBottom: '0px'
};

class LandingPage extends Component {
	render() {
  	return (
			<div className="App">
    		<PageHeader style={styledUp}>Welcome to Bug Tracker</PageHeader>
				<Header/>
				<Content/>
			</div>
		);
	}
}

const Header = () =>
  <div>
		<h5>An efficient issue tracking tool</h5>
  </div>

const Content = () =>
	<div className="padding-header">
		<h2>Features</h2>
		<p>Paragraph</p>
	</div>

export default LandingPage;
