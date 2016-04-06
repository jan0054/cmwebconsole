import {defaultState} from 'scripts/configs';
import {createReducers} from 'scripts/helpers';

export default createReducers({
  data: {
    getEvents: (state, action) => action.payload
  }
}, defaultState.conferences);
