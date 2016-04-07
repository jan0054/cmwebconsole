import {defaultState} from 'scripts/configs';
import {createReducers} from 'scripts/helpers';

export default createReducers({
  data: {
    getConferences: (state, action) => action.payload
  }
}, defaultState.conferences);
