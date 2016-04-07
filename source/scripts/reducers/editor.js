import {defaultState} from 'scripts/configs';
import {createReducers} from 'scripts/helpers';

export default createReducers({
  conferenceId: {
    setupConferenceEditor: (state, action) => action.payload.conferenceId,

    saveConference: (state, action) => ''
  }
}, defaultState.editor);
