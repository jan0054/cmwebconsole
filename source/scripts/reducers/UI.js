import Parse from 'parse';

import {defaultState} from 'scripts/configs';
import {createReducers} from 'scripts/helpers';

export default createReducers({
  Login: {
    changeLoginFormMode: ({mode, ...rest}, action) => ({
      mode: action.payload,
      ...rest
    }),

    login: ({hasError, ...rest}, action) => ({
      hasError: action.payload instanceof Parse.Error,
      ...rest
    }),

    resetPassword: ({hasError, ...rest}, action) => ({
      hasError: 'reset',
      ...rest
    }),
  },

  Dashboard: {
    unmountConferenceEditor: ({showConferenceEditor, ...rest}, action) => ({
      showConferenceEditor: false,
      ...rest
    }),

    mountConferenceEditor: ({showConferenceEditor, ...rest}, action) => ({
      showConferenceEditor: true,
      ...rest
    }),

    unmountPeopleEditor: ({showPeopleEditor, ...rest}, action) => ({
      showPeopleEditor: false,
      ...rest
    }),

    mountPeopleEditor: ({showPeopleEditor, ...rest}, action) => ({
      showPeopleEditor: true,
      ...rest
    })
  }
}, defaultState.UI);
