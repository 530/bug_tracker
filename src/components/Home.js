import React, { Component } from 'react';
import Alert from 'react-s-alert';
import { Button, PageHeader, Modal } from 'react-bootstrap';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import BootstrapTable from 'react-bootstrap-table-next';
import withAuthorization from './withAuthorization';
import * as firebase from 'firebase';
import './reactTable.css';
import './alert.css';

const Header = () =>
	<div className="App">
		<PageHeader>Create a Bug/Issue</PageHeader>
	</div>

var styled = {
	textAlign: 'center'
};

const db = firebase.database().ref('bugs/');

class HomePage extends Component {
	constructor(props,context) {
		super(props,context);
		this.stationBug = this.stationBug.bind(this);
		this.issueBug = this.issueBug.bind(this);
		this.descBug = this.descBug.bind(this);
		this.submitBug = this.submitBug.bind(this);
		this.removeBug = this.removeBug.bind(this);
    this.handleChange = this.handleChange.bind(this);
		this.handleAssign = this.handleAssign.bind(this);
		this.onAfterSaveCell = this.onAfterSaveCell.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.toggle = this.toggle.bind(this);
		this.state = {
			modal: false,
      name: null,
			station: '',
			bug: '',
			desc: '',
			value: 'low',
			assign: 'admin',
      timestampS: '',
			timestampU: '',
			bugs: [],
			columns: [
		{
			dataField: 'id',
			text: 'ID',
			hidden: true,
			editable: false},
		{
			dataField: 'station',
			text: 'Station',
      sort: true,
      filter:  textFilter()
		},
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
			text: 'Priority',
            editor: {
              type: Type.SELECT,
              options: [{
              value: 'high',
              label: 'high'
              }, {
              value: 'medium',
              label: 'medium'
              }, {
              value: 'low',
              label: 'low'
              }]}
		},
		{
			dataField: 'assign',
			text: 'Assigned to',
            editor: {
              type: Type.SELECT,
              options: [{
              value: 'admin',
              label: 'admin'
              }, {
              value: 'bob',
              label: 'bob'
              }]}
    },
    {
      dataField: 'name',
      text: 'Submitted By',
			editable: false
    },
		{
			dataField: 'status',
			text: 'Status',
            editor: {
              type: Type.SELECT,
              options: [{
              value: 'complete',
              label: 'complete'
              }, {
              value: 'in progress',
              label: 'in progress'
              }, {
              value: 'checked in',
              label: 'checked in'
              }]}
		},
    {
      dataField: 'timestampS',
      text: 'Date Submitted',
			editable: false
    },
		{
			dataField: 'timestampU',
			text: 'Date Last Updated',
			editable: false
		}]
		}
	}
	
	componentDidMount() {
		db.on ('value', (snapshot) => {
			const currentBugs = snapshot.val()
			if (currentBugs != null) {
				this.setState({
					bugs: currentBugs
				})}
		});
		firebase.auth().onAuthStateChanged( (user) => {
			if(user) {
				const user = firebase.auth().currentUser;
				this.setState({name: user.displayName});
			}																	 
		})
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
			assign: this.state.assign,
			timestampS: Date(0),
      timestampU: Date(0),
      name: this.state.name,
			status: 'new'
		}
		firebase.database().ref('bugs/'+nextBug.id).set(nextBug);
		this.toggle();
	}
	
	removeBug(event) {
		const idNum = this.state.station;
		db.child(idNum).remove();
		
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
		const rowPri = row.priority;
		const rowStatus = row.status;
		const rowTimeUpdate = Date(0);
		var rowUpdate = {};
		rowUpdate['/station'] = rowStation;
		rowUpdate['/bug'] = rowBug;
		rowUpdate['/desc'] = rowDesc;
		rowUpdate['/priority'] = rowPri;
		rowUpdate['/status'] = rowStatus;
		rowUpdate['/timestampU'] = rowTimeUpdate;
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
	
	handleInfo(e) {
    e.preventDefault();
    Alert.info('The below button is the remove feature, Click to remove a bug.', {
      position: 'top-left',
			effect: 'genie'
    });
    Alert.info('The above button is the add feature, Click me to add a bug', {
      position: 'bottom',
			effect: 'genie'
    });
    Alert.info('To edit a field, just click one! (Field Submitted by and Dates are not editable)', {
      position: 'bottom-right',
			effect: 'genie'
    });
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
      <div >
			<Header />

			<BootstrapTable keyField='id' data={ this.state.bugs }  columns={ this.state.columns } 
			pagination={paginationFactory()} cellEdit={cellEdit} insertRow={true} selectRow={ selectRow }
      filter={filterFactory()}/>
			
			<div style={styled}>
     	<Button bsSize="large" bsStyle="primary" onClick={this.toggle}>Add Bug</Button>
			</div>

			<br />
			<div className="cf" style={styled}>
				<Button bsStyle="info" className="button buttonInfo" onClick={this.handleInfo}>Need Help?</Button>
				<Alert stack={true} timeout={20000} />
			</div>	

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
        <Button bsStyle="danger" onClick={this.toggle}>Cancel</Button>
      </Modal.Footer>
			</Modal>			

			</div>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);