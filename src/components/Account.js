import React, { Component } from 'react';
import * as firebase from 'firebase';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';

class AccountPage extends Component {
	
  constructor(props,context) {
    super(props,context);
    this.state = {
      authUser: null,
			value: 'coconut',
			bugs: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
	
	componentDidMount() {
		firebase.database().ref('bugs/').on('value', (snapshot) => {
				this.setState({ bugs: snapshot.val() })
		})
	}
	

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }
  render() {
		const { bugs } = this.state;
    return (
      <div className="App">
			
			{ !!bugs && <BugList bugs={bugs} /> }
			
			<BugTable />
			
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite La Croix flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
			
			
			
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    );
  }
	
}

const BugTable = () =>
	<table className="bugTable">
		<tr>
			<th> Station </th>
			<th> Bug </th>
			<th> Desc </th>
			<th> Priority </th>
		</tr>
	</table>

const BugList = ({ bugs }) =>
	<div>
			{Object.keys(bugs).map(key =>
				<div key={key}> { bugs[key].bug } { bugs[key].desc } </div>
			)}
	</div>

//export default withAuthorization()(AccountPage);
export default AccountPage;
