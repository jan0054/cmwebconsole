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
    name: React.PropTypes.string.isRequired,
    UI: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    data: React.PropTypes.object.isRequired,
    editor: React.PropTypes.object.isRequired,
    persistLogin: React.PropTypes.func.isRequired,
    login: React.PropTypes.func.isRequired,
    signup: React.PropTypes.func.isRequired,
    resetPassword: React.PropTypes.func.isRequired,
    logout: React.PropTypes.func.isRequired,
    changeLoginFormMode: React.PropTypes.func.isRequired,
    changeDashboardMode: React.PropTypes.func.isRequired,
    unmountConferenceEditor: React.PropTypes.func.isRequired,
    mountConferenceEditor: React.PropTypes.func.isRequired,
    unmountPeopleEditor: React.PropTypes.func.isRequired,
    mountPeopleEditor: React.PropTypes.func.isRequired,
    clearIsSaved: React.PropTypes.func.isRequired,
    getPeople: React.PropTypes.func.isRequired,
    getConferences: React.PropTypes.func.isRequired,
    getCareers: React.PropTypes.func.isRequired,
    setupConferenceEditor: React.PropTypes.func.isRequired,
    clearConferenceEditor: React.PropTypes.func.isRequired,
    addConference: React.PropTypes.func.isRequired,
    saveConference: React.PropTypes.func.isRequired,
    deleteConference: React.PropTypes.func.isRequired,
    addCareer: React.PropTypes.func.isRequired,
    saveCareer: React.PropTypes.func.isRequired,
    deleteCareer: React.PropTypes.func.isRequired,
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
    addAnnouncement: React.PropTypes.func.isRequired,
    saveAnnouncement: React.PropTypes.func.isRequired,
    deleteAnnouncement: React.PropTypes.func.isRequired,
    addAttendee: React.PropTypes.func.isRequired,
    saveAttendee: React.PropTypes.func.isRequired,
    deleteAttendee: React.PropTypes.func.isRequired
  }

  componentDidMount () {
    const {persistLogin} = this.props;

    persistLogin(Parse.User.current());
  }

  render () {
    const {
      name,
      UI,
      user,
      data,
      editor,
      login, signup, resetPassword, logout, changeLoginFormMode, changeDashboardMode, unmountConferenceEditor, mountConferenceEditor, unmountPeopleEditor, mountPeopleEditor, clearIsSaved, getPeople, getConferences, getCareers, setupConferenceEditor, clearConferenceEditor, addConference, saveConference, deleteConference, addCareer, saveCareer, deleteCareer, addTrack, saveTrack, deleteTrack, addLocation, saveLocation, deleteLocation, addTalk, saveTalk, deleteTalk, addVenue, saveVenue, deleteVenue, addAnnouncement, saveAnnouncement, deleteAnnouncement, addAttendee, saveAttendee, deleteAttendee
    } = this.props;

    return (
      <div>
      { !(user.data instanceof Parse.User)
      ? <Login
          input = {{
            name,
            UI: UI.Login
          }}
          actions = {{changeLoginFormMode}}
          onSubmit = {formData =>
            UI.Login.mode === 'login' ? login(formData)
          : UI.Login.mode === 'signup' ? signup(formData)
          : UI.Login.mode === 'reset' ? resetPassword(formData)
          : null
          }
        />

      : !user.data.get('is_admin')
      ? <Support
          actions = {{logout}}
        />

      : <Dashboard
          input = {{
            UI: UI.Dashboard,
            user: user.data,
            data,
            editor
          }}
          actions = {{logout, changeDashboardMode, unmountConferenceEditor, mountConferenceEditor, unmountPeopleEditor, mountPeopleEditor, clearIsSaved, getPeople, getConferences, getCareers, setupConferenceEditor, clearConferenceEditor, addConference, saveConference, deleteConference, addCareer, saveCareer, deleteCareer, addTrack, saveTrack, deleteTrack, addLocation, saveLocation, deleteLocation, addTalk, saveTalk, deleteTalk, addVenue, saveVenue, deleteVenue, addAnnouncement, saveAnnouncement, deleteAnnouncement, addAttendee, saveAttendee, deleteAttendee}}
        />
      }
      </div>
    );
  }
}
