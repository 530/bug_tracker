import React, { Component } from 'react';
import { Button, PageHeader } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import withAuthorization from './withAuthorization';
import * as firebase from 'firebase';

const Header = () =>
	<div>
		<PageHeader>Create a Bug/Issue</PageHeader>
	</div>

class HomePage extends Component {
	constructor(props,context) {
		super(props,context);
		this.stationBug = this.stationBug.bind(this)
		this.issueBug = this.issueBug.bind(this)
		this.descBug = this.descBug.bind(this)
		this.submitBug = this.submitBug.bind(this)
		this.removeBug = this.removeBug.bind(this)
		this.state = {
			station: '',
			bug: '',
			desc: '',
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
	
	stationBug(event) {
		this.setState({
			station: event.target.value
		});
	}
	
	issueBug(event) {
		this.setState({
			bug: event.target.value
		});
	}

	descBug(event) {
		this.setState({
			desc: event.target.value
		});
	}
	
	submitBug(event) {
		const nextBug = {
			id: this.state.bugs.length,
			station: this.state.station,
			bug: this.state.bug,
			desc: this.state.desc,
		}
		firebase.database().ref('bugs/'+nextBug.id).set(nextBug)
	}
	
	removeBug() {
		firebase.database().ref('bugs/').child().remove();
	}
	
  render() {
		
    return (
      <div className="App">
			<Header />
			
			<BootstrapTable
				ref='table'
				data={ this.state.bugs }
				pagination={ true }
				search={ true } insertRow>
			  <TableHeaderColumn dataField='id' isKey={true} dataSort={true}>Ref ID</TableHeaderColumn>
        <TableHeaderColumn dataField='station' dataSort={true}>Station</TableHeaderColumn>
        <TableHeaderColumn dataField='bug'>Bug/Issue</TableHeaderColumn>
				<TableHeaderColumn dataField='desc'>Description</TableHeaderColumn>
      </BootstrapTable>
			
			<input onChange={this.stationBug} type="text" placeholder="Station #" />
			<br />
			<textarea onChange={this.issueBug} type="text" placeholder="Bug/Issue" />
			<br />
			<textarea onChange={this.descBug} type="text" placeholder="Bug Description" />
			<br />
			<Button bsSize="large" onClick={this.submitBug} type="submit"> Enter Bug </Button>
			<Button bsSize="large" onClick={this.removeBug} type="submit"> Remove Bug </Button>
			</div>
    );
  }
}

export default withAuthorization()(HomePage);
	
				/*{
    			this.state.bugs.map((bug, i) => {
						return (
							<li key={bug.id}> {bug.station} {bug.bug} {bug.desc}</li>
						)
					})			
				}*/