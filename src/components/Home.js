import React, { Component } from 'react';
import { Button, PageHeader, Modal } from 'react-bootstrap';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import BootstrapTable from 'react-bootstrap-table-next';
import withAuthorization from './withAuthorization';
import * as firebase from 'firebase';
import './reactTable.css';

const Header = () =>
	<div className="App">
		<PageHeader>Create a Bug/Issue</PageHeader>
	</div>



const db = firebase.database().ref('bugs/');

class HomePage extends Component {
	constructor(props,context) {
		super(props,context);
		this.stationBug = this.stationBug.bind(this);
		this.issueBug = this.issueBug.bind(this);
		this.descBug = this.descBug.bind(this);
		this.submitBug = this.submitBug.bind(this);
		this.removeBug = this.removeBug.bind(this);
    this.updateBug = this.updateBug.bind(this);
    this.handleChange = this.handleChange.bind(this);
		this.handleAssign = this.handleAssign.bind(this);
		this.onAfterSaveCell = this.onAfterSaveCell.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.toggle = this.toggle.bind(this);
		this.state = {
			modal: false,
			station: '',
			bug: '',
			desc: '',
			value: 'low',
			assign: 'admin',
			bugs: [],
			columns: [
		{
			dataField: 'id',
			text: 'ID',
			hidden: true,
			editable: false},
		{
			dataField: 'station',
			text: 'Station'},
		{
			dataField: 'bug',
			text: 'Bugs'
		},
		{
			dataField: 'desc',
			text: 'Description'
		},
		{
			dataField: 'priority',
			text: 'Priority'
		},
		{
			dataField: 'assign',
			text: 'Assigned to'
		}]
		}
	}
	
	componentDidMount() {
		db.on ('value', (snapshot) => {
			const currentBugs = snapshot.val()
			if (currentBugs != null) {
				this.setState({
					bugs: currentBugs
				})
			}
		});
	}
	
	
	toggle() {
    this.setState({
      modal: !this.state.modal
    });
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
		this.toggle();
	}
	
	removeBug(event) {
		const idNum = this.state.station;
		db.child(idNum).remove();
		
	}
	
  updateBug() {
    const idNum = this.state.station;
    const descUpdate = this.state.desc;
    var updates = {};
    updates['/desc'] = descUpdate;
    db.child(idNum).update(updates);
  }
	
  handleChange(event) {
    this.setState({value: event.target.value});
  }
	
  handleAssign(event) {
    this.setState({assign: event.target.value});
  }
	
	onAfterSaveCell(oldValue, newValue, row) {
		const rowId = row.id;
		const rowStation = row.station;
		const rowBug = row.bug;
		const rowDesc = row.desc;
		var rowUpdate = {};
		rowUpdate['/station'] = rowStation;
		rowUpdate['/bug'] = rowBug;
		rowUpdate['/desc'] = rowDesc;
		db.child(rowId).update(rowUpdate);
	}
	
	handleSelect(row, isSelect) {
		if(isSelect) {
			if(window.confirm("Are you sure you want to delete this Bug?")) {
				const rowId = row.id;
				db.child(rowId).remove();
			}
		}
	}
	
  render() {
		const cellEdit = cellEditFactory ({
			mode: 'click',
			afterSaveCell: this.onAfterSaveCell
		});
		const selectRow ={ 
			mode: 'radio',
			onSelect: this.handleSelect
		};

    return (
      <div className="App">
			<Header />

			<BootstrapTable keyField='id' data={ this.state.bugs }  columns={ this.state.columns } 
			pagination={ paginationFactory() } cellEdit={ cellEdit } insertRow={true} selectRow= { selectRow }/>
			
			
     	<Button bsSize="large" bsStyle="primary" onClick={this.toggle}>Add Bug</Button>

     	<Modal show={this.state.modal} onHide={this.toggle} >
     	<Modal.Body className="App">
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
     	</Modal.Body>
     	<Modal.Footer>
        <Button bsStyle="success" onClick={this.submitBug}>Submit Bug</Button>{' '}
				<Button onClick={this.removeBug} type="submit"> Remove Bug </Button>
        <Button bsStyle="danger" onClick={this.toggle}>Cancel</Button>
      </Modal.Footer>
			</Modal>			

			</div>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);