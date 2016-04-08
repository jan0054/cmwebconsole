// Web App Configs
// ===============
//
// This file defines the configs of the web app.
//
// Export Module
// -------------
//
// This module contains the configs of the web app.

export default {
  defaultState: {
    UI: {
      Login: {
        hasError: false
      }
    },

    user: {
      isLoggedIn: false,
      data: {}
    },

    data: {
      conferences: [],
      tracks: [],
      locations: [],
      talks: [],
      venues: []
    },

    editor: {
      conferenceId: '',
      tracks: [],
      locations: [],
      talks: [],
      venues: []
    }
  },

  defaultFormValues: {
    Login: {
      email: '',
      password: ''
    },

    ConferenceEditor: {
      name: '',
      organizer: '',
      _startDate: '',
      _startTime: '',
      _endDate: '',
      _endTime: '',
      _parentEventId: '',
      content: ''
    },

    TrackEditor: {
      _trackName: '',
      _startDate: '',
      _endDate: '',
      _locationName: '',
      capacity: 0
    }
  }
};
