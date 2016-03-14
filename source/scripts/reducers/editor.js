import {defaultState} from 'scripts/configs';
import {createReducers} from 'scripts/helpers';

export default createReducers({
  event: {
    setupEditor: (state, action) => action.payload
  }
}, defaultState.editor);
