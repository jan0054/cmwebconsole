import {defaultState} from 'scripts/configs';
import {createReducers} from 'scripts/helpers';

export default createReducers({
  apps: {
    getApps: (state, action) => action.payload
  }
}, defaultState.data);
