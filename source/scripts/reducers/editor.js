import {defaultState} from 'scripts/configs';
import {createReducers} from 'scripts/helpers';

export default createReducers({
  conference: {
    setupEditor: (state, action) => action.payload,

    saveEditor: (state, action) => ({})
  }
}, defaultState.editor);
