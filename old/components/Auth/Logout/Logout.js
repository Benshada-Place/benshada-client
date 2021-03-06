import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { logout } from '../../../actions/auth.js';

class Logout extends React.Component {
  static propTypes = {
    logout: PropTypes.func
  }

  componentDidMount() {
    this.props.logout();
  }
}

export default connect(null, { logout })(Logout);
