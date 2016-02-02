// < App/> Entry Container
// =======================
//
// This file defines the React entry container `< App/>`.
//
// Import Modules
// --------------
//
// ### NPM Modules

import React from 'react';
import {connect} from 'react-redux';

// ### Local Modules

import * as actions from 'scripts/actions';
import Login from 'scripts/components/Login';

// Define & Export Module
// ----------------------
//
// This module contains the ***Redux-connected < App/>***.

export default @connect(state => state, actions) class App extends React.Component {
  static propTypes = {
    login: React.PropTypes.func.isRequired
  }

  render () {
    const {
      login
    } = this.props;

    return (
      <div>
        <Login
          onSubmit = {formData => login(formData)}
        />
      </div>
    );
  }
}
