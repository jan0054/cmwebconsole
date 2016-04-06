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
      conference: {},
      announcement: [],
      session: [],
      talk: [],
      person: [],
      location: [],
      venue: []
    }
  },

  defaultFormValues: {
    login: {
      email: '',
      password: ''
    },

    editor: {
      conference: {
        name: '',
        organizer: '',
        start_time: '',
        end_time: '',
        content: ''
      }
    }
  }
};
