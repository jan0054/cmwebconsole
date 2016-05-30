// User Actions
// ============
//
// This file defines user-related Redux actions.
//
// Import Modules
// --------------
//
// ### NPM Modules

import Parse from 'parse';

// ### Local Modules

import {createActions} from 'scripts/helpers';

// Export Module
// -------------
//
// This module contains the following Redux actions.

export default createActions(
  'persistLogin',
  {
    login: async ({email, password}) => {
      try {
        return await Parse.User.logIn(email, password);
      } catch (error) {
        return error;
      }
    },

    signup: async ({email, password, ...rest}) => {
      try {
        return await Parse.User.signUp(email, password, {
          email,
          is_admin: 1,
          ...rest
        });
      } catch (error) {
        return error;
      }
    },

    resetPassword: async ({email}) => {
      try {
        return await Parse.User.requestPasswordReset(email);
      } catch (error) {
        return error;
      }
    },

    logout: async () => {
      try {
        await Parse.User.logOut();
      } catch (error) {
        return error;
      }
    }
  }
);
