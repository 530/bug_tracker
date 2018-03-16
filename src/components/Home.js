import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import withAuthorization from './withAuthorization';
import * as firebase from 'firebase';

class HomePage extends Component {
	constructor(props,context) {
		super(props,context);
		this.updateBug = this.updateBug.bind(this)
		this.submitBug = this.submitBug.bind(this)
		this.state = {
			bug: '',
			bugs: []
		}
	}
	
	componentDidMount() {
		firebase.database().ref('bugs/').on ('value', (snapshot) => {
			const currentBugs = snapshot.val()
			if (currentBugs != null) {
				this.setState({
					bugs: currentBugs
				})
			}
		})
	}
	
	updateBug(event) {
		this.setState({
			bug: event.target.value
		});
	}
	
	submitBug(event) {
		const nextBug = {
			id: this.state.bugs.length,
			text: this.state.bug
		}
		firebase.database().ref('bugs/'+nextBug.id).set(nextBug)
	}
	
  render() {
		
    return (
      <div className="App panel-default post-editor panel-body">
				{
    			this.state.bugs.map((bug, i) => {
						return (
							<li key={bug.id}>{bug.text}</li>
						)
					})			
				}
			
				<textarea classname="form-control post-editor-input" onChange={this.updateBug} type="text" placeholder="Bug Description" />
				<br />
				<Button onClick={this.submitBug} type="button"> Enter Bug </Button>
      </div>
    );
  }
}

export default withAuthorization()(HomePage);
