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

// Define & Export Module
// ----------------------
//
// This module contains the ***Redux-connected < App/>***.

export default @connect(state => state, actions) class App extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    getApps: React.PropTypes.func.isRequired
  }

  componentDidMount () {
    const {getApps} = this.props;

    getApps();
  }

  render () {
    const {
      data
    } = this.props;

    return (
      <div>
        <div className = 'row'>
          <div className = 'columns'>
            <h1
              className = 'text-center'
              style = {{
                margin: '60px 0 60px 0'
              }}
            >Colloquium.me Admin Dashboard</h1>
          </div>
        </div>
        <div className = 'row'>
          <div className = 'columns small-8 small-centered'>
          {data.apps.map(app =>
            <a
              className = 'expanded large button'
              href = {`http://jan0054.github.io/cmwebconsole/?name=${app.get('name')}&id=${app.get('app_id')}&key=${app.get('js_key')}`}
            >
              {app.get('name')}
            </a>
          )}
          </div>
        </div>
      </div>
    );
  }
}
