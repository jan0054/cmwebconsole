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
import Parse from 'parse';

// ### Local Modules

import * as actions from 'scripts/actions';
import Login from 'scripts/components/Login';
import Dashboard from 'scripts/components/Dashboard';
import Support from 'scripts/components/Support';

// Define & Export Module
// ----------------------
//
// This module contains the ***Redux-connected < App/>***.

export default @connect(state => state, actions) class App extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
    events: React.PropTypes.object.isRequired,
    login: React.PropTypes.func.isRequired,
    logout: React.PropTypes.func.isRequired,
    getEvents: React.PropTypes.func.isRequired
  }

  render () {
    const {
      user,
      events,
      login, logout, getEvents
    } = this.props;

    return (
      <div>
        {
          !(user.data instanceof Parse.User)
        ? <Login
            onSubmit = {formData => login(formData)}
          />

        : !user.data.get('is_admin')
        ? <Support
            actions = {{logout}}
          />

        : <Dashboard
            input = {{
              user: user.data,
              events: events.data
            }}
            actions = {{getEvents}}
          />
        }
      </div>
    );
  }
}
