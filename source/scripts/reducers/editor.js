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
  },

  talks: {
    setupConferenceEditor: (state, action) => action.payload.talks.map(talk => ({
      id: talk.id,
      isSaved: false
    })),

    saveTalk: (state, action) => state.map(talk =>
        talk.id === action.payload.id
      ? {
        ...talk,
        isSaved: true
      }
      : talk
    )
  },

  venues: {
    setupConferenceEditor: (state, action) => action.payload.venues.map(venue => ({
      id: venue.id,
      isSaved: false
    })),

    saveVenue: (state, action) => state.map(venue =>
        venue.id === action.payload.id
      ? {
        ...venue,
        isSaved: true
      }
      : venue
    )
  }
}, defaultState.editor);
