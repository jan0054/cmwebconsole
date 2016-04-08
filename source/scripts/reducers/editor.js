import {defaultState} from 'scripts/configs';
import {createReducers} from 'scripts/helpers';

export default createReducers({
  conferenceId: {
    setupConferenceEditor: (state, action) => action.payload.conferenceId,

    saveConference: (state, action) => ''
  },

  tracks: {
    setupConferenceEditor: (state, action) => action.payload.tracks.map(track => ({
      id: track.id,
      isSaved: false
    })),

    saveTrack: (state, action) => state.map(track =>
        track.id === action.payload.id
      ? {
        ...track,
        isSaved: true
      }
      : track
    )
  },

  locations: {
    setupConferenceEditor: (state, action) => action.payload.locations.map(location => ({
      id: location.id,
      isSaved: false
    })),

    saveLocation: (state, action) => state.map(location =>
        location.id === action.payload.id
      ? {
        ...location,
        isSaved: true
      }
      : location
    )
  }
}, defaultState.editor);
