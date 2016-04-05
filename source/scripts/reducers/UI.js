import Parse from 'parse';

import {defaultState} from 'scripts/configs';
import {createReducers} from 'scripts/helpers';

export default createReducers({
  Login: {
    login: ({hasError, ...rest}, action) => ({
      hasError: action.payload instanceof Parse.Error,
      ...rest
    })
  }
}, defaultState.UI);
