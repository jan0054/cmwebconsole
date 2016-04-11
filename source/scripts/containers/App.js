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
    UI: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    data: React.PropTypes.object.isRequired,
    editor: React.PropTypes.object.isRequired,
    login: React.PropTypes.func.isRequired,
    logout: React.PropTypes.func.isRequired,
    getPeople: React.PropTypes.func.isRequired,
    getConferences: React.PropTypes.func.isRequired,
    setupConferenceEditor: React.PropTypes.func.isRequired,
    clearConferenceEditor: React.PropTypes.func.isRequired,
    addConference: React.PropTypes.func.isRequired,
    saveConference: React.PropTypes.func.isRequired,
    deleteConference: React.PropTypes.func.isRequired,
    addTrack: React.PropTypes.func.isRequired,
    saveTrack: React.PropTypes.func.isRequired,
    deleteTrack: React.PropTypes.func.isRequired,
    addLocation: React.PropTypes.func.isRequired,
    saveLocation: React.PropTypes.func.isRequired,
    deleteLocation: React.PropTypes.func.isRequired,
    addTalk: React.PropTypes.func.isRequired,
    saveTalk: React.PropTypes.func.isRequired,
    deleteTalk: React.PropTypes.func.isRequired,
    addVenue: React.PropTypes.func.isRequired,
    saveVenue: React.PropTypes.func.isRequired,
    deleteVenue: React.PropTypes.func.isRequired,
    savePeople: React.PropTypes.func.isRequired
  }

  render () {
    const {
      UI,
      user,
      data,
      editor,
      login, logout, getPeople, getConferences, setupConferenceEditor, clearConferenceEditor, addConference, saveConference, deleteConference, addTrack, saveTrack, deleteTrack, addLocation, saveLocation, deleteLocation, addTalk, saveTalk, deleteTalk, addVenue, saveVenue, deleteVenue, savePeople
    } = this.props;

    return (
      <div>
      { !(user.data instanceof Parse.User)
      ? <Login
          input = {{
            UI: UI.Login
          }}
          onSubmit = {formData => login(formData)}
        />

      : !user.data.get('is_admin')
      ? <Support
          actions = {{logout}}
        />

      : <Dashboard
          input = {{
            user: user.data,
            data,
            editor
          }}
          actions = {{logout, getPeople, getConferences, setupConferenceEditor, clearConferenceEditor, addConference, saveConference, deleteConference, addTrack, saveTrack, deleteTrack, addLocation, saveLocation, deleteLocation, addTalk, saveTalk, deleteTalk, addVenue, saveVenue, deleteVenue, savePeople}}
        />
      }
      </div>
    );
  }
}
