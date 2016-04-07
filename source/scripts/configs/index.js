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

    conferences: {
      data: []
    },

    editor: {
      conferenceId: '',
      announcement: [],
      session: [],
      talk: [],
      person: [],
      location: [],
      venue: []
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
      parentEvent: '',
      content: ''
    }
  }
};
