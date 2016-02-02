// User Reducer
// ============
//
// This file defines user-related Redux reducers.
//
// Import Modules
// --------------
//
// ### Local Modules

import {defaultState} from 'scripts/configs';
import {createReducers} from 'scripts/helpers';

// Export Module
// -------------
//
// This module contains Redux reducers described in the following [labelled state transition system](http://www.mcrl2.org/dev/user_manual/articles/lts.html) schema.
//
// See also https://en.wikipedia.org/wiki/Transition_system.

export default createReducers({

  // > `user.isLoggedIn` : boolean
  //
  // Success or failure of `login()` is determined by `action.payload.status`.
  //
  // See also https://issue.kkcorp/trac/wiki/ServerApi/Login#login-status-behavior.

  isLoggedIn: {
    login: (state, action) => !!action.payload.id
  },

  data: {
    login: (state, action) => action.payload.id ? action.payload : {}
  }
}, defaultState.user);
