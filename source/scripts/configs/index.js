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
    user: {
      isLoggedIn: false,
      data: {}
    },

    events: {
      data: []
    },

    editor: {
      event: {},
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
      event: {
        name: '',
        organizer: '',
        start_time: '',
        end_time: '',
        content: ''
      }
    }
  }
};
