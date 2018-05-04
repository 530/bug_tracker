import React, { Component } from 'react';
import { Button, PageHeader } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import withAuthorization from './withAuthorization';
import * as firebase from 'firebase';
import './reactTable.css';

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
    this.updateBug = this.updateBug.bind(this)
    this.handleChange = this.handleChange.bind(this)
		this.handleAssign = this.handleAssign.bind(this)
		this.state = {
			length: '',
			station: '',
			bug: '',
			desc: '',
			value: 'low',
			assign: 'admin',
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
		this.setState({station: event.target.value});
	}
	
	issueBug(event) {
		this.setState({bug: event.target.value});
	}

	descBug(event) {
		this.setState({desc: event.target.value});
	}
	
	submitBug(event) {
		const nextBug = {
			id: this.state.bugs.length,
			station: this.state.station,
			bug: this.state.bug,
			desc: this.state.desc,
			priority: this.state.value,
			assign: this.state.assign
		}
		firebase.database().ref('bugs/'+nextBug.id).set(nextBug);
	}
	
	removeBug(event) {
		const idNum = this.state.station;
		firebase.database().ref('bugs/').child(idNum).remove();
	}
  
  updateBug(event) {
        const idNum = this.state.station;
        const descUpdate = this.state.desc;
        var updates = {};
        updates['/id'] = idNum;
        updates['/desc'] = descUpdate;
      
        firebase.database().ref('bugs/').child(idNum).update(updates);
  }
	
  handleChange(event) {
    this.setState({value: event.target.value});
  }
	
  handleAssign(event) {
    this.setState({assign: event.target.value});
  }
	
  render() {

    return (
      <div className="App">
			<Header />
			<BootstrapTable
				ref='table'
				data={ this.state.bugs }
				pagination={ true }
				search={ true }
				hover={ true }>
			  <TableHeaderColumn dataField='id' isKey={true} hidden={true}>Ref ID</TableHeaderColumn>
        <TableHeaderColumn dataField='station' width="10" dataSort={true}>Station</TableHeaderColumn>
        <TableHeaderColumn dataField='bug' width="25">Bug/Issue</TableHeaderColumn>
		    <TableHeaderColumn dataField='desc' width="50">Description</TableHeaderColumn>
				<TableHeaderColumn dataField='priority' width="50">Priority</TableHeaderColumn>
				<TableHeaderColumn dataField='assign' width="50">Assigned To</TableHeaderColumn>
      </BootstrapTable>
			
			<input onChange={this.stationBug} type="text" placeholder="Station #" />
			<br />
			<textarea onChange={this.issueBug} type="text" placeholder="Bug/Issue" />
			<br />
			<textarea onChange={this.descBug} type="text" placeholder="Bug Description" />
			<br />
      	<select value={this.state.value} onChange={this.handleChange}>
        	<option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
				</select>
			<br />
      	<select value={this.state.assign} onChange={this.handleAssign}>
        	<option value="admin">Admin</option>
          <option value="bob">Bob</option>
				</select>
			<br />
			<Button bsSize="large" onClick={this.submitBug} type="submit"> Enter Bug </Button>
			<Button bsSize="large" onClick={this.removeBug} type="submit"> Remove Bug </Button>
      <Button bsSize="large" onClick={this.updateBug} type="submit"> Update Bug </Button>
			</div>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);
//export default HomePage;