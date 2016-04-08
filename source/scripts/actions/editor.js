import Parse from 'parse';

import {createActions} from 'scripts/helpers';

export default createActions(
  {
    setupConferenceEditor: async ({conference}) => {
      try {
        return {
          conferenceId: conference.id,

          tracks: await (new Parse.Query('Session')).equalTo('event', conference)
                                                    .find(),

          talks: await (new Parse.Query('Talk')).equalTo('event', conference)
                                                .find(),

          locations: await (new Parse.Query('Location')).equalTo('event', conference)
                                                        .find(),

          venues: await (new Parse.Query('Venue')).equalTo('event', conference)
                                                  .find()
        };
      } catch (error) {
        return error;
      }
    },

    saveConference: async ({conference, fields}) => {
      try {
        if (conference.get('parentEvent')) {
          await conference.get('parentEvent').save({
            childrenEvent: conference.get('parentEvent').get('childrenEvent').filter(childEvent => childEvent.id !== conference.id)
          });
        }

        if (fields.parentEvent) {
          await fields.parentEvent.save({
            childrenEvent: (fields.parentEvent.get('childrenEvent') || []).concat(conference)
          });
        }

        return await conference.save(fields);
      } catch (error) {
        return error;
      }
    },

    saveTrack: async ({track, fields}) => {
      try {
        return await track.save(fields);
      } catch (error) {
        return error;
      }
    },

    saveLocation: async ({location, fields}) => {
      try {
        return await location.save(fields);
      } catch (error) {
        return error;
      }
    }
  }
);
