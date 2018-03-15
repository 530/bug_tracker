import React, { Component } from 'react';

import { firebase } from '../firebase';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import * as routes from '../constants/routes';

const withAuthorization = () => (Component) => {

  class WithAuthorization extends Component {
		
    render() {
      return (<Component />);
    }
  }

  WithAuthorization.contextTypes = {
    authUser: PropTypes.object,
  };
							
  return WithAuthorization;
}

export default withAuthorization;