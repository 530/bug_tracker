import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';

class AccountPage extends Component {

  constructor(props, context) {
    super(props);
  }

  render() {

    return (
      <div>
        <h1>Account: {this.context.authUser.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    );
  }

}

AccountPage.contextTypes = {
  authUser: PropTypes.object,
};

export default withAuthorization()(AccountPage);
